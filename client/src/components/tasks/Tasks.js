import { useState } from "react";
import "./task.css";
import jwt from "jwt-decode";
import ErrorModal from "../Modals/ErrorModal";
import DragDrop from "../dragndrop/DragDrop";
import FilterSearch from "../filter/FilterSearch";

const baseUrl = "http://192.168.1.74:2000/api/v1/";
const data = [
  { title: "Backlog", items: ["1", "2", "3"] },
  { title: "Doing", items: ["4", "5", "6"] },
  { title: "Q&A", items: ["7", "8", "9"] },
  { title: "Production", items: ["10", "11", "12"] },
];

export default function Tasks({ socket }) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");
  const { user } = jwt(token);

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
    </>
  );
}
