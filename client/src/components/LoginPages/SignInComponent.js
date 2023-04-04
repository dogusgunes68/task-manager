import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "./auth";

export default function SignUpComponent({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();
  const location = useLocation();

  const baseUrl = "http://localhost:2000/api/v1/";

  const redirectPath = location.state?.path || "/tasks";

  const login = (event) => {
    event.preventDefault();

    axios
      .post(baseUrl + "auth/login", { email, password })
      .then((response) => {
        console.log(response);
        //if token is exists, perform routing
        //auth.login(response.data.data.user);
        setUser(response.data.data.user);
        console.log(redirectPath);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
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
    </div>
  );
}
