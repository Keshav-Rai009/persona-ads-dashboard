import React, { useEffect, useState } from "react";
import DateRangeFilter from "./DateRangeFilter";
import { useDispatch, useSelector } from "react-redux";
import Graph from "./analytics/visualizers/Graph";
import {
  filterPieChartByAdvertiser,
  filterDataByAdvertiser,
  filterDataByDateRange,
  getAdvertiserOptions,
  getMetricDatasets,
  transformToGraphdata,
  initialAdvertiserOption,
  mergeAllMetricesByAdvertisers,
} from "../util/AnalyticsUtil";
import { processCsvDataForPieChart } from "../util/CsvProcessor";
import SelectFilter from "./SelectFilter";

function Overview() {
  const {
    keyMetrices,
    advertisersData,
    impressionsData,
    processedAdvertisersData,
    processedImpressionsData,
    loading,
  } = useSelector((state) => state.csvData);
  const dispatch = useDispatch();

  const [countryImpressions, setCountryImpressions] = useState([]);
  const [advertisers, setAdvertisers] = useState(
    processedAdvertisersData.advertisers
  );
  const [initialData, setInitialData] = useState(null);
  const [filteredGraphData, setFilteredGraphData] = useState(null);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(
    initialAdvertiserOption
  );
  const [dateRange, setDateRange] = useState(["Select dates..."]);

  useEffect(() => {
    const initiateSetup = async () => {
      setAdvertisers(processedAdvertisersData.advertisers);
      const initialGraphData = mergeAllMetricesByAdvertisers(
        processedAdvertisersData
      );
      setCountryImpressions(processedImpressionsData);
      setInitialData(processedAdvertisersData);
      setFilteredGraphData(initialGraphData);
    };
    if (advertisersData?.length && impressionsData?.length) {
      initiateSetup();
    }
  }, [
    processedAdvertisersData,
    processedImpressionsData,
    advertisersData,
    impressionsData,
    dispatch,
    loading,
  ]);

  const filterData = ({ selectedAdvertiser, dateRange }) => {
    let filteredData = { ...filteredGraphData };
    if (selectedAdvertiser) {
      setSelectedAdvertiser({ ...selectedAdvertiser });
      filteredData = filterDataByAdvertiser({
        selectedAdvertiser,
        csvData: initialData,
      });
      const filteredImpressionsData = filterPieChartByAdvertiser(
        impressionsData,
        selectedAdvertiser.value
      );
      setCountryImpressions(processCsvDataForPieChart(filteredImpressionsData));
    }

    if (dateRange?.length === 2) {
      setDateRange([...dateRange]);
      filteredData = filterDataByDateRange({
        dateRange,
        graphData: filteredData,
      });
    }

    setFilteredGraphData({ ...filteredData });
  };
  const advertiserOptions = getAdvertiserOptions(advertisers);

  const handleDateChange = (selectedDates) => {
    filterData({ selectedAdvertiser, dateRange: selectedDates });
  };

  const handleAdvertiserChange = (selectedAdvertiser) => {
    filterData({ selectedAdvertiser, dateRange });
  };

  return loading ? (
    <h1 className="text-3xl"> Loading data. Please wait... </h1>
  ) : (
    <div className="p-5 min-h-screen overflow-auto">
      <div className="flex pb-5 justify-between">
        <SelectFilter
          value={selectedAdvertiser}
          onChange={handleAdvertiserChange}
          options={advertiserOptions}
          customisations={{
            style: { width: "25%" },
          }}
        ></SelectFilter>
        <DateRangeFilter onDateChange={handleDateChange}></DateRangeFilter>
      </div>
      <div className="grid grid-cols-2 gap-4" style={{ height: "100%" }}>
        {keyMetrices.map((metric, i) => {
          const { title, type, options } = metric;
          const data =
            type === "pie"
              ? { ...countryImpressions }
              : {
                  ...filteredGraphData,
                  datasets: [
                    getMetricDatasets(filteredGraphData?.datasets, title),
                  ],
                };
          return (
            <Graph
              key={i}
              title={title}
              data={data}
              options={options}
              type={type}
            ></Graph>
          );
        })}
      </div>
    </div>
  );
}

export default Overview;
