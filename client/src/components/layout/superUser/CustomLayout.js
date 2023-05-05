import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import DragDrop from "../../dragndrop/DragDrop";
import "./customLayout.css";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Navbar from "./Navbar";
import LeftMenu from "./LeftMenu";
import BreadCrumbCustom from "./BreadCrumbCustom";
import NotificationDrawer from "../../notificationDrawer/NotificationDrawer";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import AddTask from "../../addtask/AddTask";
import Routing from "../../routing/Routing";
import jwtDecode from "jwt-decode";

const baseUrl = "http://192.168.1.74:2000/api/v1/";

function getItem(label, key, icon, children) {
  const link =
    label === "Option 1"
      ? "http://localhost:3000/tasks"
      : label === "Option 2"
      ? "http://localhost:3000/addtask"
      : "";

  return {
    key,
    icon,
    children,
    label: <NavLink to={link}>{label}</NavLink>,
  };
}

var items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, []),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "7", <FileOutlined />),
];

export default function CustomLayout({ socket, token }) {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [data, setData] = useState([]);
  let user = jwtDecode(token);

  const getUsernames = () => {
    axios
      .get(baseUrl + "user/usernames")
      .then((response) => {
        console.log("usernames:", response.data.data.usernames);
        response.data.data.usernames.map((username, index) => {
          return (items[2].children[index] = {
            label: response.data.data.usernames[index].username,
            key: index,
          });
        });
        user.user.role === "user" && items.pop(1);
        console.log("items:", items);
        setUsernames(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getUsernames();
  }, []);

  // {user && user.user.role === "supervisor" && (
  //   <Route
  //     path="addtask"
  //     element={
  //       <div
  //         style={{
  //           display: "block",
  //           textAlign: "center",
  //           height: "100vh",
  //         }}
  //       >
  //         <NavbarMenu
  //           id="header"
  //           name={user.user.username}
  //           setToken={setToken}
  //         />
  //         <div id="header-content">
  //           <FilterMenu token={token} />
  //           <AddTask token={token} />
  //         </div>
  //       </div>
  //     }
  //   />
  // )}

  const loadData = () => {
    axios
      .get(baseUrl + "notification/" + user.user.id)
      .then((body) => {
        setData(body.data.data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    loadData();
    socket.on("get_notifications", () => {
      console.log("user:", user);
      loadData();
    });
  }, [socket]);
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <LeftMenu items={usernames} socket={socket} />{" "}
          {/* sider menu(left side) */}
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            <Navbar
              taskCount={data.length}
              notificationClicked={notificationClicked}
              setNotificationClicked={setNotificationClicked}
            />
            {/* navbar */}
          </Header>
          {notificationClicked === true && (
            <NotificationDrawer
              loadData={loadData}
              socket={socket}
              user={user}
            />
          )}
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Routing token={token} socket={socket} />
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
