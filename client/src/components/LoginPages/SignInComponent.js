import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import ErrorModal from "../Modals/ErrorModal";
import { Button, Form, Input } from "antd";

export default function SignUpComponent({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const auth = useAuth();
  const location = useLocation();

  const baseUrl = "http://192.168.1.74:2000/api/v1/";

  const redirectPath = location.state?.path || "/";

  const login = (event) => {
    event.preventDefault();

    axios
      .post(baseUrl + "auth/login", { email, password })
      .then((response) => {
        console.log(response.data.token);
        //if token is exists, perform routing
        //auth.login(response.data.data.user);
        //setToken(response.data.token);
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        //console.log(redirectPath);
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
          <Button onClick={login} type="primary">
            Login
          </Button>
        </Form.Item>
      </Form>
      {/* <form className="login-forms" onSubmit={(e) => login(e)}>
        <input
          className="login-input"
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="login-button" type="submit" onClick={login}>
          Login
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
