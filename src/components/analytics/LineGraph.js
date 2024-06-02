import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const LineGraph = ({ data, options }) => {
  return (
    <div className="graph-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
