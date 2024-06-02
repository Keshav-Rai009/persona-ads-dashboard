import React, { useState } from "react";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import DateRangeFilter from "../DateRangeFilter";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

export default function Graph({
  title,
  type,
  data,
  options,
  customisations = {},
}) {
  const SUPPORTED_GRAPHS = {
    line: LineGraph,
    bar: BarGraph,
    pie: PieChart,
  };

  const { filterControls = {} } = customisations;
  const {
    advertiserFilter: {
      value: selectedAdvertiser,
      onChange: handleAdvertiserChange,
      options: advertiserOptions,
    } = {},
    dateFilter: { onChange: handleDateRangeChange } = {},
  } = filterControls;

  const onAdvertiserChange = (selectedAdvertiser) => {
    handleAdvertiserChange(selectedAdvertiser, title);
  };

  const onDateRangeChange = (dateRange) => {
    handleDateRangeChange(dateRange, title);
  };

  const Graph = SUPPORTED_GRAPHS[type] || LineGraph;
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 flex flex-col h-full`}
      style={customisations.style}
    >
      {customisations.showFilters ? (
        <div className="flex items-center justify-between">
          <Select
            value={selectedAdvertiser}
            onChange={(selectedAdvertiser) =>
              onAdvertiserChange(selectedAdvertiser)
            }
            options={advertiserOptions}
            placeholder="Select an Advertiser..."
          />
          <DateRangeFilter
            onDateChange={(dateRange) => onDateRangeChange(dateRange)}
          ></DateRangeFilter>
        </div>
      ) : (
        <h2 className="text-2xl font-semibold mb-4 mx-auto">{title}</h2>
      )}
      <div className="flex-grow">
        <Graph data={data} options={options} />
      </div>
    </div>
  );
}
