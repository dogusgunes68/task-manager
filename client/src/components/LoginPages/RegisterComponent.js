import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../Modals/ErrorModal";

export default function RegisterComponent({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const navigate = useNavigate();

  const baseUrl = "http://localhost:2000/api/v1/";

  const register = (event) => {
    event.preventDefault();
    axios
      .post(baseUrl + "auth/signup", { username, email, password })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      })
      .catch((error) => {
        setError(error);
        showErrorModal();
      });
  };

  return (
    <div className="center">
      <form className="login-forms" onSubmit={(e) => register(e)}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          className="login-input"
          type="email"
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="login-button" type="submit">
          Register
        </button>
      </form>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setIsErrorModalOpen={setIsErrorModalOpen}
        error={error}
      />
    </div>
  );
}
