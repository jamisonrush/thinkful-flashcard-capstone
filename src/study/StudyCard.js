import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyCard() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [side, setSide] = useState("front");
  const [cardIndex, setCardIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const selectedDeck = await readDeck(deckId);
        setCards([...selectedDeck.cards]);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

  const onNextClick = () => {
    if (cards.length > 0 && cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
      setSide("front");
    } else {
      if (
        window.confirm(
          "Restart cards?\nClick 'cancel' to return to the home page."
        )
      ) {
        setCardIndex(0);
        setSide("front");
      } else {
        history.push(`/`);
      }
    }
  };

  const onFlipClick = () => {
    if (side === "front") {
      setSide("back");
    } else {
      setSide("front");
    }
  };

  const currentCard = cards[cardIndex] || { front: "", back: "" };

  return (
    <div className="deck">
      <p>
        Card {cardIndex + 1} of {cards.length}
      </p>
      {side === "front" ? (
        <p>{currentCard.front}</p>
      ) : (
        <p>{currentCard.back}</p>
      )}
      <button onClick={onFlipClick} className="btn btn-outline-primary">Flip</button>
      {side === "back" && <button onClick={onNextClick} className="btn btn-outline-success">Next</button>}
    </div>
  );
}

export default StudyCard;
