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
import Cookies from "universal-cookie";

//const socket = io.connect("http://localhost:2000");
function App() {
  const [user, setUser] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("jwt");
    console.log(token);
  }, [user]);

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
          {user === null ? (
            <Route path="/" element={<LoginComponent setUser={setUser} />}>
              {/* <Route index element={<Home />} /> */}
            </Route>
          ) : (
            <Route
              path="/"
              element={
                <>
                  <NavbarMenu id="header" />
                  <div id="header-content">
                    <FilterMenu />
                    <Tasks />
                  </div>
                </>
                // <div>adsdadw</div>
              }
            />
          )}

          <Route
            path="addtask"
            element={
              <>
                <NavbarMenu id="header" />
                <div id="header-content">
                  <FilterMenu />
                  <AddTask />
                </div>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
