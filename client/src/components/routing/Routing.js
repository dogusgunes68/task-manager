import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BreadCrumbCustom from "../layout/superUser/BreadCrumbCustom";
import DragDrop from "../dragndrop/DragDrop";
import AddTask from "../addtask/AddTask";
import jwtDecode from "jwt-decode";
import AddUser from "../adduser/AddUser";

export default function Routing({ socket, selectedUsername, token }) {
  let user = jwtDecode(token);
  //const [selectedUser, setSelectedUser] = useState(null);
  // console.log(selectedUsername);

  useEffect(() => {
    //service get user id
  }, [selectedUsername]);

  let condition = user.user.role === "supervisor" || user.user.role === "user";
  return (
    <>
      <Routes>
        {user && user.user.role === "admin" && (
          <Route
            path="/adduser"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddUser />
              </div>
            }
          ></Route>
        )}
        {user && condition && (
          <Route
            path="/tasks"
            element={
              <>
                <BreadCrumbCustom username={selectedUsername} />
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    minHeight: 360,
                  }}
                >
                  <DragDrop username={selectedUsername} socket={socket} />
                </div>
              </>
            }
          ></Route>
        )}
        {user && user.user.role !== "admin" && (
          <Route
            path="/addtask"
            element={<AddTask token={token} socket={socket} />}
          ></Route>
        )}
      </Routes>
    </>
  );
}
