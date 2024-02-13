export function ModalContent({
  name,
  items,
  time,
  text,
  closeModal,
  saveRecipe
}) {
  return (
    <div className="modal__content | flow radius">
        {/* Random Image */}
        {/* <img src="" alt="recipe image" /> */}

        {/* Recipe Name */}
        <h1>{name}</h1>
        {/* Ingredients Section */}
        <div>
          <h3>Ingredients:</h3>
          <ol>
            <li>{items}</li>
          </ol>
        </div>

        {/* Cook Time Section */}
        <div>
          <h3>Time to Cook:</h3>
          <p>{time} Minutes</p>
        </div>

        {/* Instructions Section */}
        <div>
          <h3>Instructions</h3>
          <p>{text}</p>
        </div>

        <div className="modal__btn">
          <button 
            onClick={closeModal}
            className='btn'
          >
            Close
          </button>
          <button 
            onClick={saveRecipe}
            className='btn'
          >
            Save Recipe
          </button>
        </div>
      </div>
  )
}