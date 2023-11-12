import { useEffect } from "react";
import { Link } from "react-router-dom";

const Register = ({
  onHeaderLink,
  onRegister,
  onSetFormValue,
  onFormValue,
}) => {
  useEffect(() => {
    onHeaderLink({ endPoint: "/sign-in", title: "Войти" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    onSetFormValue({
      ...onFormValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister();
  };

  return (
    <section className="authForm">
      <div className="authForm__container">
        <h2 className="authForm__title">Регистрация</h2>
        <form className="authForm__form" id="form-auth" onSubmit={handleSubmit}>
          <fieldset className="authForm__set">
            <label className="authForm__field">
              <input
                type="email"
                className="authForm__input"
                id="email"
                name="email"
                placeholder="Email"
                required
                minLength="2"
                maxLength="40"
                value={onFormValue.email}
                onChange={handleChange}
              />
              <span className="authForm__input-error email-input-error"></span>
            </label>
            <label className="authForm__field">
              <input
                type="password"
                className="authForm__input"
                id="password"
                name="password"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                value={onFormValue.username}
                onChange={handleChange}
              />
              <span className="authForm__input-error password-input-error"></span>
            </label>
          </fieldset>
          <div className="authForm__buttonContainer">
            <button
              className="authForm__button button"
              type="submit"
              form="form-auth"
            >
              Зарегистрироваться
            </button>
            <Link to="/sign-in" className="authForm__link">
              Уже зарегистрированы? Войти
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
