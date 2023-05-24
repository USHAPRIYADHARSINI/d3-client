import React from "react";
import { useState, useEffect } from "react";
import "./style/BarChart.css";
import "./style/Dashboard.css";

function Filter({ setTopic, setSector, setStartYear, filter, setFilter, val, setVal}) {
  var content = null;
  const [data, setData] = useState([""]);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    console.log("getting data");
    fetch(`http://localhost:5000/dashboard/${filter}`)
      .then((data) => data.json())
      .then((data) => setData(data))
      // .then((data) => console.log(data.length))
      .catch((error) => console.log(error));
  }, [filter]);

  if (filter === "topic" && data.length > 1){
         // <div>{data.length}</div>
    content = data.map((d, i) => (
        <li className="listitem" key={i} onClick={() => setTopic(d)}>
          {d}
        </li>
      ));
  }else if (filter === "sector" && data.length > 1){
    content = data.map((d, i) => (
        <li className="listitem" key={i} onClick={() => setSector(d)}>
          {d}
        </li>
      ));
  }else if (filter === "start_year" &&  data.length > 1){
    content = data.map((d, i) => (
        <li className="listitem" key={i} onClick={() => setStartYear(d)}>
          {d}
        </li>
      ));
  }

  return (
    <div className="filter">
      <div className="topic">
        Get intensity based on different {filter} for each country
      </div>
      <button
        className="dropbtn"
        style={
          dropDown
            ? { backgroundColor: "beige" }
            : { backgroundColor: "rgb(221, 221, 205)" }
        }
        onClick={() => setDropDown(!dropDown)}
      >
        {dropDown ? "Close" : "Open"}
      </button>
      <ul className="list">{dropDown ? content : null}</ul>
    </div>
  );
}

export default Filter;
