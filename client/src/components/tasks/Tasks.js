import { useState } from "react";
import "./task.css";
import jwt from "jwt-decode";
import ErrorModal from "../Modals/ErrorModal";
import DragDrop from "../dragndrop/DragDrop";

const baseUrl = "http://localhost:2000/api/v1/";
const data = [
  { title: "Backlog", items: ["1", "2", "3"] },
  { title: "Doing", items: ["4", "5", "6"] },
  { title: "Q&A", items: ["7", "8", "9"] },
  { title: "Production", items: ["10", "11", "12"] },
];

export default function Tasks({ socket }) {
  // const [range, setRange] = useState([1, 5]);
  // const [tasks, setTasks] = useState([]);
  // const [page, setPage] = useState([]);
  // const [taskState, setTaskState] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [taskId, setTaskId] = useState(null);
  // const [selectedState, setSelectedState] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");
  const { user } = jwt(token);
  // const calculatePageCount = (count) => {
  //   let pageCnt = parseInt(count / 5);
  //   if (count % 5 !== 0) {
  //     if (count > 5) {
  //       pageCnt++;
  //     }
  //   }
  //   // console.log("calculated page count:", pageCnt);
  //   let tempArray = [];
  //   for (let i = 1; i <= pageCnt; i++) {
  //     tempArray.push(i);
  //   }
  //   setPage(tempArray);
  //   console.log("tasks count:", count);
  // };

  // function getRangeOfTasks() {
  //   axios
  //     .get(baseUrl + `tasks/rangeoftasks/${range[0]}/${range[1]}/${user.id}`)
  //     .then((response) => {
  //       calculatePageCount(response.data.result.count[0].count);
  //       console.log("count:", response.data.result.count[0].count);
  //       return response.data.result.tasks;
  //     })
  //     .then((tasksData) => {
  //       setTasks(tasksData);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       showErrorModal();
  //     });
  // }

  // //update task_state func
  // const updateTaskState = () => {
  //   if (selectedState !== "") {
  //     axios
  //       .put(baseUrl + "tasks/update/taskstate", {
  //         id: taskId,
  //         task_state: selectedState,
  //       })
  //       .then((res) => {
  //         //setSelectedState("");
  //         socket.emit("update_task_state", selectedState);

  //         getRangeOfTasks();
  //         //console.log("state res", res);
  //       })
  //       .catch((err) => {
  //         //error modal
  //         setError(err);
  //         showErrorModal();
  //       });
  //   }
  // };

  // const showModal = (id) => {
  //   console.log(tasks);
  //   setTaskId(id);
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   updateTaskState();
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setTaskId(null);
  //   setIsModalOpen(false);
  // };

  const showErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  return (
    <>
      <DragDrop socket={socket} />

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setIsErrorModalOpen={setIsErrorModalOpen}
        error={error}
      />

      {/* {role !== "supervisor" && (
        <Modal
          title="Select Task State"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          taskId={taskId}
        >
          <button
            id="modal-button-w"
            onClick={() => setSelectedState("waiting")}
          >
            Waiting
          </button>
          <button
            id="modal-button-p"
            onClick={() => setSelectedState("pending")}
          >
            Pending
          </button>
          <button id="modal-button-d" onClick={() => setSelectedState("done")}>
            Done
          </button>
        </Modal>
      )} */}
      {/* {tasks.length === 0 ? (
        <div style={{ display: "flex", justifySelf: "center" }}>
          Tasks is Empty
        </div>
      ) : (
        <>
          <table id="task-table" className="table">
            <thead className="thead-dark">
              <tr id="header-row" style={{ width: "100%" }}>
                <th style={{ width: "20%" }}>User</th>
                <th style={{ width: "15%" }}>Date</th>
                <th style={{ width: "15%" }}>Deadline</th>
                <th style={{ width: "20%" }}>Supervisor</th>
                <th>Task</th>
                <th>Task State</th>
              </tr>
            </thead>
            {tasks.map((task) => {
              console.log("supervisorrr:", task.supervisor);
              return (
                <tbody key={task.id} className="thead-light">
                  <tr>
                    <td>{task.user_id}</td>
                    <td>{task.task_date.substring(0, 10)}</td>
                    <td>{task.deadline.substring(0, 10)}</td>
                    <td>{task.supervisor}</td>
                    <td>{task.task_content}</td>
                    <td
                      style={{
                        backgroundColor:
                          task.task_state === "waiting"
                            ? "red"
                            : task.task_state === "pending"
                            ? "yellow"
                            : "green",
                      }}
                      onClick={() => showModal(task.id)}
                    >
                      {task.task_state}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
x

          <Pages page={page} setRange={setRange}></Pages>
        </>
      )} */}
    </>
  );
}
