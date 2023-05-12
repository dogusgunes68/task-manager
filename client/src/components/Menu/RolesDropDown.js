import axios from "axios";
import React, { useEffect, useState } from "react";

function RolesDropDown({ roles, user, setUser }) {
  const [selectedRole, setSelectedRole] = useState("Select Role");

  const changeRole = (role) => {
    setSelectedRole(role);
  };

  useEffect(() => {
    document.getElementById("role-dropdown-item").innerHTML = selectedRole;

    setUser({ ...user, role: selectedRole });
  }, [selectedRole]);

  //   useEffect(() => {
  //     document.getElementById("role-dropdown-item").innerHTML = selectedUser;
  //     //get user_id by username - axios
  //     if (selectedUser !== "Select User") {
  //       console.log("servise gitti");
  //       axios
  //         .get(baseUrl + `user/${selectedUser}`)
  //         .then((res) => {
  //           const id = res.data.data.user[0].id;
  //           console.log("id:", res.data.data.user[0].id);
  //           setUser({ ...user, user_id: id });
  //         })
  //         .catch((error) => {
  //           console.log(error.message);
  //         });
  //     }
  //   }, [selectedUser]);

  return (
    <div className="dropdown">
      <button
        id="role-dropdown-item"
        type="button"
        className="btn btn-dark dropdown-toggle"
        data-toggle="dropdown"
      >
        Select Role
      </button>
      <div className="dropdown-menu">
        {roles.map((role) => (
          <button
            onClick={() => changeRole(role)}
            key={role}
            className="dropdown-item"
            type="button"
          >
            {role}
          </button>
        ))}
        {/* <button
          className="dropdown-item"
          type="button"
          onClick={() => changeUser("All Users")}
        >
          All Users
        </button> */}
      </div>
    </div>
  );
}

export default RolesDropDown;
