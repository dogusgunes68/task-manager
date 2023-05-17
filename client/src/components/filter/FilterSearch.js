import Search from "antd/lib/transfer/search";
import React, { useEffect, useState } from "react";

export default function FilterSearch({ groups, setFilteredData }) {
  //const tempData = ;

  const searchHandler = (event) => {
    setFilteredData([]);
    if (event.target.value === "" || event.target.value === null) {
      console.log(true);
      setFilteredData([...groups]);
    } else {
      //console.log(groups);
      //groups içindeki items'a ihtiyaç var
      console.log(false);

      // console.log(event.target.value);
      const temp = [...groups].map(function (element, index) {
        element.items = element.items.filter((item) =>
          item.task_content.includes(event.target.value)
        );

        return element;
      });
      console.log("temp:", temp);
      setFilteredData([...temp]);
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
