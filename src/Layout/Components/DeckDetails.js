import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CardList from './CardList';
import Study from './Study';
import Form from './Form';

function DeckDetails() {
  const { path } = useRouteMatch();

  return(
    <>
      <div>Breadcrumb</div>
      <Switch>
        <Route path='/decks/new'>
          <Form />
        </Route>
        <Route path={`${path}`}>
          <CardList />
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
        <Route path={`${path}/cards/:cardId/edit`}>
          <Form />
        </Route>
      </Switch>
    </>
  );
}

export default DeckDetails;