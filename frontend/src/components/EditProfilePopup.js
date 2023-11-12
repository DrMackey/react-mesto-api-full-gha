import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { currentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = React.useContext(currentUserContext);
  const [name, setName] = useState(currentUser.name ?? "");
  const [description, setDescription] = useState(currentUser.about ?? "");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDesctiption(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      name="edit"
      onClose={onClose}
      buttonName={`${isLoading ? "Сохранение..." : "Сохранить"}`}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          id="name"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name ?? ""}
          onChange={handleChangeName}
        />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          id="subtitle"
          name="subtitle"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description ?? ""}
          onChange={handleChangeDesctiption}
        />
        <span className="popup__input-error subtitle-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
