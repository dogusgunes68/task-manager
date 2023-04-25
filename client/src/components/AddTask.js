import UsersDropDown from "./Menu/UsersDropDown";
import "./addTask.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col, DatePicker, Divider, Modal, Row, Space } from "antd";
import moment from "moment";
import jwt from "jwt-decode";
import ErrorModal from "./Modals/ErrorModal";

const baseUrl = "http://localhost:2000/api/v1/";

export default function AddTask({ token }) {
  const date = new Date(Date.now());
  const currentDate = JSON.stringify(date).slice(1, 11);

  const [usernames, setUsernames] = useState([]);
  const [user, setUser] = useState({});
  const [post, setPost] = useState(0.0);
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const showModal = (id) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      axios
        .post(baseUrl + "tasks", user)
        .then((response) => {
          console.log("eklendi:", response);
          showModal();
        })
        .catch((err) => {
          setError(err);
          showErrorModal();
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
        <Divider orientation="left"></Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            {" "}
            <label className="labels">Users</label>
          </Col>
          <Col className="gutter-row" span={12}>
            <UsersDropDown
              usernames={usernames}
              user={user}
              setUser={setUser}
            ></UsersDropDown>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <label className="labels">Deadline</label>
          </Col>
          <Col className="gutter-row" span={12}>
            <Space>
              <DatePicker
                onChange={(date) =>
                  setUser({ ...user, deadline: new Date(date) })
                }
                disabledDate={disabledYear}
              />
            </Space>
          </Col>
          {/* <input
            type="date"
            id="date"
            name="trip-start"
            value=""
            min={currentDate}
            max="2023-12-31"
          ></input> */}
        </Row>
        <Divider orientation="left"></Divider>

        <div id="task-content">
          <label className="labels">Task Content</label>
          <textarea
            className="form-control"
            onChange={(event) =>
              setUser({ ...user, task_content: event.target.value })
            }
          ></textarea>
        </div>
        <Divider orientation="left"></Divider>

        <div id="add-task-button">
          <button className="btn btn-primary" type="submit">
            Assign Task
          </button>
        </div>
      </form>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setIsErrorModalOpen={setIsErrorModalOpen}
        error={error}
      />
      <Modal
        title="Saccessfull"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>New User Added</div>
      </Modal>
    </div>
  );
}
