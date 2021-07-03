import React, { useEffect, useState } from 'react';
import { listCards } from '../../utils/api';
import Card from './Card';

function CardList({ deck }) {
  const [cards, setCards] = useState([]);

  function getCards() {
    listCards(deck.id).then(setCards);
  }

  useEffect(getCards, [deck.id]);
  
  const cardList = cards.map((card) => (
    <Card key={card.id} card={card} />
  ));
  
    return (
    <>
      <div>{ cardList }</div>
    </>
  );
}

export default CardList;