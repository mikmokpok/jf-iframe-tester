import React from "react";
import "./Header.css";

export default function header() {
  return (
    <div className="header">
      <div className="header-contents">
        <img
          src="./images/jotform-logo.png"
          alt="Jotform logo"
          className="jotform-logo"
        ></img>
        <h1 className="subheader">Iframe tweaking utility</h1>
      </div>
    </div>
  );
}
