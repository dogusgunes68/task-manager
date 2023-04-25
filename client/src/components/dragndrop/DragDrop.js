import React, { useRef, useState } from "react";
import "./dragDrop.css";


export default function DragDrop({data}) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpIx].items.splice(
          params.itemIx,
          0,
          newList[currentItem.grpIx].items.splice(currentItem.itemIx, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpIx === params.grpIx &&
      currentItem.itemIx === params.itemIx
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  return (
    <header className="App-header">
      <div className="drag-n-drop">
        {list.map((grp, grpIx) => (
          <div
            key={grp.title}
            className="dnd-group"
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => {
                    handleDragEnter(e, { grpIx, itemIx: 0 });
                  }
                : null
            }
          >
            <div className="group-title">{grp.title}</div>
            {grp.items.map((item, itemIx) => (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, { grpIx, itemIx })}
                onDragEnter={
                  dragging
                    ? (e) => {
                        handleDragEnter(e, { grpIx, itemIx });
                      }
                    : null
                }
                key={item}
                className={dragging ? getStyles({ grpIx, itemIx }) : "dnd-item"}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </header>
  );
}
