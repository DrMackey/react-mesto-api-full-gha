import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const urlRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: urlRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="update-avatar"
      onClose={onClose}
      buttonName={`${isLoading ? "Сохранение..." : "Сохранить"}`}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          className="popup__input"
          id="link-update"
          name="link"
          placeholder="Ссылка на картинку"
          required
          ref={urlRef}
        />
        <span className="popup__input-error link-update-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
