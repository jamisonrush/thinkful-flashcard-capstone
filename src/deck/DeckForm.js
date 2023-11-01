import React from "react";

function DeckForm({ formData, handleChange, handleSubmit, onCancelClick }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-element">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
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
        <label htmlFor="desc" className="form-label">
          Description:
        </label>
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
        <button onClick={onCancelClick} className="btn btn-outline-danger">
          Cancel
        </button>
        <button type="submit" className="btn btn-outline-success">
          Submit
        </button>
      </div>
    </form>
  );
}

export default DeckForm;
