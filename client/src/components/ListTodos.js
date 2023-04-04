import { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ socket }) => {
  const [todoList, setTodoList] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:2000/api/v1/todos/${id}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
    setTodoList(todoList.filter((todo) => todo.todo_id !== id));
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/v1/todos");
      const jsonData = await response.json();
      //console.log(jsonData.data[0].rows);
      let list = jsonData.data[0].rows;
      setTodoList(list.sort((a, b) => (a.todo_id > b.todo_id ? 1 : -1)));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
    socket.on("connect", () => {
      socket.on("reload_page", (data) => {
        getTodos();
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return (
    <Fragment>
      <h1 className="mt-5 text-center">List of Todos</h1>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {todoList.map((todo) => (
          <tbody>
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo}></EditTodo>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </Fragment>
  );
};
export default ListTodos;
