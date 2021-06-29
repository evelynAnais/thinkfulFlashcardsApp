import { React, useEffect, useState } from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import CardList from './CardList';
import Study from './Study';
import DeckForm from './DeckForm';
import Deck from './Deck';
import CardForm from './CardForm';
import { readDeck } from '../../utils/api';

function DeckDetails() {
  const [deck, setDeck] = useState({});

  const { params: {deckId}, path } = useRouteMatch();

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
      <nav>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>Home</Link></li>
          <li className='breadcrumb-item active'>{deck.name}</li>
        </ol>
      </nav>
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
          <DeckForm formProps={editDeckForm} />
        </Route>
        <Route exact path={`${path}/cards/new`}>
          {/* card new */}
          <CardForm formProps={newCardForm} deck={deck}/>
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          {/* card edit */}
          <CardForm formProps={editCardForm} deck={deck}/>
        </Route>
      </Switch>
    </>
  );
}

export default DeckDetails;