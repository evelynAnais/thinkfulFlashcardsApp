import { React, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CardList from './CardList';
import Study from './Study';
import Form from './Form';
import Deck from './Deck';
import { readDeck } from '../../utils/api';

function DeckDetails() {
  const [deck, setDeck] = useState({});
  const { params: {deckId}, url } = useRouteMatch();

  useEffect (() => {
    async function getDeck() {
      const responseDeck = await readDeck(deckId);
      setDeck(responseDeck);
    }
    getDeck();
  }, [])

console.log(deck, 'deck details')
  return(
    <>
      <div>Breadcrumb</div>
      <Switch>
        <Route path='/decks/new'>
          <Form />
        </Route>
        <Route path={`${url}`}>
          <Deck deck={deck} />
          <h2>Cards</h2>
          <CardList cards={deck.cards} />
        </Route>
        <Route path={`${url}/study`}>
          <Study />
        </Route>
        <Route path={`${url}/edit`}>
          <Form />
        </Route>
        <Route path={`${url}/cards/new`}>
          <Form />
        </Route>
        <Route path={`${url}/cards/:cardId/edit`}>
          <Form />
        </Route>
      </Switch>
    </>
  );
}

export default DeckDetails;