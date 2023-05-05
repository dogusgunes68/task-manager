import { Avatar, Divider, List, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const baseUrl = "http://192.168.1.74:2000/api/v1/";

function NotificationDrawer({ user, socket, loadData }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
        position: "absolute",
        right: 0,
        top: 64,
        width: 300,
        height: 300,
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: item.read ? "gray" : "red" }}
                  />
                }
                title={<a href="https://ant.design">{item.task_content}</a>}
                description={item.description}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default NotificationDrawer;
