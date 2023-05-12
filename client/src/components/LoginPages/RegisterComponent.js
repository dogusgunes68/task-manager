import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../Modals/ErrorModal";
import { Button, Form, Input } from "antd";

export default function RegisterComponent({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const navigate = useNavigate();

  const baseUrl = "http://192.168.1.74:2000/api/v1/";

  const register = (event) => {
    event.preventDefault();
    axios
      .post(baseUrl + "auth/signup", { username, email, password })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      })
      .catch((error) => {
        setError(error);
        showErrorModal();
      });
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
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

  return (
    <div className="center">
      <Form
        className="register-form"
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Username">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="E-mail">
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button onClick={(e) => register(e)} type="primary">
            Register
          </Button>
        </Form.Item>
      </Form>
      {/* <form className="login-forms" onSubmit={(e) => register(e)}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          className="login-input"
          type="email"
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="login-button" type="submit">
          Register
        </button>
      </form>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setIsErrorModalOpen={setIsErrorModalOpen}
        error={error}
      /> */}
    </div>
  );
}
