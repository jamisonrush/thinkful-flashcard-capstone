import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Stepper from "../Layout/Stepper";
import { readDeck, listDecks, updateCard, readCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard({ decks, setDecks }) {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ name: "", cards: [] });
  const [card, setCard] = useState({});
  const [formData, setFormData] = useState({ front: "", back: "" });

  useEffect(() => {
    const loadCard = async () => {
      try {
        const selectedCard = await readCard(cardId);
        setCard(selectedCard);
        setFormData({
          front: selectedCard.front,
          back: selectedCard.back,
        });
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };
    const loadDeck = async () => {
      try {
        const selectedDeck = await readDeck(deckId);
        setDeck(selectedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadCard();
    loadDeck();
  }, [cardId, deckId]);

  const onClickCancel = () => {
    history.push(`/decks/${deck.id}`);
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCard = {
      id: card.id,
      front: formData.front,
      back: formData.back,
      deckId: card.deckId,
    };

    try {
      await updateCard(updatedCard);
      const decks = await listDecks();
      setDecks(decks);
      console.log("Decks have been updated.");
    } catch (error) {
      console.error("Error updating card:", error);
    }

    console.log("Submitted:", formData);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div className="container flex-sm-row">
      <Stepper
        currentPage={"Edit Card"}
        parentPage={{ path: `/decks/${deckId}`, title: deck.name }}
      />
      <div className="container deck">
        <h1>Edit Card</h1>
        <CardForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onCancelClick={onClickCancel}
          isAddCard={false}
        />
      </div>
    </div>
  );
}

export default EditCard;
