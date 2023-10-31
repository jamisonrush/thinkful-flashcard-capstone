import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Stepper from "../Layout/Stepper";
import { readDeck, createCard } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", cards: [] });
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

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
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label htmlFor="front" className="form-label" />
            Front:
            <textarea
              id="front"
              name="front"
              placeholder="Front side of card"
              onChange={handleChange}
              value={formData.front}
              className="form-control"
            />
          </div>
          <div className="form-element">
            <label htmlFor="back" className="form-label" />
            Back:
            <textarea
              id="back"
              name="back"
              placeholder="Back side of card"
              onChange={handleChange}
              value={formData.back}
              className="form-control"
            />
          </div>
          <div className="button-group">
            <button onClick={onDoneClick} className="btn btn-outline-danger">
              Done
            </button>
            <button type="submit" className="btn btn-outline-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCard;
