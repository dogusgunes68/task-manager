import React, { useEffect, useState } from "react";
import "./../addtask/addTask.css";
import axios from "axios";

const baseUrl = "http://localhost:2000/api/v1/";

function UsersDropDown({ usernames, user, setUser }) {
  const [selectedUser, setSelectedUser] = useState("Select User");

  const changeUser = (username) => {
    setSelectedUser(username);
  };

  useEffect(() => {
    document.getElementById("user-dropdown-item").innerHTML = selectedUser;
    //get user_id by username - axios
    if (selectedUser !== "Select User") {
      console.log("servise gitti");
      axios
        .get(baseUrl + `user/${selectedUser}`)
        .then((res) => {
          const id = res.data.data.user[0].id;
          console.log("id:", res.data.data.user[0].id);
          setUser({ ...user, user_id: id });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [selectedUser]);

  return (
    <div className="dropdown">
      <button
        id="user-dropdown-item"
        type="button"
        className="btn btn-dark dropdown-toggle"
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
