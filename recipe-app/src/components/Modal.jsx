/* eslint-disable react/prop-types */

export const Modal = (props) => {
  return (
    <div className="modal | center">
      <div className="modal__content | flow">
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

        {/* Modal Buttons */}
        <div className="modal__btn">
          <button className="btn" data-type="link" onClick={props.action1}>
            Close Modal
          </button>
          <button className="btn" onClick={props.action2}>
            {props.btnContent}
          </button>
        </div>
      </div>
    </div>
  )
}