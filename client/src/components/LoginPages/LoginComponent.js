import { useState } from "react";
import SignUpComponent from "./SignInComponent";
import RegisterComponent from "./RegisterComponent";
function LoginComponent({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <div className="login-buttons-container">
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
      )}
    </div>
  );
}

export default LoginComponent;
