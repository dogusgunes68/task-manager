import "./filterMenu.css";
import jwt from "jwt-decode";

export default function FilterMenu({ token }) {
  const { user } = jwt(token);
  console.log("user:", user);
  return (
    <div id="filter-menu-container">
      <ul>
        <li className="sabitRenk">
          <h3>Filter Menu</h3>
        </li>
        {user.role === "supervisor" ? (
          <li>
            <a href="/addtask">Add a new task</a>
          </li>
        ) : (
          <li>
            <a href="#">Change Task State</a>
          </li>
        )}

        <li>
          <a href="/">Tasks</a>
        </li>
        <li>
          <a href="#">Filter 4</a>
        </li>
        <li>
          <a href="#">Filter 5</a>
        </li>
        <li>
          <a href="#">Filter 6</a>
        </li>
      </ul>
    </div>
  );
}
