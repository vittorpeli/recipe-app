import { useState } from 'react';
/* eslint-disable react/prop-types */

import { ModalContent } from "./ModalContent";

export function Modal ({
  name,
  items,
  time,
  text,
  closeModal,
  saveRecipe
}) {
  return (
    <div className="modal | center">
      <ModalContent 
        name={name}
        items={items}
        time={time}
        text={text}
        closeModal={closeModal}
        saveRecipe={saveRecipe}
      />
    </div>
  )
}