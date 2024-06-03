import React from "react";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import DateRangeFilter from "../DateRangeFilter";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../../util/IconFactory";

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
      visible: isAdvertiserFilterVisible = true,
    } = {},
    dateFilter: {
      onChange: handleDateRangeChange,
      visible: isDateFilterVisible = true,
    } = {},
  } = filterControls;

  const onAdvertiserChange = (selectedAdvertiser) => {
    handleAdvertiserChange(selectedAdvertiser, title);
  };

  const onDateRangeChange = (dateRange) => {
    handleDateRangeChange(dateRange, title);
  };

  const Graph = SUPPORTED_GRAPHS[type] || LineGraph;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 flex flex-col h-full`}
      style={customisations.style}
    >
      {customisations.showFilters ? (
        <div className="flex items-center justify-between">
          {isAdvertiserFilterVisible && (
            <Select
              value={selectedAdvertiser}
              onChange={(selectedAdvertiser) =>
                onAdvertiserChange(selectedAdvertiser)
              }
              options={advertiserOptions}
              placeholder="Select an Advertiser..."
            />
          )}
          {isDateFilterVisible && (
            <DateRangeFilter
              onDateChange={(dateRange) => onDateRangeChange(dateRange)}
            ></DateRangeFilter>
          )}
        </div>
      ) : (
        <h2 className="text-2xl font-semibold mb-4 mx-auto">{title}</h2>
      )}

      {!Object.keys(data || {}).length ? (
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            icon={getIcon("WARNING")}
            className="text-red-500 mr-2 fa-2xl"
          />
          <div className="text-3xl text-red-500"> No data found! </div>
        </div>
      ) : (
        <div className="flex-grow">
          <Graph data={data} options={options}></Graph>
        </div>
      )}
    </div>
  );
}
