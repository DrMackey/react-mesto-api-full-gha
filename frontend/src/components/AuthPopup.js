import React from "react";

export default function AuthPopup({ isOpen, onClose, onIsStatus }) {
  return (
    <section
      className={`popup popup_type_auth ${isOpen ? "popup_opened" : ""}`}
      id={`popup_type_auth`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        ></button>
        <div
          className={`popup__status ${
            onIsStatus.status ? "popup__status_success" : "popup__status_failed"
          }`}
        ></div>
        <h1 className="popup__title-status">{onIsStatus.text}</h1>
      </div>
    </section>
  );
}
