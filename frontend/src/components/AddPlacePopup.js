import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlaceSubmit,
  isLoading,
}) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handlePlaceSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Новое место"
      name="new-card"
      onClose={onClose}
      buttonName={`${isLoading ? "Создание..." : "Создать"}`}
      onSubmit={handlePlaceSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          id="naming"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={title ?? ""}
          onChange={handleChangeTitle}
        />
        <span className="popup__input-error naming-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          className="popup__input"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link ?? ""}
          onChange={handleChangeLink}
        />
        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
