import { React, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { createDeck, readDeck, updateDeck } from '../../utils/api';


function DeckForm({formProps: { title, inputLabelOne, inputLabelTwo }}) {
  const { url, params: { deckId } } = useRouteMatch();
  const [deck, setDeck] = useState({});
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    if (url !== '/decks/new'){
      getDeck();
    }
  }, [])
  const initialFormState = {
    name: deck.name ? deck.name : "",
    description: deck.description ? deck.description : "",
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
          <input type='text' 
          placeholder={deck.name ? deck.name : 'Deck Name'}
          onChange={handleChange} />
        </label>
        <label>{inputLabelTwo}
          <textarea 
          placeholder={deck.description ? deck.description : 'Brief description of the deck'}
          onChange={handleChange}></textarea>
        </label>
        <button className='btn btn-secondary'>CXD</button>
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
    </>
  );
}

export default DeckForm