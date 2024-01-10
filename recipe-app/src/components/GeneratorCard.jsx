

export const GeneratorCard = () => {
  let typeOfMeal = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']

  return (
    <div className="recipe-card | flow wrapper radius center | color-secondary">
      <h2>CHEF</h2>
      <form className="recipe-card__form">
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
        <button className="btn">Generate</button>
      </form>
    </div>
  )
}