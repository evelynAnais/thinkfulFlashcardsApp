import { React, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CardList from './CardList';
import Study from './Study';
import DeckForm from './DeckForm';
import Deck from './Deck';
import CardForm from './CardForm';
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

  const editDeckSubmit = (event) => {
    
  }
  
  const editDeckForm = {
    title: 'Edit Deck',
    inputLabelOne: 'Name',
    inputLabelTwo: 'Description',
  }
  const newCardForm = {
    title: 'Add Card',
    inputLabelOne: 'Front',
    inputLabelTwo: 'Back',
  }
  const editCardForm = {
    title: 'Edit Card',
    inputLabelOne: 'Front',
    inputLabelTwo: 'Back',
  }

  return(
    <>
      <div>Breadcrumb</div>
      <Switch>
        <Route exact path={`${path}`}>
          <Deck deck={deck} />
          <h2>Cards</h2>
          <CardList cards={deck.cards} />
        </Route>
        <Route path={`${path}/study`}>
          <Study />
        </Route>
        <Route path={`${path}/edit`}>
          {/* deck edit */}
          <DeckForm formProps={editDeckForm} deck={deck}/>
        </Route>
        <Route path={`${path}/cards/new`}>
          {/* card new */}
          <CardForm formProps={newCardForm}/>
        </Route>
        <Route exact path={`${path}}/cards/:cardId/edit`}>
          {/* card edit */}
          <CardForm formProps={editCardForm}/>
        </Route>
      </Switch>
    </>
  );
}

export default DeckDetails;