import { Breadcrumb } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function BreadCrumbCustom({ username }) {
  //console.log(username);
  return (
    <>
      {/* {selectedUser !== null ? (
      <Routes>
        <Route path="/tasks/user">
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedUser}</Breadcrumb.Item>
          </Breadcrumb>
        </Route>
      </Routes>

    ):()
    } */}

      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>{username}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
