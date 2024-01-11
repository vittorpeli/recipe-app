import { useEffect, useState } from "react"

export const GeneratorCard = () => {
  const [ingredients, setIngredients] = useState('');
  const [condiments, setCondiments] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [mealType, setMealType] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  let typeOfMeal = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']

  // const convertToJSON = (prompt) => {
  //   const jsonData = JSON.stringify([
  //     {"role": "system", "content": "You are a helpful assistant"},
  //     {"role": "user", "content": prompt}
  //   ]);

  //   return JSON.parse(jsonData);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API request to backend
      const response = await fetch('http://localhost:3001/api/generate', {
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
      // Display recipe information (you can navigate to a new page or show a modal)
      console.log('Generated Text:', responseData.generatedText);
    } catch (error) {
      console.error('Error calling API:', error.message);
      // Handle error, show error message, etc.
    }
  };

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
        <div className="recipe-info">
          <h3>Recipe Name</h3>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  )
}