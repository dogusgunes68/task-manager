import UsersDropDown from "./Menu/UsersDropDown";
import "./addTask.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker, Space } from "antd";
import moment from "moment";
import jwt from "jwt-decode";

const baseUrl = "http://localhost:2000/api/v1/";

export default function AddTask({ token }) {
  const date = new Date(Date.now());
  const currentDate = JSON.stringify(date).slice(1, 11);

  const [usernames, setUsernames] = useState([]);
  const [user, setUser] = useState({});
  const [post, setPost] = useState(0.0);

  function disabledYear(current) {
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  }

  useEffect(() => {
    axios.get(baseUrl + "user/usernames").then((response) => {
      setUsernames(response.data.data.usernames);
      console.log("username:", response.data.data.usernames);
    });
  }, []);

  useEffect(() => {
    console.log("user:", user);
    if (Object.keys(user).length !== 0) {
      axios.post(baseUrl + "tasks", user).then((response) => {
        console.log("eklendi:", response);
      });
    }
  }, [post]);

  const assignTask = (event) => {
    event.preventDefault();
    const supervisor = jwt(token);
    //console.log("event:", event);
    console.log("supervisor:", supervisor.user);
    setUser({
      ...user,
      task_date: new Date(Date.now()),
      supervisor: supervisor.user.id,
    });
    setPost(Math.random() * Math.random());
  };

  return (
    <div className="add-task-container">
      <form
        id="add-task-form"
        action="#"
        onSubmit={(event) => assignTask(event)}
      >
        <div className="divs">
          <label className="labels">Users</label>
          <UsersDropDown
            usernames={usernames}
            user={user}
            setUser={setUser}
          ></UsersDropDown>
        </div>
        <div>
          <label className="labels">Deadline</label>
          <Space>
            <DatePicker
              onChange={(date) =>
                setUser({ ...user, deadline: new Date(date) })
              }
              disabledDate={disabledYear}
            />
          </Space>
          {/* <input
            type="date"
            id="date"
            name="trip-start"
            value=""
            min={currentDate}
            max="2023-12-31"
          ></input> */}
        </div>
        <div id="task-content">
          <label className="labels">Task Content</label>
          <textarea
            className="form-control"
            onChange={(event) =>
              setUser({ ...user, task_content: event.target.value })
            }
          ></textarea>
        </div>
        <div id="add-task-button">
          <button className="btn reset-button" type="reset">
            Reset
          </button>
          <button className="btn btn-primary" type="submit">
            Assign Task
          </button>
        </div>
      </form>
    </div>
  );
}
