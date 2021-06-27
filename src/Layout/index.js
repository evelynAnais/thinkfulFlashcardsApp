import React from "react";
import { Route, Switch } from 'react-router-dom';
import DeckDetails from "./Components/DeckDetails";
import DeckList from "./Components/DeckList";
import NotFound from "./NotFound";
import Header from "./Header";



function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <DeckList />
          </Route>
          <Route path='/decks/:deckId'>
            <DeckDetails />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
