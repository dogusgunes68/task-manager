// import { Fragment } from "react";
// import InputTodo from "./components/InputTodo";
// import ListTodos from "./components/ListTodos";
// import io from "socket.io-client";
import LoginComponent from "./components/LoginPages/LoginComponent";
import FilterMenu from "./components/Menu/FilterMenu";
import NavbarMenu from "./components/Menu/NavbarMenu";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/LoginPages/auth";
import RequireAuth from "./components/LoginPages/RequireAuth";
import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Button } from "antd";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";
import bgLogin from "./components/LoginPages/login-bg.jpg";
//const socket = io.connect("http://localhost:2000");
function App() {
  const [token, setToken] = useState(null);
  var user = null;
  if (token !== null) {
    user = jwtDecode(token);
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    token ? setToken(token) : setToken(token);
    //console.log("app token", token);
  }, [token]);

  return (
    <>
      {/* <InputTodo socket={socket}></InputTodo>
        <ListTodos socket={socket}></ListTodos> */}

      {/* <NavbarMenu id="header" />
      <div id="header-content">
        <FilterMenu />
        <Tasks /> 
        <AddTask></AddTask> 
      </div> */}
      <AuthProvider>
        <Routes>
          {token === null ? (
            <Route
              path="/"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                    backgroundImage: `url(${bgLogin})`,
                  }}
                >
                  <LoginComponent setToken={setToken} />
                </div>
              }
            >
              {/* <Route index element={<Home />} /> */}
            </Route>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <div
                    style={{
                      display: "block",
                      textAlign: "center",
                      height: "100vh",
                    }}
                  >
                    <NavbarMenu
                      id="header"
                      name={user.user.username}
                      setToken={setToken}
                    />
                    <div id="header-content">
                      <FilterMenu token={token} />
                      <Tasks role={user.user.role} />
                    </div>
                  </div>
                  // <div>adsdadw</div>
                }
              ></Route>
              {user && user.user.role === "supervisor" && (
                <Route
                  path="addtask"
                  element={
                    <div
                      style={{
                        display: "block",
                        textAlign: "center",
                        height: "100vh",
                      }}
                    >
                      <NavbarMenu
                        id="header"
                        name={user.user.username}
                        setToken={setToken}
                      />
                      <div id="header-content">
                        <FilterMenu token={token} />
                        <AddTask token={token} />
                      </div>
                    </div>
                  }
                />
              )}
            </>
          )}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
