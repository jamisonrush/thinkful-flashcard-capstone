import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CardPreview from "../card/CardPreview";
import Stepper from "../Layout/Stepper";
import { readDeck, deleteDeck } from "../utils/api";

function DeckDetails({ onDeleteDeck }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const selectedDeck = await readDeck(deckId);
        setDeck(selectedDeck);
        setCards([...selectedDeck.cards]);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

  const onDeleteCard = (deletedCard) => {
    const updatedCards = cards.filter((card) => card.id !== deletedCard.id);
    setCards(updatedCards);
  };

  const onStudyClick = () => history.push(`/decks/${deck.id}/study`);
  const onNewCardsClick = () => history.push(`/decks/${deck.id}/cards/new`);
  const onEditClick = () => history.push(`/decks/${deck.id}/edit`);
  const onClickDelete = () => {
    if (
      window.confirm("Delete this deck?\nYou will not be able to recover it.")
    ) {
      deleteDeck(deck.id);
      onDeleteDeck(deck);
      history.push("/");
    }
  };

  return (
    <div className="container flex-sm-row">
      <Stepper currentPage={deck.name} />
      <div className="container deck">
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <div className="button-group">
          <button onClick={onEditClick} className="btn btn-outline-primary">
            Edit
          </button>
          <button onClick={onStudyClick} className="btn btn-outline-primary">
            Study
          </button>
          <button onClick={onNewCardsClick} className="btn btn-outline-success">
            Add Cards
          </button>
          <button onClick={onClickDelete} className="btn btn-outline-danger">
            Delete
          </button>
        </div>
        <h1>Cards</h1>
        <ul>
          {cards.map((card) => (
            <CardPreview
              card={card}
              onDeleteCard={onDeleteCard}
              key={card.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DeckDetails;
