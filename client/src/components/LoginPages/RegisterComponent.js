import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterComponent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const baseUrl = "http://localhost:2000/api/v1/";

  const register = (event) => {
    event.preventDefault();
    axios
      .post(baseUrl + "auth/signup", { username, email, password })
      .then((response) => {
        console.log(response);
        navigate("/tasks");
      })
      .catch((error) => {
        console.log(error.message);
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
    </div>
  );
}
