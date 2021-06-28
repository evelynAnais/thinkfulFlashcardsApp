import { React, useState } from 'react';
import { createCard, updateCard } from '../../utils/api';


function CardForm({formProps: { title, inputLabelOne, inputLabelTwo }}) {
  const initialFormState = {
    name: "",
    email: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const submitHandler = (event, submitType) => {
    event.preventDefault();
    console.log('submitted');
    switch(submitType) {
      case 'newCard':
        createCard(formData);
        break;
      case 'editCard':
        updateCard(formData);
        break;
    }    
  }
  
  return(
    <>
      <h2>{title}</h2>
      <form onSubmit={submitHandler}>
        <label>{inputLabelOne}
          <textarea></textarea>
        </label>
        <label>{inputLabelTwo}
          <textarea></textarea>
        </label>
        <button className='btn btn-secondary'>CXD</button>
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
    </>
  );
}

export default CardForm