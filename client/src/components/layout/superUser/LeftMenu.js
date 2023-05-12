import { Menu } from "antd";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import BreadCrumbCustom from "./BreadCrumbCustom";
import DragDrop from "../../dragndrop/DragDrop";
import AddTask from "../../addtask/AddTask";
import Routing from "../../routing/Routing";
import { useNavigate } from "react-router-dom";

export default function LeftMenu({ items, socket, setSelectedUsername }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={({ key, keyPath, domEvent }) => {
          //console.log(key, keyPath, domEvent);
          setSelectedUsername(key);
        }}
        // onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
        //   console.log(item);
        //   console.log(key);
        //   console.log(keyPath);
        //   console.log(selectedKeys);
        //   console.log(domEvent);
        //   if (items[2].children[key]?.label !== null) {
        //     console.log(items[2].children[key].label);
        //     //setUsername(items[2].children[key].label);
        //   } else {
        //     console.log(items[key - 1].label);
        //   }
        // }}
      />
      {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item>All Tasks</Menu.Item>
        <Menu.Item>Add Task</Menu.Item>
        <Menu.SubMenu title="Users">
          <Menu.Item>item 3</Menu.Item>
        </Menu.SubMenu>
      </Menu> */}
    </div>
  );
}
