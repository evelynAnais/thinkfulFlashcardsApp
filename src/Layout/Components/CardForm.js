import { React, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { createCard, readCard, updateCard } from '../../utils/api';


function CardForm({formProps: { title, inputLabelOne, inputLabelTwo }, deck}) {
  const { url, params: { deckId: cardId } } = useRouteMatch();
  const [card, setCard] = useState({});
  
  useEffect(() => {
    const abortController = new AbortController();

    async function getCard() {
      try {
        const response = await readCard(cardId);
        setCard(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", cardId);
        } else {
          throw error;
        }
      }
    }

    if (url !== `/deck/${deck.id}/cards/new`){
      getCard();
    }

    return () => {
      console.log("cleanup", cardId);
      abortController.abort();
    };
  }, [cardId, deck.id, url]);

  const initialFormState = {
    front: card.front ? card.front : "",
    back: card.description ? card.description : "",
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
      <h3>
        <span>{deck.name}</span>: <span>{title}</span>
      </h3>
      <form className='form-group' onSubmit={submitHandler}>
        <div>
          <label>{inputLabelOne}
            <textarea 
            className='form-control'
            onChange={handleChange}
            defaultValue={ card.front ? card.front : 'Front side of card'}>
            </textarea>
          </label>
        </div>
        <div>
          <label>{inputLabelTwo}
            <textarea 
            className='form-control'
            onChange={handleChange}
            defaultValue={ card.back ? card.back : 'Back side of card'}>
            </textarea>
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

export default CardForm