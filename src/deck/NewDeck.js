import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Stepper from "../Layout/Stepper";
import { createDeck } from "../utils/api/index";

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
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label htmlFor="name" className="form-label" />
            Name:
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Deck Name"
              className="form-control"
            />
          </div>
          <div className="form-element">
            <label htmlFor="desc" className="form-label" />
            Description:
            <textarea
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Brief description of the deck"
              className="form-control"
            />
          </div>
          <div className="button-group">
          <button
            onClick={onClickCancel}
            className="btn btn-outline-danger"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-outline-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewDeck;
