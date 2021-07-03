import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createCard, readCard, updateCard } from '../../utils/api';


function CardForm({formProps: { title, inputLabelOne, inputLabelTwo, submitType }, deck}) {
  const { url, params: { cardId }} = useRouteMatch();
  const [card, setCard] = useState({});
  const history = useHistory();
  const initialFormState = {
    front: card.front ? card.front : "",
    back: card.back ? card.back : "",
  };

  function getCard() {
    console.log('cardId', cardId);
    console.log('getCard');
    if (cardId) {
      readCard(cardId).then(res => {
        console.log('card call res', res)
        setCard(res);
        setFormData({front: res.front, back: res.back});
    });
    }
  }
  useEffect(getCard, [cardId])


  // useEffect(() => {
  //   const abortController = new AbortController();

  //   async function getCard() {
  //     try {
  //       const response = await readCard(cardId);
  //       setCard(response);
  //       setFormData({
  //         front: response.front,
  //         back: response.back
  //       })
  //     } catch (error) {
  //       if (error.name === "AbortError") {
  //         console.log("Aborted", cardId);
  //       } else {
  //         throw error;
  //       }
  //     }
  //   }

  //   if (url !== `/decks/${deck.id}/cards/new`){
  //     getCard();
  //   }

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [cardId, deck.id, url]);

  

  const [formData, setFormData] = useState(initialFormState);
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (submitType === 'editCard') {
      formData.id = cardId;
    }
    submitType === 'newCard'
      ? createCard(deck.id, formData).then(() => history.push(`/decks/${deck.id}`))
      : updateCard(formData).then(() => history.push(`/decks/${deck.id}`));
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  }
  console.log('current formData', formData);
  return (
    <>
      <h3>
        <span>{deck.name}</span>: <span>{title}</span>
      </h3>
      <form className='form-group' onSubmit={submitHandler}>
        <div>
          <label>{inputLabelOne}
            <textarea 
              name='front'
              className='form-control'
              onChange={handleChange}
              defaultValue={ formData.front }
              placeholder='Front Side of card'
              >
            </textarea>
          </label>
        </div>
        <div>
          <label>{inputLabelTwo}
            <textarea 
              name='back'
              className='form-control'
              onChange={handleChange}
              defaultValue={ formData.back }
              placeholder='Back side of card'
            >
            </textarea>
          </label>
        </div>
        <div>
          <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
          <button className='btn btn-primary' type='submit'>Submit</button>
        </div>
      </form>
    </>
  );
}

export default CardForm;