import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function Deck({ deck }) {
  const { path } = useRouteMatch();
  console.log(path)
  return(
    <>
    <h2>{deck.name}</h2>
    <p>{deck.cards.length} cards</p>
    <p>{deck.description}</p>
    <Link to={`/decks/${deck.id}`} className='btn btn-secondary'>View</Link>
    <Link to={`/decks/${deck.id}/study`} className='btn btn-primary'>Study</Link>
    <button className='btn btn-danger'><FontAwesomeIcon icon={faTrash}/></button>
    </>
  );
}

export default Deck;