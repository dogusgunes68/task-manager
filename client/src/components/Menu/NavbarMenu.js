import React from "react";
import "./navbarMenu.css";

export default function NavbarMenu({ setToken }) {
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
        <li id="logout">
          <a
            href="/"
            onClick={() => {
              sessionStorage.setItem("token", null);
              setToken(null);
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
