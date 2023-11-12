import React from "react";

export default function PopupWithForm({
  isOpen,
  name,
  title,
  children,
  onClose,
  buttonName,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      id={`popup_type_${name}`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close button"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__input-form"
          id={`form-${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          <fieldset className="popup__set">
            {children}
            <button
              className="popup__button button "
              type="submit"
              form={`form-${name}`}
            >
              {buttonName}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
