import { useState } from "react";
import { FormInput } from "./FormInput";

export function Form({ onSubmit }) {
  let typeOfMeal = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']

  const [ingredients, setIngredients] = useState('');
  const [condiments, setCondiments] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [mealType, setMealType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleIngredient(e) {
    setIngredients(e.target.value)
  }

  function handleCondiments(e) {
    setCondiments(e.target.value)
  }
  
  function handleCookTime(e) {
    setCookTime(e.target.value)
  }

  function handleMealType(e) {
    setMealType(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault(e);

    setIsSubmitting(true);

    await onSubmit({
      ingredients,
      condiments,
      cookTime,
      mealType,
    })

    setIsSubmitting(false);
  }

  return (
    <form className="recipe-card__form" onSubmit={handleSubmit}>
      <div className="flow-small">
        <FormInput 
          label="Enter Ingredients"
          type="text"
          name="ingredients"
          value={ingredients}
          placeholder="Ingredients..."
          onChange={handleIngredient}
          disabled={isSubmitting}
          required
        />
      </div>
      <div  className="flow-small">
        <FormInput 
          label="Enter Condiments"
          type="text"
          name="condiments"
          value={condiments}
          placeholder="Condiments..."
          onChange={handleCondiments}
          disabled={isSubmitting}
          required
        />
      </div>
      <div className="time">
        <span><label htmlFor="cookTime">Cook Time:</label></span>
        <input 
          type="number" 
          id="cookTime" 
          value={cookTime}
          onChange={handleCookTime} 
          disabled={isSubmitting}
          required/>
        <span><label>Minutes</label></span>
      </div>
      <div className="select">
        <label htmlFor="mealType">Meal Type: </label>
        <select 
          id="mealType"
          value={mealType}
          onChange={handleMealType}
          disabled={isSubmitting}
          required
        >
          {typeOfMeal.map((type) => {
            return (<option key={type} value={type}>{type}</option>)
          })}
        </select>
      </div>
      <button type="submit" className="btn" disabled={isSubmitting}>Generate</button>
    </form>
  )
}