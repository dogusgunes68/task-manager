import React, { useEffect, useRef, useState } from "react";
import "./dragDrop.css";
import axios from "axios";
import { Card, notification } from "antd";

const baseUrl = "http://localhost:2000/api/v1/";

export default function DragDrop({ socket }) {
  const [dragging, setDragging] = useState(false);
  const [workflow, setWorkflow] = useState([]);
  const [endParams, setEndParams] = useState(null);
  const selectedItemId = useRef();
  const dragItem = useRef();
  const dragNode = useRef();
  const [groups, setGroups] = useState([]);

  //const groups = ["Backlog", "Doing", "Q&A", "Production"];

  const getGroupTasks = (data) => {
    data.forEach((element) => {
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
    });
  };

  const getAllGroups = () => {
    axios.get(baseUrl + "tasks/groups").then((response) => {
      const data = response.data.data;

      setGroups(data);

      getGroupTasks(data);
    });
  };

  const handleDragStart = (e, params) => {
    dragItem.current = params;
  };

  const handleDragEnd = () => {
    console.log(dragItem, dragNode);

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

  // useEffect(() => {
  //   if (dragging === false && endParams !== null) {
  //     console.log("end params:", endParams);

  //   }
  // }, [dragging]);

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

  useEffect(() => {
    //get all workflows
    getAllGroups();
  }, []);

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
              {grp.items &&
                grp.items.map((item, itemIx) => (
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    // onDragEnter={
                    //   dragging
                    //     ? (e) => {
                    //         handleDragEnter(e, {
                    //           grpIx,
                    //           itemIx,
                    //           id: selectedItemId.current,
                    //         });
                    //       }
                    //     : null
                    // }
                    // onDragEnd={(e) =>
                    //   handleDragEnd({
                    //     grpIx,
                    //     itemIx,
                    //     id: selectedItemId.current,
                    //   })
                    // }
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
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
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
