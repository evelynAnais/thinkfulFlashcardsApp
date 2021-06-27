import { React, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DeckDetails from './Components/DeckDetails';
import DeckList from './Components/DeckList';
import NotFound from './NotFound';
import Header from './Header';
import { listDecks } from '../utils/api';



function Layout() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    const allDecks = await listDecks();
    console.log('alldecks ',allDecks)
    setDecks(allDecks)
  })
  
  
  return (
    <>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <DeckList decks={decks} />
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
