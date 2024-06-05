import React from "react";
import LineGraph from "../visualizers/LineGraph";
import BarGraph from "../visualizers/BarGraph";
import PieChart from "../visualizers/PieChart";
import DateRangeFilter from "../../DateRangeFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../../../util/IconFactory";
import SelectFilter from "../../SelectFilter";

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
            <SelectFilter
              value={selectedAdvertiser}
              onChange={(selectedAdvertiser) =>
                onAdvertiserChange(selectedAdvertiser)
              }
              options={advertiserOptions}
              customisations={{
                style: { border: "1px solid lightgray" },
              }}
            ></SelectFilter>
          )}
          {isDateFilterVisible && (
            <DateRangeFilter
              onDateChange={(dateRange) => onDateRangeChange(dateRange)}
              customisations={{
                style: {
                  border: "1px solid lightgray",
                  height: "2.4em",
                  width: "13em",
                },
              }}
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
