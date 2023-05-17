import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
const baseUrl = "http://192.168.1.74:2000/api/v1/";

export default function GroupTask({
  dragging,
  dragItem,
  dragNode,
  username,
  groupid,
  searchText,
  handleDragStart,
}) {
  const [data, setData] = useState([]);

  const getGroupTasks = () => {
    console.log(username);
    if (username === "All Users") {
      axios
        .post(baseUrl + `tasks/getgrouptasks`, { groupid })
        .then((response2) => {
          setData(response2.data.data);
        });
    } else {
      axios
        .post(baseUrl + `tasks/getgrouptasksbyusername`, { groupid, username })
        .then((response2) => {
          setData(response2.data.data);
        });
    }
  };

  useEffect(() => {
    getGroupTasks();
  }, []);

  useEffect(() => {
    !dragging && getGroupTasks();
  }, [dragging]);

  return data.map(
    (item) =>
      item.task_content.includes(searchText) && (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          key={item.task_content}
          className="dnd-item"
        >
          <Card
            title={item.task_content}
            bordered={false}
            type="inner"
            hoverable={true}
            style={{
              width: "100%",
            }}
          >
            <div>
              <p>{item.description}</p>
            </div>
          </Card>
        </div>
      )
  );
}
