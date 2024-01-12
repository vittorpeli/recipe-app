import { useEffect, useState } from "react"
import { Modal } from "./Modal";

export const GeneratorCard = () => {
  const [ingredients, setIngredients] = useState('');
  const [condiments, setCondiments] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [mealType, setMealType] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  let typeOfMeal = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']

  const closeModal = () => {
    setShowModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API request to backend
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: [
            {
              role: 'user',
              content: `I need you to help me find recipes with a set of requirements. I have the following ingredients: ${ingredients}. I also have the following condiments: ${condiments}. I am making a meal for: ${mealType}. I only have this much time to make it: ${cookTime}.`,
            },
          ],
          functions: {
            name: { type: 'string', description: 'name of the meal' },
            instructions: { type: 'string', description: 'Steps to prepare the recipe (no numbering)', items: { type: 'string' } },
            time_to_cook: { type: 'number', description: 'Total time to prepare the recipe in minutes' },
            price_to_cook: { type: 'number', description: 'Total time to prepare the recipe in minutes' },
          },
          functionCall: { name: 'set_recipe' },
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      
      setGeneratedText(responseData.generatedText)

      const newModalData = {
        items: responseData.functions?.instructions?.items || [],
        text: responseData.functions?.instructions?.items || '',
        btnContent: 'Save',
        action1: closeModal,
        action2: saveRecipe,
      }
      setModalData(newModalData);

      setShowModal(true);
    } catch (error) {
      console.error('Error calling API:', error.message);
      // Handle error, show error message, etc.
    }
  };

  const saveRecipe = () => {
    
  }

  useEffect(() => {
    console.log('Generated Text:', generatedText)
  }, [generatedText])

  return (
    <div className="recipe-card | flow wrapper radius center | color-secondary">
      <h2>CHEF</h2>
      <form className="recipe-card__form" onSubmit={handleSubmit}>
        <div className="flow-small">
          <label htmlFor="ingredients">Enter Ingredients</label>
          <input 
            id="ingredients" 
            type="text" 
            placeholder="Ingredients..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required/>
        </div>
        <div  className="flow-small">
          <label htmlFor="condiments">Enter Condiments</label>
          <input 
            id="condiments" 
            type="text" 
            placeholder="Condiments..."
            value={condiments}
            onChange={(e) => setCondiments(e.target.value)}
            required/>
        </div>
        <div className="time">
          <span><label htmlFor="cookTime">Cook Time:</label></span>
          <input 
            type="number" 
            id="cookTime" 
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)} 
            required/>
          <span><label>Minutes</label></span>
        </div>
        <div className="select">
          <label htmlFor="mealType">Meal Type: </label>
          <select 
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            {typeOfMeal.map((type) => {
              return (<option key={type} value={type}>{type}</option>)
            })}
          </select>
        </div>
        <button type="submit" className="btn">Generate</button>
      </form>
      { generatedText && (
        <Modal {...modalData}/>
      )}
    </div>
  )
}