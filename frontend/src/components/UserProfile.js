import { Link } from "react-router-dom";

export default function UserProfile({ onUserData, onSignOut }) {
  return (
    <>
      <p className="header__userInfo">{onUserData ? onUserData.email : ""}</p>
      <Link
        to="/sign-in"
        className={"header__link header__link_exit"}
        onClick={onSignOut}
      >
        Выйти
      </Link>
    </>
  );
}
