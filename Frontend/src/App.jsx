import { useState } from "react";
import "./App.css";

function App() {
  const [inputRegister, setInputRegister] = useState({
    registerUserName: "",
    registerEmail: "",
    registerPassword: "",
    loginEmail: "",
    loginPassword: "",
    deleteEmail: "",
  });

  const onChangeHandler = (event) => {
    console.log(event.target.id);

    setInputRegister({
      ...inputRegister,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmitHandlerRegister = (event) => {
    event.preventDefault();
    const Email = inputRegister.registerEmail;
    const Passwort = inputRegister.registerPassword;
    const UserName = inputRegister.registerUserName;

    fetch("http://localhost:3030/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserName, Email, Passwort }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };

  const onSubmitHandlerLogin = (event) => {
    event.preventDefault();
    const Email = inputRegister.loginEmail;
    const Passwort = inputRegister.loginPassword;

    fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, Passwort }),
      credentials: "include", // Aktiviere Cookies für die Anfrage
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };

  const onSubmitHandlerDelete = (event) => {
    event.preventDefault();
    const Email = inputRegister.deleteEmail;
    fetch("http://localhost:3030/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email }),
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <h1>Willkommen bei Meine App</h1>

      <h2>Registrieren</h2>
      <form onSubmit={onSubmitHandlerRegister} id="registerForm">
        <input
          onChange={onChangeHandler}
          type="text"
          id="registerUserName"
          placeholder="Username"
        />
        <input
          onChange={onChangeHandler}
          type="email"
          id="registerEmail"
          placeholder="E-Mail"
        />
        <input
          onChange={onChangeHandler}
          type="password"
          id="registerPassword"
          placeholder="Passwort"
        />
        <button type="submit">Registrieren</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={onSubmitHandlerLogin} id="loginForm">
        <input
          onChange={onChangeHandler}
          type="email"
          id="loginEmail"
          placeholder="E-Mail"
        />
        <input
          onChange={onChangeHandler}
          type="password"
          id="loginPassword"
          placeholder="Passwort"
        />
        <button type="submit">Login</button>
      </form>

      <h2>Logout</h2>
      <button id="logoutButton">Logout</button>

      <h2>Benutzer Löschen</h2>
      <form onSubmit={onSubmitHandlerDelete} id="deleteUserForm">
        <input
          onChange={onChangeHandler}
          type="email"
          id="deleteEmail"
          placeholder="E-Mail zum Löschen"
        />
        <button type="submit">Benutzer Löschen</button>
      </form>

      <div id="response"></div>
    </>
  );
}

export default App;
