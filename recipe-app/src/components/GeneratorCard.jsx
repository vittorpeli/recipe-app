import { useState } from "react"

export const GeneratorCard = () => {
  const [ingredients, setIngredients] = useState('');
  const [condiments, setCondiments] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [mealType, setMealType] = useState('');
  const [recipe, setRecipe] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  let typeOfMeal = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Todo: Make API request to backend

    //Mock Data
    const mockData = {
      ingredients,
      condiments,
      cookTime,
      mealType,
      generatedText: 'Mock recipe content',
    };

    setGeneratedText(mockData.generatedText);
  }

  return (
    <div className="recipe-card | flow wrapper radius center | color-secondary">
      <h2>CHEF</h2>
      <form className="recipe-card__form" onSubmit={handleSubmit}>
        <div className="flow-small">
          <label htmlFor="ingredients">Enter Ingredients</label>
          <input id="ingredients" type="text" placeholder="Ingredients..."required/>
        </div>
        <div  className="flow-small">
          <label htmlFor="condiments">Enter Condiments</label>
          <input id="condiments" type="text" placeholder="Condiments..." required/>
        </div>
        <div className="time">
          <span><label htmlFor="cookTime">Cook Time:</label></span>
          <input type="number" id="cookTime" required/>
          <span><label>Minutes</label></span>
        </div>
        <div className="select">
          <label htmlFor="mealType">Meal Type: </label>
          <select id="mealType">
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