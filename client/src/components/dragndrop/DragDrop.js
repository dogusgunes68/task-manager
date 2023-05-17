import React, { useEffect, useRef, useState } from "react";
import "./dragDrop.css";
import axios from "axios";
import { Card, Divider, notification } from "antd";
import FilterSearch from "../filter/FilterSearch";
import Search from "antd/lib/transfer/search";
import GroupTask from "./GroupTask";

const baseUrl = "http://192.168.1.74:2000/api/v1/";

export default function DragDrop({ socket, username }) {
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState([]);

  // console.log("groups:", groups);

  // useEffect(() => {
  //   console.log("grps");
  //   setFilteredData([...groups]);
  // }, [groups]);

  //const groups = ["Backlog", "Doing", "Q&A", "Production"];

  const getAllGroups = () => {
    axios.get(baseUrl + "tasks/groups").then((response) => {
      const data = response.data.data;

      setGroups(data);

      //getGroupTasks(data);
    });
  };

  useEffect(() => {
    //get all workflows
    getAllGroups();
  }, [username]);

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    setDragging(true);

    //setDragging(true);
  };

  const handleDragEnd = () => {
    console.log(dragItem, dragNode);
    //setDragging(false);
    axios
      .put(baseUrl + "tasks/update/taskstate/", {
        id: dragItem.current.id,
        groupid: dragNode.current,
      })
      .then((response) => {
        setDragging(false);

        //socket.emit("update_task_state", groupname);
        console.log(response.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data) => {
    api.info({
      message: "Notification Title",
      description: data,
      duration: 2,
    });
  };

  useEffect(() => {
    socket.on("get_task_state", (groupname) => {
      if (groupname) openNotification(groupname);
    });
  }, [socket]);
  const searchHandler = (event) => {
    if (event.target.value === "" || event.target.value === null) {
      console.log(true);
    } else {
      //console.log(groups);
      //groups içindeki items'a ihtiyaç var
      console.log(false);

      // console.log(event.target.value);
      const temp = [...groups].map(function (element, index) {
        element.items = element.items.filter((item) =>
          item.task_content.includes(event.target.value)
        );

        return element;
      });
      console.log("temp:", temp);
    }
  };

  return (
    <>
      {/* {contextHolder} */}
      <div style={{ margin: "10px" }}>
        <Search
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <header className="App-header">
        <div className="drag-n-drop">
          {/* <div className="dnd-group">
            <div className="group-title"></div>
          </div> */}

          {groups.map((grp, grpIx) => (
            <div
              key={grp.name}
              className="dnd-group"
              onDragEnd={handleDragEnd}
              onDragOver={() => (dragNode.current = grp.id)}
            >
              <div className="group-title">{grp.name}</div>
              <Divider />

              <GroupTask
                dragging={dragging}
                dragItem={dragItem}
                dragNode={dragNode}
                username={username}
                groupid={grp.id}
                searchText={searchText}
                handleDragStart={handleDragStart}
              />
            </div>
          ))}
        </div>
      </header>
    </>
  );
}
