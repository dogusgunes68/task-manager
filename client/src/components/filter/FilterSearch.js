import Search from "antd/lib/transfer/search";
import React, { useEffect, useState } from "react";

export default function FilterSearch({ groups, setGroups }) {
  const searchHandler = (event) => {
    var temp = [];
    if (event.target.value === null) {
      setGroups(groups);
    } else {
      //console.log(groups);
      //groups içindeki items'a ihtiyaç var                                                                         
      groups.filter(function (element, index) {
        if (element.items.includes(event.target.value)) {
          temp.push(element);
        }
      });
      //console.log(temp);
      setGroups(temp);
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <Search
        placeholder="Search"
        onChange={searchHandler}
        style={{ width: 200 }}
      />
    </div>
  );
}
