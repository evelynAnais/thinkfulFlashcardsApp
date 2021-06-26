import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CardList from './CardList';
import Study from './Study';
import Form from './Form';


function DeckDetails() {
  return(
    <>
      <div>Breadcrumb</div>
      <Switch>
        <Route path='/decks/new'>
          <Form />
        </Route>
        <Route path='/decks/:deckId'>
          <CardList />
        </Route>
        <Route path='/decks/:deckId/study'>
          <Study />
        </Route>
        <Route path='/decks/:deckId/edit'>
          <Form />
        </Route>
        <Route path='/decks/:deckId/cards/new'>
          <Form />
        </Route>
        <Route path='/decks/:deckId/cards/:cardId/edit'>
          <Form />
        </Route>
        
      </Switch>
    </>
  );
}

export default DeckDetails;