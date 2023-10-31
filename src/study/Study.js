import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Stepper from "../Layout/Stepper";
import NeedCards from "./NeedCards";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";

function Study({ decks }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", cards: [] });

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const selectedDeck = await readDeck(deckId);
        setDeck(selectedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

  return (
    <div className="container flex-sm-row">
      <Stepper
        currentPage={"Study"}
        parentPage={{ path: `/decks/${deckId}`, title: deck.name }}
      />
      <div className="container deck">
        <h1>{deck.name}: Study</h1>
        {deck.cards.length > 2 ? <StudyCard /> : <NeedCards deck={deck} />}
      </div>
    </div>
  );
}

export default Study;
