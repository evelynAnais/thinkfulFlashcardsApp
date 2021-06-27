import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Card({ card }) {
  const { path } = useRouteMatch();
  return(
    <>
      <p>{card.front}</p>
      <p>{card.back}</p>
      <Link className='btn btn-secondary'>Edit</Link>
      <button className='btn btn-danger'><FontAwesomeIcon icon={faTrash}/></button>
    </>
  );
}

export default Card;