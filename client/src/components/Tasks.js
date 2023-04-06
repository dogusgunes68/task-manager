import { useEffect, useState } from "react";
import Pages from "./Pages";
import "./task.css";
import { Space, Table, Tag } from "antd";
import columns from "./Columns";
import axios from "axios";
import jwt from "jwt-decode";

const baseUrl = "http://localhost:2000/api/v1/";

export default function Tasks() {
  const [range, setRange] = useState([1, 5]);
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState([]);

  console.log("tasks sayfası");

  const calculatePageCount = (count) => {
    let pageCnt = Math.floor(count / 5);
    if (count % 5 !== 0) {
      pageCnt++;
    }
    // console.log("calculated page count:", pageCnt);
    let tempArray = [];
    for (let i = 1; i <= pageCnt; i++) {
      tempArray.push(i);
    }
    setPage(tempArray);
    console.log("tasks count:", count);
  };

  useEffect(() => {
    console.log("start:", range[0], " end:", range[1]);
    const token = sessionStorage.getItem("token");
    const { user } = jwt(token);
    try {
      axios
        .get(baseUrl + `tasks/rangeoftasks/${range[0]}/${range[1]}/${user.id}`)
        .then((response) => {
          calculatePageCount(response.data.result.count[0].count);
          console.log(response.data.result.tasks);
          setTasks(response.data.result.tasks);
        });
    } catch (error) {}
  }, [range]);

  return (
    <div id="content">
      {tasks.length === 0 ? (
        <div style={{ display: "flex", justifySelf: "center" }}>
          Tasks is Empty
        </div>
      ) : (
        <>
          <table id="task-table">
            <thead>
              <tr id="header-row" style={{ width: "100%" }}>
                <th style={{ width: "20%" }}>User</th>
                <th style={{ width: "15%" }}>Date</th>
                <th style={{ width: "15%" }}>Deadline</th>
                <th style={{ width: "20%" }}>Supervisor</th>
                <th>Task</th>
                <th>Task State</th>
              </tr>
            </thead>
            {tasks.map((task) => {
              return (
                <tbody key={task.id}>
                  <tr>
                    <td>{task.user_id}</td>
                    <td>{task.task_date}</td>
                    <td>{task.deadline}</td>
                    <td>{task.supervisor}</td>
                    <td>{task.task_content}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <Pages page={page} setRange={setRange}></Pages>
        </>
      )}
    </div>
  );
}
