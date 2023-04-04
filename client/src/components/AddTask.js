import UsersDropDown from "./Menu/UsersDropDown";
import "./addTask.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker, Space } from "antd";
import moment from "moment";

const baseUrl = "http://localhost:2000/api/v1/";

export default function AddTask() {
  const date = new Date(Date.now());
  const currentDate = JSON.stringify(date).slice(1, 11);

  const [usernames, setUsernames] = useState([]);
  const [user, setUser] = useState({});
  const [post, setPost] = useState(0.0);

  function disabledYear(current) {
    console.log(current);
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  }

  useEffect(() => {
    axios.get(baseUrl + "user/usernames").then((response) => {
      setUsernames(response.data.data.usernames);
      console.log(response.data.data.usernames);
    });
  }, []);

  console.log("user:", user);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      axios.post(baseUrl + "tasks", user).then((response) => {
        console.log("eklendi:", response);
      });
    }
  }, [post]);

  const assignTask = (event) => {
    event.preventDefault();
    console.log("event:", event);
    setUser({ ...user, task_date: new Date(Date.now()), supervisor_id: 2 });
    setPost(Math.random());
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
        <div className="divs">
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
