import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function Deck({ deck }) {
  const { path } = useRouteMatch();

  return(
    <>
    <h2>{deck.name}</h2>
    <p>{deck.description}</p>
    <Link to={`${path}`}>View</Link>
    <Link to={`${path}/study`}>Study</Link>
    <button></button>
    </>
  );
}

export default Deck;