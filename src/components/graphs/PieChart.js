// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Impressions",
        data: Object.values(data),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 10,
        align: "center",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "chartArea",
        display: false,
      },
      title: {
        display: true,
        text: "Impressions by Country",
        align: "center",
      },
    },
    layout: {},
  };

  return (
    <div className="graph-container" style={{ height: "80%", marginTop: "6%" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
