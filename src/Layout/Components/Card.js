import React from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteCard } from '../../utils/api/index';

function Card({ card }) {
  const { url } = useRouteMatch();
  const history = useHistory();

  function deleteHandler(cardId) {
    const confirmed = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (confirmed) {
      deleteCard(cardId).then();
    }
  }

  return (
    <div className='container border border-secondary p-2 mt-2'>
      <p>{card.front}</p>
      <p>{card.back}</p>
      <Link to={`${url}/cards/${card.id}/edit`} className='btn btn-secondary'>Edit</Link>
      <button className='btn btn-danger' onClick={() => deleteHandler(card.id)}><FontAwesomeIcon icon={faTrash}/></button>
    </div>
  );
}

export default Card;