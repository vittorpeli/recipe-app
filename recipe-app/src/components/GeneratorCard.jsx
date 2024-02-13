import { useEffect, useState } from "react"
import { Modal } from "./Modal";
import { Form } from "./Form";

const apiURL = "http://localhost:3001/api/recipes"

export const GeneratorCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState('');
  const [time, setTime] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  function closeModal() {
    setShowModal(false);
  }

  function saveRecipe() {
    console.log('Recipe Saved!')
  }

  function handleSubmit(formData) {
    fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setItems(data.ingredients);
        setTime(data.cookTime);
        setText(data.text);

        setShowModal(true);
      })
      .catch((error) => {
        console.error('Error generating recipe:', error);
      })
  }

  return (
    <div className="recipe-card | flow wrapper radius center | color-secondary">
      <h2>CHEF</h2>

      <Form onSubmit={handleSubmit}/>
      
      { showModal ? (
        <Modal 
          name={name}
          items={items}
          time={time}
          text={text}
          closeModal={closeModal}
          saveRecipe={saveRecipe}
        />
      ) : null}
    </div>
  )
}