import React from "react";

import { useHistory } from "react-router-dom";

function NeedCards({ deck }) {
  const history = useHistory();
  const onNewCardsClick = () => history.push(`/decks/${deck.id}/cards/new`);
  return (
    <div>
      <h2>Not enough cards</h2>
      <p>
        You need at least 3 cards to study. Cards in this deck:{" "}
        {deck.cards.length}
      </p>
      <button onClick={onNewCardsClick} className="btn btn-outline-success">Add Cards</button>
    </div>
  );
}

export default NeedCards;
