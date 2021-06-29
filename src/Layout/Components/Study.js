import { React, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import StudyCard from './StudyCard';
import { readDeck } from '../../utils/api';

function Study() {
  const [deck, setDeck] = useState(null);
  const { params: {deckId} } = useRouteMatch();
console.log('deckId',deckId)
  useEffect (() => {
    console.log('useEffect')
    readDeck(deckId).then(res => {
      console.log('setting deck to', res);
      setDeck(res)
    });
  }, []);

 console.log(deck)
  return(
    <>
      {deck && <StudyCard deck={deck} />}
    </>
  );
}

export default Study;