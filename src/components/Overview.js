import React, { useEffect, useState } from "react";
import useCSVData from "../hooks/useCSVData";
import Top10_Countries from "../assets/datasets/Top10_Countries.csv";
import processCsvData, {
  processCsvDataForPieChart,
} from "../util/CsvProcessor";
import Select from "react-select";
import DateRangeFilter from "./DateRangeFilter";
import Advertiser_Data from "../assets/datasets/Advertiser_Data.csv";

import { useDispatch, useSelector } from "react-redux";
import Graph from "./graphs/Graph";
import { storeData } from "../redux/csvDataSlice";
import {
  filterDataByAdvertiser,
  filterDataByDateRange,
  getKeyMetrices,
  transformGraphdata,
} from "../util/AnalyticsUtil";

function Overview() {
  const [loading, setLoading] = useState(true);
  const { csvData: advertisersCsvData, loading: isAdvertisersDataLoading } =
    useCSVData(Advertiser_Data);
  const { advertisers, labels, datasets } = processCsvData(advertisersCsvData);
  const [advertisersData, setAdvertiersData] = useState(null);
  // const dispatch = useDispatch();
  const data = { labels, datasets };

  const [keyMetrices, setKeyMetrices] = useState([]);

  // const csvd = useSelector((state) => state.csvData);
  // console.log(csvd);

  const graphData = transformGraphdata(data);

  const [filteredGraphData, setFilteredGraphData] = useState(graphData);

  const { csvData: impressionsCsvData } = useCSVData(Top10_Countries);

  const [countryImpressions, setCountryImpressions] = useState({});
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(null);

  const filterData = ({ selectedAdvertiser, dateRange }) => {
    let filteredData = { ...graphData };
    if (selectedAdvertiser) {
      setSelectedAdvertiser({ ...selectedAdvertiser });
      filteredData = filterDataByAdvertiser({
        selectedAdvertiser,
        graphData,
        csvData: data,
      });
    }

    if (dateRange) {
      setDateRange([...dateRange]);
      filteredData = filterDataByDateRange({
        dateRange,
        graphData: filteredData,
      });
    }

    setFilteredGraphData({ ...filteredData });
  };

  const advertiserOptions = [{ value: "All", label: "All" }];

  advertiserOptions.push(
    ...(advertisers
      ?.map((advertiser) => ({
        value: advertiser,
        label: advertiser,
      }))
      .sort((a, b) => (a.value - b.value ? 1 : -1)) || [])
  );

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  useEffect(() => {
    setLoading(isAdvertisersDataLoading);
    setAdvertiersData({
      ...advertisersData,
      ...{ advertisers, labels, datasets },
    });
    const fetchData = async () => {
      const keyMetrices = await getKeyMetrices();
      setKeyMetrices([...keyMetrices]);
    };
    fetchData();
    if (impressionsCsvData?.length) {
      console.log(advertisers, graphData);
      const impressionsData = processCsvDataForPieChart(impressionsCsvData);
      setCountryImpressions(impressionsData);
    }
    setFilteredGraphData(graphData);
  }, [impressionsCsvData, advertisersCsvData]);

  const handleDateChange = (selectedDates) => {
    filterData({ selectedAdvertiser, dateRange: selectedDates });
  };

  return loading ? (
    <h1 className="text-3xl"> Loading data. Please wait... </h1>
  ) : (
    <div className="p-5 min-h-screen">
      <div className="flex pb-5 justify-between">
        <div style={{ width: "25%", maxWidth: "500px" }}>
          <Select
            value={selectedAdvertiser}
            onChange={(selectedAdvertiser) =>
              filterData({ selectedAdvertiser })
            }
            options={advertiserOptions}
            placeholder="Select an advertiser..."
          />
        </div>
        <DateRangeFilter onDateChange={handleDateChange}></DateRangeFilter>
      </div>
      <div
        className="grid grid-cols-2 gap-4"
        style={{ height: "125vh", gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        {keyMetrices.map((metric, i) => {
          const { title, type, options } = metric;
          if (type === "pie") {
            return (
              <Graph
                key={i}
                title="IMPRESSIONS BY COUNTRY"
                data={countryImpressions}
                type="pie"
              ></Graph>
            );
          }

          return (
            <Graph
              key={i}
              title={title}
              data={{
                ...filteredGraphData,
                datasets: [filteredGraphData.datasets?.[i] || []],
              }}
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
