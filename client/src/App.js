// import { Fragment } from "react";
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";
// import io from "socket.io-client";
import LoginComponent from "./components/LoginPages/LoginComponent";
import FilterMenu from "./components/Menu/FilterMenu";
import NavbarMenu from "./components/Menu/NavbarMenu";
import Tasks from "./components/tasks/Tasks";
import AddTask from "./components/addtask/AddTask";
import { AuthProvider } from "./components/LoginPages/auth";
import { useEffect, useState } from "react";
//import "antd/dist/reset.css"; //antd version 5+
import "antd/dist/antd.css"; //antd version 4+
import jwtDecode from "jwt-decode";
import io from "socket.io-client";
import bgLogin from "./components/LoginPages/login-bg.jpg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CustomLayout from "./components/layout/superUser/CustomLayout";
const socket = io.connect("http://192.168.1.74:2001");
function App() {
  //create token to test
  const [token, setToken] = useState(null);
  var user = null;
  if (token !== null) {
    user = jwtDecode(token);
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    token ? setToken(token) : setToken(token);
  }, [token]);

  return (
    <>
      <AuthProvider>
        <Routes>
          {token === null ? (
            <Route
              path="*"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                    backgroundColor: "gray",
                    //backgroundImage: `url(${bgLogin})`,
                  }}
                >
                  <LoginComponent setToken={setToken} />
                </div>
              }
            ></Route>
          ) : (
            <Route
              path="*"
              element={
                <div
                  style={{
                    display: "block",
                    textAlign: "center",
                    height: "100vh",
                  }}
                >
                  <CustomLayout socket={socket} token={token} />
                </div>
              }
            ></Route>
          )}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
