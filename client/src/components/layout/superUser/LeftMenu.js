import { Menu } from "antd";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import BreadCrumbCustom from "./BreadCrumbCustom";
import DragDrop from "../../dragndrop/DragDrop";
import AddTask from "../../addtask/AddTask";
import Routing from "../../routing/Routing";
import { useNavigate } from "react-router-dom";

export default function LeftMenu({ items, socket, setUsername }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
          // console.log(item);
          // console.log(key);
          // console.log(keyPath);
          // console.log(selectedKeys);
          // console.log(domEvent);
          // if (items[2].children[key]?.label !== null) {
          //   console.log(items[2].children[key].label);
          //   //setUsername(items[2].children[key].label);
          // } else {
          //   console.log(items[key - 1].label);
          // }
        }}
      />
    </div>
  );
}
