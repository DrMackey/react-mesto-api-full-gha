import React, { useEffect } from 'react';
import Card from './Card.js';
import Footer from './Footer.js';
import { currentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  onHeaderLink,
}) {
  useEffect(() => {
    onHeaderLink({ endPoint: '/sign-in', title: 'Выйти' });
  }, []);

  const currentUser = React.useContext(currentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватар пользователя."
              className="profile__avatar"
            />
            <div className="profile__avatar-overlay"></div>
          </div>
          <div className="profile__container">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button button"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="group">
          <ul className="list">
            {cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
