import React from "react";
import { useHistory } from "react-router-dom";
import DeckPreview from "./DeckPreview";

function DeckList({ decks, onDeleteDeck }) {
  const history = useHistory();

  return (
    <div className="container flex-sm-row">
    <button
      onClick={() => history.push("/decks/new")}
      className="btn btn-outline-success"
      style={{ marginBottom: "10px" }}
    >
      Create Deck
    </button>
    {decks.map((deck) => (
      <DeckPreview
        deck={deck}
        key={deck.id}
        onDeleteDeck={onDeleteDeck}
      />
    ))}
  </div>
  );
}

export default DeckList;
