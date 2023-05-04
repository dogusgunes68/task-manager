import { Menu } from "antd";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import BreadCrumbCustom from "./BreadCrumbCustom";
import DragDrop from "../../dragndrop/DragDrop";
import AddTask from "../../addtask/AddTask";
import Routing from "../../routing/Routing";
import { useNavigate } from "react-router-dom";

export default function LeftMenu({ items, socket }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
