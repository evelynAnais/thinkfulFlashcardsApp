import { React, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DeckDetails from './Components/DeckDetails';
import DeckList from './Components/DeckList';
import NotFound from './NotFound';
import Header from './Header';
import { listDecks } from '../utils/api';
import DeckForm from './Components/DeckForm';



function Layout() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    async function getDecks() {
      const allDecks = await listDecks();
      setDecks(allDecks);
    }
    getDecks();
  }, []);
  
  const newDeckForm = {
    title: 'Create Deck',
    inputLabelOne: 'Name',
    inputLabelTwo: 'Description',
  }
  
  return (
    <>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <DeckList decks={decks} />
          </Route>
        <Route exact path='/decks/new'>
          <div>Breadcrumb</div>
          <DeckForm formProps={newDeckForm}/>
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
