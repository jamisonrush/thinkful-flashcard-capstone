import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Stepper from "../Layout/Stepper";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", cards: [] });
  const [formData, setFormData] = useState({ front: "", back: "" });

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

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCard = {
      front: formData.front,
      back: formData.back,
    };

    createCard(deck.id, newCard);

    setFormData({
      front: "",
      back: "",
    });

    console.log("Submitted:", formData);
  };

  const onDoneClick = () => history.push(`/decks/${deck.id}`);

  return (
    <div className="container flex-sm-row">
      <Stepper
        currentPage={"Add Card"}
        parentPage={{ path: `/decks/${deckId}`, title: deck.name }}
      />
      <div className="container deck">
        <div className="d-flex">
          <h1 style={{ marginRight: "9px" }}>{deck.name}:</h1>
          <h1>Add Card</h1>
        </div>
        <CardForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onCancelClick={onDoneClick}
          isAddCard={true}
        />
      </div>
    </div>
  );
}

export default AddCard;
