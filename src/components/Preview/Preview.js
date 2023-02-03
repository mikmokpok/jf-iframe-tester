import React from "react";
import "./Preview.css";

export default function Preview(props) {
  return (
    <>
      <div
        className="preview-backdrop"
        onClick={() => props.setModal(false)}
      ></div>
      <div className="preview-modal">
        <button onClick={() => props.setModal(false)}>✖</button>
        <iframe
          title="Preview"
          name="preview-iframe"
          id="preview-iframe"
        ></iframe>
      </div>
    </>
  );
}
