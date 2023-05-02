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

  const groups = ["Backlog", "Doing", "Q&A", "Production"];

  const getAllWorkflows = () => {
    axios
      .get(baseUrl + "tasks/")
      .then((response) => {
        let wf = response.data.data[0].workflow;
        groupingWorkflowData(wf);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateWorkflowGroup = (id, groupname) => {
    axios
      .put(baseUrl + "tasks/update/taskstate/", { id, groupname })
      .then((response) => {
        getAllWorkflows();
        socket.emit("update_task_state", groupname);

        console.log(response.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDragStart = (e, params) => {
    selectedItemId.current = params.id;
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      // setWorkflow((oldList) => {
      //   let newList = JSON.parse(JSON.stringify(oldList));
      //   newList[params.grpIx].items.splice(
      //     params.itemIx,
      //     0,
      //     newList[currentItem.grpIx].items.splice(currentItem.itemIx, 1)[0]
      //   );
      //   dragItem.current = params;
      //   return newList;
      // });
      //update data
      console.log(params.id);
      //get all data
    }
  };

  const handleDragEnd = (params) => {
    console.log("params:", params);
    setEndParams(params);
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);

    dragItem.current = null;
    dragNode.current = null;
  };

  useEffect(() => {
    if (dragging === false && endParams !== null) {
      console.log("end params:", endParams);
      updateWorkflowGroup(endParams.id, groups[endParams.grpIx]);
    }
  }, [dragging]);

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpIx === params.grpIx &&
      currentItem.itemIx === params.itemIx
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  const groupingWorkflowData = (wf) => {
    let listB = [];
    let listD = [];
    let listQ = [];
    let listP = [];
    console.log("wf:", wf);
    wf.map((data) => {
      if (data.groupname === "Backlog") {
        listB.push(data);
      } else if (data.groupname === "Doing") {
        listD.push(data);
      } else if (data.groupname === "Q&A") {
        listQ.push(data);
      } else {
        listP.push(data);
      }
    });

    //console.log(listB);
    listB = { groupname: "Backlog", items: [...listB] };
    listD = { groupname: "Doing", items: [...listD] };
    listQ = { groupname: "Q&A", items: [...listQ] };
    listP = { groupname: "Production", items: [...listP] };

    setWorkflow([listB, listD, listQ, listP]);
  };

  useEffect(() => {
    //get all workflows
    getAllWorkflows();
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
          {workflow.map((grp, grpIx) => (
            <div
              key={grp.groupname}
              className="dnd-group"
              onDragEnd={
                !grp.items.length
                  ? (e) => {
                      handleDragEnd({
                        grpIx,
                        itemIx: 0,
                        id: selectedItemId.current,
                      });
                    }
                  : null
              }
            >
              <div className="group-title">{grp.groupname}</div>
              {grp.items.map((item, itemIx) => (
                <div
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { grpIx, itemIx, id: item.id })
                  }
                  onDragEnter={
                    dragging
                      ? (e) => {
                          handleDragEnter(e, {
                            grpIx,
                            itemIx,
                            id: selectedItemId.current,
                          });
                        }
                      : null
                  }
                  onDragEnd={(e) =>
                    handleDragEnd({
                      grpIx,
                      itemIx,
                      id: selectedItemId.current,
                    })
                  }
                  key={item.task_content}
                  className={
                    dragging ? getStyles({ grpIx, itemIx }) : "dnd-item"
                  }
                >
                  <Card
                    title={item.task_content}
                    bordered={false}
                    type="inner"
                    hoverable={true}
                    style={{
                      width: 300,
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
