import React from "react";
import { Route, Routes } from "react-router-dom";
import BreadCrumbCustom from "../layout/superUser/BreadCrumbCustom";
import DragDrop from "../dragndrop/DragDrop";
import AddTask from "../addtask/AddTask";

export default function Routing({ socket,selectedKeys }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
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
        <Route path="/addtask" element={<AddTask />}></Route>
      </Routes>
    </>
  );
}
