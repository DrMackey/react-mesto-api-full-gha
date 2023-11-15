import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Login from './Login.js';
import Register from './Register.js';
import Main from './Main.js';
import AddPlacePopup from './AddPlacePopup.js';
import AuthPopup from './AuthPopup.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import api from '../utils/Api.js';
import {
  currentUserContext,
  currentUserCon,
} from '../contexts/CurrentUserContext.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(currentUserCon);
  const [userData, setUserData] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState({});
  const [isStatus, setIsStatus] = useState({});
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('token');

    api
      .checkToken(jwt)
      .then((res) => {
        if (res._id === jwt) {
          setUserData(res);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getDataCards();
    getDataUser();
  }

  function getDataCards() {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getDataUser() {
    api
      .getProfileData()
      .then((data) => {
        setCurrentUser(data);
        return data;
      })
      .then((res) => {
        setUserData(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, ...card });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    handleCardClick(false);
    setIsAuthPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id !== card._id ? c : '')));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserInfo(name, about)
      .then((profileData) => {
        setCurrentUser(profileData);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    console.log(avatar);
    api
      .updateAvatar(avatar)
      .then((profileData) => {
        setCurrentUser(profileData);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ title, link }) {
    setIsLoading(true);
    api
      .postCreateCard(title, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleHeaderLink(path) {
    setIsAuth(path);
  }

  function handleLoggedIn(boolean) {
    setLoggedIn(boolean);
  }

  function handleLogin() {
    const { password, email } = formValue;
    api
      .authorization(password, email)
      .then((res) => {
        tokenCheck();
        handleLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        setIsStatus({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsAuthPopupOpen(true);
      });
  }

  function handleRegister() {
    const { password, email } = formValue;
    api
      .register(password, email)
      .then((res) => {
        navigate('/sign-in', { replace: true });
        setIsStatus({ status: true, text: 'Вы успешно зарегистрировались!' });
        setIsAuthPopupOpen(true);
      })
      .catch((err) => {
        setIsStatus({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз',
        });
        setIsAuthPopupOpen(true);
      });
  }

  function signOut() {
    handleLoggedIn(false);
    localStorage.removeItem('token');
    api.deleteCookie().catch((err) => {
      console.log(err);
    });
    setUserData({ ...userData, email: '' });
  }

  return (
    <>
      <currentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            isAuth={isAuth}
            userData={userData}
            setCurrentUser={setCurrentUser}
            onLoggedIn={loggedIn}
            onSignOut={signOut}
          />
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  setCards={setCards}
                  cards={cards}
                  onHeaderLink={handleHeaderLink}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onHeaderLink={handleHeaderLink}
                  onLogin={handleLogin}
                  onSetFormValue={setFormValue}
                  onFormValue={formValue}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onHeaderLink={handleHeaderLink}
                  onRegister={handleRegister}
                  onSetFormValue={setFormValue}
                  onFormValue={formValue}
                />
              }
            />
          </Routes>
        </div>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <AuthPopup
          isOpen={isAuthPopupOpen}
          onClose={closeAllPopups}
          onIsStatus={isStatus}
        />
      </currentUserContext.Provider>
    </>
  );
}

export default App;
