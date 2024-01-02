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

  const [responseMessage, setResponseMessage] = useState('');

  const onChangeHandler = (event) => {
    setInputRegister({
      ...inputRegister,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmitHandlerRegister = (event) => {
    event.preventDefault();
    const { registerEmail: Email, registerPassword: Passwort, registerUserName: UserName } = inputRegister;

    fetch("http://localhost:3030/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserName, Email, Passwort }),
    })
      .then((response) => response.json())
      .then((data) => setResponseMessage(data.answer.data))
      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("Fehler bei der Registrierung.");
      });
  };

  const onSubmitHandlerLogin = (event) => {
  event.preventDefault();
  const { loginEmail: Email, loginPassword: Passwort } = inputRegister;

  fetch("http://localhost:3030/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email, Passwort }),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        // Wenn der Server einen Fehlerstatus sendet, werfen Sie einen Fehler
        return response.json().then((data) => {
          throw new Error(data.message || "Fehler beim Login");
        });
      }
      return response.json();
    })
    .then((data) => {
      setResponseMessage(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
      setResponseMessage(error.message);
    });
};

  const onSubmitHandlerDelete = (event) => {
    event.preventDefault();
    const { deleteEmail: Email } = inputRegister;

    fetch("http://localhost:3030/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setResponseMessage(data.answer.data))
      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("Fehler beim Löschen des Benutzers.");
      });
  };

  const onSubmitHandlerLogout = () => {
  fetch("http://localhost:3030/logout", {
    method: "POST", 
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.message) {
        setResponseMessage(data.message);
      } else {
        setResponseMessage("Logout erfolgreich, aber keine Antwort vom Server.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setResponseMessage("Fehler beim Logout.");
    });
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
      <button onClick={onSubmitHandlerLogout} id="logoutButton">Logout</button>

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

      <p>{responseMessage}</p>
    </>
  );
}

export default App;


