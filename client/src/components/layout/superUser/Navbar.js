import { Badge, Menu } from "antd";
import { NotificationFilled } from "@ant-design/icons";
import React, { useState } from "react";
import "./navbar.css";

export default function Navbar({ notificationClicked, setNotificationClicked, taskCount }) {
  const list = [
    "nav1",
    "nav2",
    <Badge count={taskCount} style={{ fontSize: "10px" }} size="small">
      <NotificationFilled
        style={{
          fontSize: "26px",
          color: "#455768",
        }}
      />
    </Badge>,
  ];
  //const [style, setStyle] = useState("");
  const drawListMenu = () => {
    if (notificationClicked) {
      setNotificationClicked(false);
    } else {
      setNotificationClicked(true);
    }
  };

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      {list.map((item, index) =>
        index === list.length - 1 ? (
          <Menu.Item
            key={index}
            className="navbar-menu-item"
            onClick={drawListMenu}
            style={{ paddingTop: "5px" }}
          >
            {item}
          </Menu.Item>
        ) : (
          <Menu.Item key={index}>{item}</Menu.Item>
        )
      )}
    </Menu>
  );
}
