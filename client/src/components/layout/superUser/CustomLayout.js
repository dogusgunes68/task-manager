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

const baseUrl = "http://localhost:2000/api/v1/";

function getItem(label, key, icon, children) {
  const link =
    label === "Option 1"
      ? "http://localhost:3000/"
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
  getItem("Files", "9", <FileOutlined />),
];

export default function CustomLayout({ socket }) {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [usernames, setUsernames] = useState([]);

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
              notificationClicked={notificationClicked}
              setNotificationClicked={setNotificationClicked}
            />
            {/* navbar */}
          </Header>
          {notificationClicked === true && <NotificationDrawer />}
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Routing socket={socket} />
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
