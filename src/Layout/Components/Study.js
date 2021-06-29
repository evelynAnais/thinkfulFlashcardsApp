import { React, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import StudyCard from './StudyCard';
import { readDeck } from '../../utils/api';

function Study() {
  const [deck, setDeck] = useState(null);
  const { params: {deckId} } = useRouteMatch();

  useEffect (() => {
    readDeck(deckId).then(res => {
      setDeck(res)
    });
  }, [deckId]);

  return(
    <>
      {deck && <StudyCard deck={deck} />}
    </>
  );
}

export default Study;