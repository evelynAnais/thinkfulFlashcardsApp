import { React, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { createDeck, readDeck, updateDeck } from '../../utils/api';


function DeckForm({formProps: { title, inputLabelOne, inputLabelTwo }}) {
  const { url, params: { deckId } } = useRouteMatch();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", deckId);
        } else {
          throw error;
        }
      }
    }

    if (url !== '/decks/new'){
      getDeck();
    }

    return () => {
      console.log("cleanup", deckId);
      abortController.abort();
    };
  }, [deckId, url])
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
      
      <form className='form-group' onSubmit={submitHandler}>
        <div>
          <label>{inputLabelOne}
            <input className='form-control' type='text' 
            defaultValue={deck.name ? deck.name : 'Deck Name'}
            onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>{inputLabelTwo}
            <textarea 
            className='form-control'
            defaultValue={deck.description ? deck.description : 'Brief description of the deck'}
            onChange={handleChange}></textarea>
          </label>
        </div>
        <div>
          <button className='btn btn-secondary'>CXD</button>
          <button className='btn btn-primary' type='submit'>Submit</button>
        </div>
      </form>
    </>
  );
}

export default DeckForm