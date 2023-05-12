import React, { useEffect, useRef, useState } from "react";
import "./dragDrop.css";
import axios from "axios";
import { Card, Divider, notification } from "antd";
import FilterSearch from "../filter/FilterSearch";

const baseUrl = "http://192.168.1.74:2000/api/v1/";

export default function DragDrop({ socket, username }) {
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const [groups, setGroups] = useState([]);

  //const groups = ["Backlog", "Doing", "Q&A", "Production"];
  const getGroupTasks = (data) => {
    username === "All Users"
      ? data.forEach((element) => {
          axios
            .post(baseUrl + `tasks/getgrouptasks`, { groupid: element.id })
            .then((response2) => {
              setGroups((e) =>
                e.map((x) => {
                  if (x.id === element.id) {
                    return { ...x, items: response2.data.data };
                  }
                  return { ...x, items: x.items ? x.items : [] };
                })
              );
            });
        })
      : data.forEach((element) => {
          axios
            .post(baseUrl + `tasks/getgrouptasksbyusername`, {
              groupid: element.id,
              username,
            })
            .then((response2) => {
              setGroups((e) =>
                e.map((x) => {
                  if (x.id === element.id) {
                    return { ...x, items: response2.data.data };
                  }
                  return { ...x, items: x.items ? x.items : [] };
                })
              );
            })
            .catch((err) => {
              console.error(err);
            });
        });
  };

  const getAllGroups = () => {
    axios.get(baseUrl + "tasks/groups").then((response) => {
      const data = response.data.data;

      setGroups(data);

      getGroupTasks(data);
    });
  };

  useEffect(() => {
    //get all workflows
    getAllGroups();
  }, [username]);

  const handleDragStart = (e, params) => {
    dragItem.current = params;
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
        getAllGroups();
        //socket.emit("update_task_state", groupname);
        console.log(response.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStyles = () => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpIx === dragNode.current.grpIx &&
      currentItem.itemIx === dragNode.current.itemIx
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
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

  return (
    <>
      {contextHolder}
      <FilterSearch groups={groups} setGroups={setGroups} />

      <header className="App-header">
        <div className="drag-n-drop">
          {/* <div className="dnd-group">
            <div className="group-title"></div>
          </div> */}

          {groups.map((grp, grpIx) => (
            <div
              key={grp.name}
              className="dnd-group"
              //onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
              onDragOver={() => (dragNode.current = grp.id)}
            >
              <div className="group-title">{grp.name}</div>
              <Divider />
              {grp.items &&
                grp.items.map((item, itemIx) => (
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    // onDragEnter=
                    key={item.task_content}
                    className={dragging ? getStyles() : "dnd-item"}
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
                      <div
                        style={{
                          padding: "15px",
                          backgroundColor:
                            groups[grpIx] === "Q&A"
                              ? "yellow"
                              : groups[grpIx] === "Backlog"
                              ? "red"
                              : groups[grpIx] === "Doing"
                              ? "orange"
                              : "green",
                          borderRadius: "5px",
                        }}
                      >
                        <p>{item.description}</p>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </header>
    </>
  );
}
