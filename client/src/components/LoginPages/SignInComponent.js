import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import ErrorModal from "../Modals/ErrorModal";

export default function SignUpComponent({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const auth = useAuth();
  const location = useLocation();

  const baseUrl = "http://192.168.1.74:2000/api/v1/";

  const redirectPath = location.state?.path || "/";

  const login = (event) => {
    event.preventDefault();

    axios
      .post(baseUrl + "auth/login", { email, password })
      .then((response) => {
        console.log(response.data.token);
        //if token is exists, perform routing
        //auth.login(response.data.data.user);
        //setToken(response.data.token);
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        //console.log(redirectPath);
      })
      .catch((error) => {
        setError(error);
        showErrorModal();
      });
  };

  return (
    <div className="center">
      <form className="login-forms" onSubmit={(e) => login(e)}>
        <input
          className="login-input"
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="login-button" type="submit" onClick={login}>
          Login
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
