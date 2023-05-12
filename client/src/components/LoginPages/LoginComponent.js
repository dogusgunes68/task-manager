import { useState } from "react";
import SignUpComponent from "./SignInComponent";
import RegisterComponent from "./RegisterComponent";
import SignInComponent from "./SignInComponent";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";

function LoginComponent({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <Tabs
        style={{ alignItems: "center" }}
        defaultActiveKey="1"
        items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
          const id = String(i + 1);
          return {
            label: (
              <span>
                <Icon />
                {id === "1" ? "Login" : "Register"}
              </span>
            ),
            key: id,
            children:
              id === "1" ? (
                <SignInComponent setToken={setToken} />
              ) : (
                <RegisterComponent setToken={setToken} />
              ),
          };
        })}
      />
      {/* <div className="login-buttons-container">
        <button
          className="btn login-buttons-top"
          onClick={() => {
            setIsLogin(true);
          }}
        >
          Login
        </button>
        <button
          className="btn login-buttons-top"
          onClick={() => {
            setIsLogin(false);
          }}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <SignUpComponent setToken={setToken} />
      ) : (
        <RegisterComponent setToken={setToken} />
      )} */}
    </div>
  );
}

export default LoginComponent;
