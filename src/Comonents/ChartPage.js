import React from "react";
import { useState, useEffect } from "react";
import BarChartAxes from "./BarChartAxes.js";
import "./style/BarChart.css";
import "./style/Dashboard.css";

function ChartPage({ filter, val }) {
  const [get, setGet] = useState("");
  const [topicData, setTopicData] = useState([""]);
  var graph = null;

  useEffect(() => {
    console.log(`getting chart data, ${get}`);
    const token = localStorage.getItem("Authorisation");
    if (get) {
      fetch(`https://dashboard-app-u41p.onrender.com/dashboard/get/${filter}/${get}`, 
      // {
      //   headers: new Headers({
      //     Authorisation: token,
      //   }),
      // }
      )
        .then((data) => data.json())
        .then((data) => setTopicData(data))
        .catch((error) => console.log(error));
    }
  }, [get]);

  if ((topicData.length > 0) && (topicData[0]!== "")) {
    graph = (
      <div className='"barchart-body'>
        <BarChartAxes
          xdim={750}
          ydim={500}
          margin={{
            top: 80,
            bottom: 80,
            left: 120,
            right: 120,
          }}
          filter={filter}
          val={val}
          xdata={topicData.map((d, i) => {
            if (d.country !== "") {
              return d.country;
            } else {
              return d.region;
            }
          })}
          ydata={topicData.map((d, i) => {
            console.log("val", val);
            if (val === "intensity") {
              return (d.intensity);
            } else if (val === "likelihood") {
              return (d.likelihood);
            } else if (val === "relevance") {
              return (d.relevance);
            }
          })}
        />
      </div>
    );
  }

  var content = null;
  const [data, setData] = useState([""]);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    console.log("getting data");
    const token = localStorage.getItem("Authorisation");
    fetch(`https://dashboard-app-u41p.onrender.com/dashboard/${filter}`, 
    // {
    //   headers: new Headers({
    //     Authorisation: token,
    //   }),
    // }
    )
      .then((data) => data.json())
      .then((data) => setData(data))
      // .then((data) => console.log(data.length))
      .catch((error) => console.log(error));
  }, [filter]);

  if (data.length > 1) {
    // <div>{data.length}</div>
    content = data.map((d, i) => (
      <li className="listitem" key={i} onClick={() => setGet(d)}>
        {d}
      </li>
    ));
  }

  return (
    <div className="dashboard">
      <div className="page">
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
        <div className="barchart">{graph}</div>
      </div>
    </div>
  );
}

export default ChartPage;
