import { Button, Dropdown, Form, Input, Radio } from "antd";
import { useState } from "react";
import "./adduser.css";
import RolesDropDown from "../Menu/RolesDropDown";
import axios from "axios";
const baseUrl = "http://192.168.1.74:2000/api/v1/";

function AddUser() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [user, setUser] = useState({});
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

  const validation = async () => {
    axios
      .post(baseUrl + "user/validation", {
        username: user.username,
        email: user.email,
      })
      .then((res) => {
        if (res.data.error) {
          if (res.data.errorType === "username") {
            setUsernameError(res.data.message);
          } else if (res.data.errorType === "email") {
            setEmailError(res.data.message);
          }
          return true;
        }
      });
    return false;
  };
  const addUser = async () => {
    const result = await validation();
    if (result === false) {
      if (Object.keys(user).length === 4) {
        axios
          .post(baseUrl + "user/adduser", { user })
          .then((res) => {
            res.data.error
              ? setPasswordError(res.data.message)
              : console.log(res.data.data);

            //create modal
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        //error modal
        console.log("there is a empty coulmn please fill it.");
      }
    }
  };
  return (
    <Form
      className="forms"
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: 800 }}
    >
      {/* <Form.Item label="Form Layout" name="layout">
        <Radio.Group value={formLayout}>
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
        </Radio.Group>
      </Form.Item> */}
      <Form.Item label="Username">
        <Input
          placeholder="Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        {usernameError !== null ? (
          <label style={{ marginTop: "5px", color: "#b02936" }}>
            {usernameError}
          </label>
        ) : null}
      </Form.Item>
      <Form.Item label="E-mail">
        <Input
          placeholder="E-mail"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {emailError !== null ? (
          <label style={{ marginTop: "5px", color: "#b02936" }}>
            {emailError}
          </label>
        ) : null}
      </Form.Item>
      <Form.Item label="Password">
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {passwordError !== null ? (
          <label style={{ marginTop: "5px", color: "#b02936" }}>
            {passwordError}
          </label>
        ) : null}
      </Form.Item>
      <Form.Item label="Role">
        <RolesDropDown
          roles={["user", "supervisor", "Q&A", "admin"]}
          user={user}
          setUser={setUser}
        />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" onClick={addUser}>
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddUser;
