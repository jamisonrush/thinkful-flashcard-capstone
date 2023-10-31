import React from "react";
import { useHistory } from "react-router-dom";

import { deleteCard } from "../utils/api/index";

function CardPreview({ card, onDeleteCard }) {
  const history = useHistory();

  const onEditCardsClick = () => {
    history.push(`/decks/${card.deckId}/cards/${card.id}/edit`);
  };

  const onClickDelete = () => {
    window.confirm("Delete this card?\nYou will not be able to recover it.") &&
      deleteCard(card.id);
    onDeleteCard(card);
  };

  return (
    <div className="deck">
      <p>{card.front}</p>
      <p>{card.back}</p>
      <button onClick={onEditCardsClick} className="btn btn-outline-primary">
        Edit
      </button>
      <button onClick={onClickDelete} className="btn btn-outline-danger">
        Delete
      </button>
    </div>
  );
}

export default CardPreview;
