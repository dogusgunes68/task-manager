import { Fragment, useEffect, useState } from "react";

const InputTodo = ({ socket }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {}, []);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:2000/api/v1/todos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      socket.emit("data_inserted", response.ok);
      //window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };
  const changeState = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };
  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo App</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={changeState}
        ></input>
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
