import React from "react";

function CardForm({
  formData,
  handleChange,
  handleSubmit,
  onCancelClick,
  isAddCard,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-element">
        <label htmlFor="front" className="form-label">
          Front:
        </label>
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
        <label htmlFor="back" className="form-label">
          Back:
        </label>
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
        <button onClick={onCancelClick} className="btn btn-outline-danger">
          {isAddCard ? "Done" : "Cancel"}
        </button>
        <button type="submit" className="btn btn-outline-success">
          {isAddCard ? "Save" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default CardForm;
