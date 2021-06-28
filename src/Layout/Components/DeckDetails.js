import { React, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CardList from './CardList';
import Study from './Study';
import Form from './Form';
import Deck from './Deck';
import { readDeck } from '../../utils/api';

function DeckDetails() {
  const [deck, setDeck] = useState({});
  const { params: {deckId}, url, path } = useRouteMatch();

  useEffect (() => {
    async function getDeck() {
      const responseDeck = await readDeck(deckId);
      setDeck(responseDeck);
    }
    getDeck();
  }, [])

console.log('url', url)
console.log('path', path)
  return(
    <>
      <div>Breadcrumb</div>
      <Switch>
        <Route path='/decks/new'>
          <Form />
        </Route>
        <Route exact path={`${path}`}>
          <Deck deck={deck} />
          <h2>Cards</h2>
          <CardList cards={deck.cards} />
        </Route>
        <Route path={`${path}/study`}>
          <Study />
        </Route>
        <Route path={`${path}/edit`}>
          <Form />
        </Route>
        <Route path={`${path}/cards/new`}>
          <Form />
        </Route>
        <Route exact path={`${path}}/cards/:cardId/edit`}>
          <Form />
        </Route>
      </Switch>
    </>
  );
}

export default DeckDetails;