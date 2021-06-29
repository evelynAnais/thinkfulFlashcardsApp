import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Deck from './Deck';

function DeckList({ decks = [] }) {
  const deckList = decks.map((deck) => (
    <Deck key={deck.id} deck={deck} />
  ));

  return (
    <>
    <Link to='/decks/new' className='btn btn-secondary' >
      <FontAwesomeIcon icon={faPlus} /> Create Deck
    </Link>
    <div>{ deckList }</div>
    </>
  );
}

export default DeckList;