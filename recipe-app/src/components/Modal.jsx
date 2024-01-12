/* eslint-disable react/prop-types */

export const Modal = (props) => {
  return (
    <div className="modal | flow">
      {/* Random Image */}
      <img src="" alt="recipe image" />
      {/* Ingredients Section */}
      <div className="center">
        <h3>Ingredients:</h3>
        <ol>
          {/* Ingredients Items */}
          <li>{props.items}</li>
        </ol>
      </div>

      {/* Instructions Section */}
      <div className="center">
        <h3>Instructions</h3>
        <p>{props.text}</p>
      </div>

      {/* Modal Button */}
      <div className="modal__btn">
        <button onClick={props.action}>
          {props.btnContent}
        </button>
      </div>
    </div>
  )
}