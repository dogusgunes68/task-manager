import React from "react";
import "./navbarMenu.css";
import { useNavigate } from "react-router-dom";

export default function NavbarMenu({ name, setToken }) {
  console.log("username:", name);
  const navigate = useNavigate();
  return (
    <div id="navbar-menu-container">
      <ul className="header">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#">Account</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li id="username">
          <div>{name}</div>
        </li>
        <li id="logout">
          <div
            style={{ color: "white" }}
            onClick={() => {
              sessionStorage.setItem("token", null);
              setToken(null);
              navigate("/");
            }}
          >
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
}
