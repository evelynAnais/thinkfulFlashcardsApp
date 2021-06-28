import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function Deck({ deck }) {
  const { url } = useRouteMatch();

  return(
    <>
      <h2>{deck.name}</h2>
      { url === '/' 
        ? <p>{deck.cards?.length} cards</p>
        : null 
      }
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}/edit`} className='btn btn-secondary'>Edit</Link>
      <Link to={`/decks/${deck.id}/study`} className='btn btn-primary'>Study</Link>
      <button className='btn btn-danger'><FontAwesomeIcon icon={faTrash}/></button>
    </>
  );
}

export default Deck;