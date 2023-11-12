import { useEffect } from "react";

export default function Login({
  onHeaderLink,
  onLogin,
  onSetFormValue,
  onFormValue,
}) {
  useEffect(() => {
    onHeaderLink({ endPoint: "/sign-up", title: "Регистрация" });
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

    onLogin();
  };

  return (
    <section className="authForm" id="authForm_auth">
      <div className="authForm__container">
        <h2 className="authForm__title">Вход</h2>
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
              Войти
            </button>
            <span className="authForm__link"></span>
          </div>
        </form>
      </div>
    </section>
  );
}
