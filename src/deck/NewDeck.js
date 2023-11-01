import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Stepper from "../Layout/Stepper";
import { createDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

function NewDeck({ setDecks }) {
  const history = useHistory();

  const initialFormState = {
    name: "",
    desc: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDeck = {
      name: formData.name,
      description: formData.desc,
      cards: [],
    };

    try {
      const createdDeck = await createDeck(newDeck);
      setDecks((prevDecks) => [...prevDecks, createdDeck]);
      history.push(`/decks/${createdDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  const onClickCancel = () => {
    history.push(`/`);
  };

  return (
    <div className="container flex-sm-row">
      <Stepper currentPage={"Create Deck"} />
      <div
        className="container deck"
        style={{
          border: "1px solid #000",
          textAlign: "left",
          borderRadius: "4px",
        }}
      >
        <h1>Create Deck</h1>
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

export default NewDeck;
