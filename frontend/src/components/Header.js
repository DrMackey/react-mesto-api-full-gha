import { Link } from "react-router-dom";
import UserProfile from "./UserProfile.js";
import { useState } from "react";
import logo from "../images/logo/header__logo.svg";

export default function Header({ isAuth, onLoggedIn, userData, onSignOut }) {
  const { endPoint, title } = isAuth;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuOpened() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {onLoggedIn ? (
        <div className={`menu ${isMenuOpen ? "" : "menu_closed"}`}>
          <UserProfile onUserData={userData} onSignOut={onSignOut} />
        </div>
      ) : (
        ""
      )}
      <header className="header">
        <img src={logo} className="header__logo" alt="Логотип."></img>

        {onLoggedIn ? (
          <>
            <div className="header__desc-container">
              <UserProfile onUserData={userData} onSignOut={onSignOut} />
            </div>
            <div
              className={`header__mobile-container ${
                isMenuOpen ? "header__mobile-container_opened" : ""
              }`}
              onClick={handleMenuOpened}
            ></div>
          </>
        ) : (
          <Link to={endPoint ? endPoint : "/"} className="header__link">
            {title}
          </Link>
        )}
      </header>
    </>
  );
}
