import React from "react";
import { Route, Routes } from "react-router-dom";
import BreadCrumbCustom from "../layout/superUser/BreadCrumbCustom";
import DragDrop from "../dragndrop/DragDrop";
import AddTask from "../addtask/AddTask";
import jwtDecode from "jwt-decode";

export default function Routing({ socket, selectedKeys, token }) {
  let user = jwtDecode(token);

  return (
    <>
      <Routes>
        <Route
          path="/tasks"
          element={
            <>
              <BreadCrumbCustom />
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 360,
                }}
              >
                <DragDrop socket={socket} />
              </div>
            </>
          }
        ></Route>
        {user && user.user.role === "supervisor" && (
          <Route
            path="/addtask"
            element={<AddTask token={token} socket={socket} />}
          ></Route>
        )}
      </Routes>
    </>
  );
}
