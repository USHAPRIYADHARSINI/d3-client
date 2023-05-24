import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./style/BarChartAxes.css";

const BarChartAxes = ({ xdim, ydim, margin, xdata, ydata, filter, val}) => {
  const canvas = useRef(null);
  useEffect(() => {

    d3.select(canvas.current).selectAll("*").remove();
    const svg = d3.select(canvas.current);

    addAxes(svg);
    addBars(svg);
    addText(svg);
  }, [xdim, ydim, margin, xdata, ydata]);

  const addAxes = (svg) => {
    const xAxis = d3.axisBottom(xscale);
    svg
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${ydim + margin.top})`)
        .selectAll("text")
        .attr("text-anchor","start")
        .attr("transform",`rotate(45)`)
        .attr("x",10)

    const yAxis = d3.axisLeft(yscale);
    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  };

  const addBars = (svg) => {

    const linearScale = d3
      .scaleLinear()
      .domain([0, d3.max(ydata)])
      .range([0, ydim]);

    const scaledYData = ydata.map((yval) => {
      return linearScale(yval);
    });
    console.log(scaledYData);

    svg
      .selectAll("rect")
      .data(scaledYData)
      .enter()
      .append("rect")
      .attr("width", xscale.bandwidth())
      .attr("x", (d, i) => {
        return xscale(xdata[i]);
      })
      .attr("y", ydim + margin.top)
      .attr("height",0)
      .transition()
      .duration(2000)
      .attr("y", (d) => {
        return margin.top + ydim - d;
      })
      .attr("height", (d) => {
        return d;
      })
      .attr("fill", "dodgerblue")
    //   .attr("stroke", "black");
  };

  const addText = (svg) => {
    svg
      .append("text")
      .text(`Average ${val} of available country data by ${filter}`)
      .attr("text-anchor", "middle")
      .attr("x", (margin.left + margin.right + xdim) / 2)
      .attr("y", margin.top / 2);
  };

  const xscale = d3
    .scaleBand()
    .domain(xdata)
    .range([margin.left, xdim + margin.left])
    .padding(0.1);

  const yscale = d3
    .scaleLinear()
    .domain([0, d3.max(ydata)])
    .range([ydim, 0]);

  return (
    <div className="canvas">
      <svg
        viewBox={`0 0 ${xdim + margin.left + margin.right} ${
          ydim + margin.top + margin.bottom
        }`}
        preserveAspectRatio="xMinYMin"
        width="100%"
        height="100%"
        style={{ backgroundColor: "beige" }}
        ref={canvas}
      ></svg>
    </div>
  );
};

export default BarChartAxes;
