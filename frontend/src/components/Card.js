import React from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(currentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `list__like-button button ${
    isLiked && 'list__like-button_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="list__item">
      {isOwn && (
        <button
          className="list__delete-button button list__delete-button_visible"
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="list__image"
        onClick={handleClick}
      />
      <div className="list__wrapper">
        <h2 className="list__title">{card.name}</h2>
        <div className="list__wrapper-likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="list__likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
