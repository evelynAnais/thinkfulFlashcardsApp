import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import DeckDetails from './Components/DeckDetails';
import DeckList from './Components/DeckList';
import NotFound from './NotFound';
import Header from './Header';
import DeckForm from './Components/DeckForm';



function Layout() {
  
  const newDeckForm = {
    title: 'Create Deck',
    inputLabelOne: 'Name',
    inputLabelTwo: 'Description',
    submitType: 'newDeck',
  };
  
  return (
    <>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <DeckList />
          </Route>
        <Route exact path='/decks/new'>
          <nav>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to='/'>Home</Link></li>
              <li className='breadcrumb-item active'>Create Deck</li>
            </ol>
          </nav>
          <DeckForm formProps={newDeckForm} />
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
