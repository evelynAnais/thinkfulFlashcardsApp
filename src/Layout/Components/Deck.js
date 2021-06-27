import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function Deck({ deck }) {
  const { path } = useRouteMatch();

  return(
    <>
    <h2>{deck.name}</h2>
    <p>{deck.description}</p>
    <Link to={`${path}`} className='btn btn-secondary'>View</Link>
    <Link to={`${path}/study`} className='btn btn-primary'>Study</Link>
    <button className='btn btn-danger'><FontAwesomeIcon icon={faTrash}/></button>
    </>
  );
}

export default Deck;