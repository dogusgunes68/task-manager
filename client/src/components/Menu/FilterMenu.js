import "./filterMenu.css";
import jwt from "jwt-decode";

export default function FilterMenu({ token }) {
  const { user } = jwt(token);
  console.log("user:", user);
  return (
    <div id="filter-menu-container">
      <ul>
        <li className="sabitRenk">
          <h3>Menu</h3>
        </li>
        {user.role === "supervisor" ? (
          <li>
            <a href="/addtask">Add a new task</a>
          </li>
        ) : (
          null
        )}

        <li>
          <a href="/">Tasks</a>
        </li>
      </ul>
    </div>
  );
}
