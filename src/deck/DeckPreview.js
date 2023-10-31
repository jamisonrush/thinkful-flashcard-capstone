import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";
import "../App.css";

function DeckPreview({ deck, onDeleteDeck }) {
  const history = useHistory();

  const onViewClick = () => {
    history.push(`/decks/${deck.id}`);
  };

  const onStudyClick = () => {
    history.push(`/decks/${deck.id}/study`);
  };

  const onClickDelete = () => {
    if (
      window.confirm("Delete this deck?\nYou will not be able to recover it.")
    ) {
      deleteDeck(deck.id);
      onDeleteDeck(deck);
    }
  };

  return (
    <div className="container deck">
      <h1>{deck.name}</h1>
      <p>{deck.cards.length} cards</p>
      <p>{deck.description}</p>
      <button onClick={onViewClick} className="btn btn-outline-primary">
        View
      </button>
      <button onClick={onStudyClick} className="btn btn-outline-primary">
        Study
      </button>
      <button onClick={onClickDelete} className="btn btn-outline-danger">
        Delete
      </button>
    </div>
  );
}

export default DeckPreview;
