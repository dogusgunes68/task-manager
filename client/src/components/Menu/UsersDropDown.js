import React, { useEffect, useState } from "react";
import "./../addTask.css";

function UsersDropDown({ usernames, user, setUser }) {
  const [selectedUser, setSelectedUser] = useState("Select User");

  const changeUser = (username) => {
    setSelectedUser(username);
  };

  useEffect(() => {
    document.getElementById("user-dropdown-item").innerHTML = selectedUser;
    //get user_id by username - axios
    if (selectedUser !== "Select User") {
      setUser({ ...user, user_id: 2 });
    }
  }, [selectedUser]);

  return (
    <div className="dropdown">
      <button
        id="user-dropdown-item"
        type="button"
        className="btn btn-info dropdown-toggle"
        data-toggle="dropdown"
      >
        Select User
      </button>
      <div className="dropdown-menu">
        {usernames.map((user) => (
          <button
            onClick={() => changeUser(user.username)}
            key={user.username}
            className="dropdown-item"
            type="button"
          >
            {user.username}
          </button>
        ))}

        <div className="dropdown-divider"></div>
        <button
          className="dropdown-item"
          type="button"
          onClick={() => changeUser("All Users")}
        >
          All Users
        </button>
      </div>
    </div>
  );
}

export default UsersDropDown;
