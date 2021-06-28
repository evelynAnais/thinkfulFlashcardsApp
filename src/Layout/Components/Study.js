import { React, useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router';
import { readDeck } from '../../utils/api';

function Study() {
  const [deck, setDeck] = useState();
  const { params: { deckId }} = useRouteMatch();

  useEffect (() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const responseDeck = await readDeck(deckId);
        setDeck(responseDeck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", deckId);
        } else {
          throw error;
        }
      }
    }
    getDeck();

    return () => {
      console.log("cleanup", deckId);
      abortController.abort();
    };
  }, [deckId]);

  return(
    <>
    { deck.cards?.length < 3 && 
      <>
        <h4>Not enough cards.</h4>
        <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck</p>
        <Link to={`/decks/${deck.id}/cards/new`} className='btn btn-primary'>Add Cards</Link>
      </>
    }
    </>
  );
}

export default Study;