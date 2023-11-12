import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_image ${card.isOpen ? "popup_opened" : ""}`}
    >
      <figure className="popup__container popup__container_image">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </section>
  );
}
