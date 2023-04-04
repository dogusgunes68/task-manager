import { useState } from "react";
import "./pages.css";

export default function Pages({ page, setRange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const focused = (index) => {
    if (currentPage !== index) {
      console.log("index:", index);
      setCurrentPage(index);
      const newStart = index * 5 - 4;
      const newEnd = newStart + 4;

      setRange([newStart, newEnd]);
    }
  };

  return (
    <div className="pages-container">
      {page.map((i) => {
        return (
          <button
            style={{ backgroundColor: i === currentPage ? "red" : "bisque" }}
            className="page"
            key={i}
            id={i}
            value={i}
            onClick={() => focused(i)}
          >
            {i}
          </button>
        );
      })}
    </div>
  );
}
