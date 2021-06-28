import { React, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { createDeck, readDeck, updateDeck } from '../../utils/api';


function DeckForm({formProps: { title, inputLabelOne, inputLabelTwo }, deck = {}}) {
  const { url, params: { deckId } } = useRouteMatch();
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      // update form with deck
    }
    if (url !== '/decks/new'){
      getDeck();
    }
  }, [])
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
    const formData = new FormData(event.form)
    switch(submitType) {
      case 'newDeck':
        createDeck(formData);
        break;
      case 'editDeck':
        updateDeck(formData);
        break;
    }    
  }
  
  return(
    <>
      <h2>{title}</h2>
      <form onSubmit={submitHandler}>
        <label>{inputLabelOne}
          <input type='text' placeholder={deck.name ? deck.name : 'Deck Name'}></input>
        </label>
        <label>{inputLabelTwo}
          <textarea placeholder={deck.description ? deck.description : 'Brief description of the deck'}></textarea>
        </label>
        <button className='btn btn-secondary'>CXD</button>
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
    </>
  );
}

export default DeckForm