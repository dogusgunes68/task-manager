import { Avatar, Divider, List, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./notification.css";
const baseUrl = "http://192.168.1.74:2000/api/v1/";

function NotificationDrawer({ user, socket, datas }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "fit-content",
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
        backgroundColor: "white",
        position: "absolute",
        right: 0,
        top: 64,
        width: 300,
        zIndex: 1,
      }}
    >
      <List
        dataSource={datas}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: item.read ? "gray" : "red" }}
                />
              }
              title={<a href="https://ant.design">{}</a>}
              description={item.content}
            />
            <div>{item.title}</div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default NotificationDrawer;
