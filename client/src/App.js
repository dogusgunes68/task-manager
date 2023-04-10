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

const socket = io.connect("http://localhost:2000");

//const socket = io.connect("http://localhost:2000");
function App() {
  const [token, setToken] = useState(null);
  var user = null;
  if (token !== null) {
    user = jwtDecode(token);
    console.log("role", user.user.role);
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    token ? setToken(token) : console.log("token yok");
    console.log("app token", token);
  }, [token]);

  return (
    <div style={{ display: "block", textAlign: "center", height: "100vh" }}>
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
            <Route path="/" element={<LoginComponent setToken={setToken} />}>
              {/* <Route index element={<Home />} /> */}
            </Route>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <>
                    <NavbarMenu id="header" setToken={setToken} />
                    <div id="header-content">
                      <FilterMenu token={token} />
                      <Tasks socket={socket} />
                    </div>
                  </>
                  // <div>adsdadw</div>
                }
              ></Route>
              {user && user.user.role === "supervisor" && (
                <Route
                  path="addtask"
                  element={
                    <>
                      <NavbarMenu id="header" setToken={setToken} />
                      <div id="header-content">
                        <FilterMenu token={token} />
                        <AddTask token={token} />
                      </div>
                    </>
                  }
                />
              )}
            </>
          )}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
