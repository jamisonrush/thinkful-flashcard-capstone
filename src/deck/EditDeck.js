import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Stepper from "../Layout/Stepper";
import { updateDeck, readDeck, listDecks } from "../utils/api/index";
import DeckForm from "./DeckForm";

function EditDeck({ decks, setDecks }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", cards: [] });
  const [formData, setFormData] = useState({ name: "", desc: "" });

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const selectedDeck = await readDeck(deckId);
        setDeck(selectedDeck);
        setFormData({
          name: selectedDeck.name,
          desc: selectedDeck.description,
        });
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

  const onClickCancel = () => {
    history.push(`/decks/${deck.id}`);
  };

  const handleChange = ({ target }) => {
    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedDeck = {
        id: deck.id,
        name: formData.name,
        description: formData.desc,
        cards: deck.cards,
      };

      await updateDeck(updatedDeck);
      const updatedDecks = await listDecks();
      setDecks(updatedDecks);
      console.log("Decks have been updated.");
    } catch (error) {
      console.error("Error updating deck:", error);
    }

    console.log("Submitted:", formData);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div className="container flex-sm-row">
      <Stepper
        currentPage={"Edit Deck"}
        parentPage={{ path: `/decks/${deckId}`, title: deck.name }}
      />
      <div className="container deck">
        <h1>Edit Deck</h1>
        <DeckForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onCancelClick={onClickCancel}
        />
      </div>
    </div>
  );
}

export default EditDeck;
