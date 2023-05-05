import UsersDropDown from "../Menu/UsersDropDown";
import "./addTask.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col, DatePicker, Divider, Input, Modal, Row, Space } from "antd";
import moment from "moment";
import jwt from "jwt-decode";
import ErrorModal from "../Modals/ErrorModal";

const baseUrl = "http://192.168.1.74:2000/api/v1/";

export default function AddTask({ token, socket }) {
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
  const showModal = () => {
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
    console.log(token);
    axios.get(baseUrl + "user/usernames").then((response) => {
      setUsernames(response.data.data.usernames);
      //console.log("username:", response.data.data.usernames);
    });
  }, []);

  useEffect(() => {
    if (error !== null) {
      showErrorModal();
    }
  }, [error]);

  const createTask = (data) => {
    //console.log("user:", user);
    if (Object.keys(data).length !== 0) {
      console.log("user:", data);
      axios
        .post(baseUrl + "tasks", data)
        .then((response) => {
          //console.log("eklendi:", response);

          //socket.emit("create_notification", user);
          
          socket.emit("create_notification");
          showModal();
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const assignTask = (event) => {
    event.preventDefault();
    const supervisor = jwt(token);
    //console.log("event:", event);
    console.log("supervisor:", supervisor.user);
    const data = {
      ...user,
      task_date: new Date(Date.now()),
      supervisor: supervisor.user.id,
    };
    setUser(data);
    if (
      Object.keys(user).length &&
      user.task_content.length !== 0 &&
      user.description.length !== 0 &&
      user.modulename.length !== 0 &&
      user.deadline !== null
    ) {
      createTask(data);
    } else {
      setError(new Error("Tüm alanlar doldurulmalıdır."));
      console.log("errorrrrrr");
      console.log(user);
    }
  };

  return (
    <div className="add-task-container">
      <form
        id="add-task-form"
        action="#"
        onSubmit={(event) => assignTask(event)}
      >
        <h2>Assign Task Page</h2>
        <Divider orientation="left"></Divider>
        <Row gutter={16} className="rows">
          <Col className="gutter-row" span={12}>
            <label className="labels">Task Title</label>
          </Col>
          <Col className="gutter-row" span={12}>
            <Input
              style={{ fontSize: "20px" }}
              placeholder="Task Title"
              onChange={(e) =>
                setUser({ ...user, task_content: e.target.value })
              }
            ></Input>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>

        <Row gutter={16} className="rows">
          <Col className="gutter-row" span={12}>
            <label className="labels">Description</label>
          </Col>
          <Col className="gutter-row" span={12}>
            <Input
              style={{ fontSize: "20px" }}
              placeholder="Description"
              onChange={(e) =>
                setUser({ ...user, description: e.target.value })
              }
            ></Input>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>

        <Row gutter={16} className="rows">
          <Col className="gutter-row" span={12}>
            <label className="labels">Module Name</label>
          </Col>
          <Col className="gutter-row" span={12}>
            <Input
              style={{ fontSize: "20px" }}
              placeholder="Module Name"
              onChange={(e) => setUser({ ...user, modulename: e.target.value })}
            ></Input>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>

        <Row gutter={16} className="rows">
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
        <Row gutter={16} className="rows">
          <Col className="gutter-row" span={12}>
            <label className="labels">Deadline</label>
          </Col>
          <Col className="gutter-row" span={12}>
            <Space
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <DatePicker
                className="rows"
                size="large"
                style={{ fontSize: "30px" }}
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
        {/* <Divider orientation="left"></Divider>

        <div id="task-content">
          <label className="labels">Task Content</label>
          <textarea
            className="form-control"
            onChange={(event) =>
              setUser({ ...user, task_content: event.target.value })
            }
          ></textarea>
        </div> */}
        <Divider orientation="left"></Divider>

        <div id="add-task-button">
          <button className="btn btn-dark assign-btn" type="submit">
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
