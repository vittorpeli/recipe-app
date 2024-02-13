import { useEffect, useState } from "react"
import { Modal } from "./Modal";
import { Form } from "./Form";

export const GeneratorCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState('');
  const [time, setTime] = useState(0);

  function closeModal() {
    setShowModal(false);
  }

  function saveRecipe() {
    console.log('Recipe Saved!')
  }

  function handleSubmit(formData) {
    console.log('Form Data:', formData)

    setItems(formData.ingredients);
    setTime(formData.cookTime);

    setShowModal(true);
  }

  return (
    <div className="recipe-card | flow wrapper radius center | color-secondary">
      <h2>CHEF</h2>

      <Form onSubmit={handleSubmit}/>
      
      { showModal? (
        <Modal 
          name="Carbonara"
          items={items}
          time={time}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
          closeModal={closeModal}
          saveRecipe={saveRecipe}
        />
      ) : null}
    </div>
  )
}