import React from "react";
import { useHistory } from "react-router-dom";

export default function Stepper({
  currentPage,
  parentPage = { path: null, title: null },
}) {
  const history = useHistory();

  const onClickHome = () => {
    history.push(`/`);
  };

  return (
    <div className="d-flex">
      <button
        onClick={onClickHome}
        className="btn btn-link"
        style={{ display: "contents"}}
      >
        Home
      </button>
      {parentPage.path && (
        <div>
          <p style={{ marginLeft: "4px", marginRight: "4px" }}> / </p>
          <button
            onClick={() => history.push(parentPage.path)}
            className="btn btn-link"
            style={{ display: "contents"}}
          >
            {parentPage.title}
          </button>
        </div>
      )}
      <p style={{ marginLeft: "4px" }}>/ {currentPage}</p>
    </div>
  );
}
