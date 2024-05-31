import React, { useState } from "react";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";

export default function Graph({ title, type, data, options }) {
  const SUPPORTED_GRAPHS = {
    line: LineGraph,
    bar: BarGraph,
    pie: PieChart,
  };
  // const [isZoomed, setIsZoomed] = useState(false);

  const Graph = SUPPORTED_GRAPHS[type] || LineGraph;
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col h-full  ">
      <h2 className="text-2xl font-semibold mb-4 mx-auto">{title}</h2>
      <div className="flex-grow">
        <Graph data={data} options={options} />
      </div>
    </div>
  );
}
