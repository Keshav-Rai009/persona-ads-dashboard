import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../../util/IconFactory";

const MetricInsights = ({ data, customisations = {}, title = "", type }) => {
  const metricName = title.toLocaleLowerCase();
  const isPieChart = type === "pie";
  return (
    <div
      className="w-full bg-lime-200 p-4 shadow rounded-md flex flex-col items-center"
      style={{
        height: "100%",
        backgroundColor: customisations.style?.backgroundColor,
        opacity: 0.8,
      }}
    >
      <h4 className="text-2xl font-semibold mb-4 flex items-center mt-1">
        <FontAwesomeIcon
          icon={getIcon("INFO_ICON")}
          className="mr-2 text-black"
        />
        KEY INSIGHTS
      </h4>
      {!isPieChart && (
        <ul className="my-4 ">
          <li className="flex items-center mb-2 ml-0.5">
            <FontAwesomeIcon
              icon={getIcon("CALCULATOR")}
              className="mr-2 text-black"
            />
            <span>
              Total {metricName}: {data.totalSum}
            </span>
          </li>
          <li className="flex items-center mb-2 ml-0.5">
            <FontAwesomeIcon
              icon={getIcon("GAUGE")}
              className="mr-2 text-yellow-500"
            />
            <span>
              Average {metricName}: {data.avgMetricValue}
            </span>
          </li>
          <li className="flex items-center mb-2 ">
            <FontAwesomeIcon
              icon={getIcon("MAXIMISE")}
              className="mr-2  text-red-500"
            />
            <span className="ml-0.5">
              Max {metricName}: {data.maxMetricValue}
            </span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={getIcon("STAR")}
              className="mr-2 text-green-700"
            />
            <span>Top Performers: {data.topPerformers?.join(", ")}</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={getIcon("CHART_LINE")}
              className="mr-2 text-white"
            />
            <span>Growth Rate: {data.growthRate}%</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={getIcon("SQ_RT")}
              className="mr-2 text-yellow-500"
            />
            <span>Standard Deviation: {data.standardDeviation}</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={getIcon("BOOSTER")}
              className="mr-2 text-red-500"
            />
            <span>Peak Period: {data.peakPeriod}</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={getIcon("GLOBE")}
              className="mr-2 text-green-700"
            />
            <span>Geographical Distribution: India</span>
          </li>
          <li className="flex items-start mb-2">
            <FontAwesomeIcon
              icon={getIcon("SEASON")}
              className="mr-2 mt-1.5 text-orange-400"
            />
            <span>Seasonal Trend: Seasonal trends data here...</span>
          </li>
          <li className="flex items-start mb-2">
            <FontAwesomeIcon
              icon={getIcon("ARROW_UP")}
              className="mr-2 mt-1 text-black"
            />
            <span>Trends: {data.trend}</span>
          </li>
        </ul>
      )}
      {isPieChart && (
        <ul className="my-4 ">
          <li className="flex items-start mb-2 ml-0.5">
            <FontAwesomeIcon
              icon={getIcon("CALCULATOR")}
              className="mr-2 mt-1 text-black"
            />
            <span>
              Total {metricName}: {data.totalSum}
            </span>
          </li>
          <li className="flex items-center mb-2 ">
            <FontAwesomeIcon
              icon={getIcon("MAXIMISE")}
              className="mr-2  text-red-500"
            />
            <span className="ml-0.5">
              Max {metricName}: {data.topPerformingCountry}
            </span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={getIcon("CHART_LINE")}
              className="mr-2 text-yellow-500"
            />
            <span>Max Advertisers: {data.maxAdvertiserImpressions}</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={getIcon("FLAG")}
              className="mr-2 text-white"
            />
            <span>No of countries: {data.numberOfCountries}</span>
          </li>
          <li className="flex items-start mb-2">
            <FontAwesomeIcon
              icon={getIcon("STAR")}
              className="mr-2 text-green-700 mt-1"
            />
            <div className="flex flex-col">
              Top Contributors:
              <ul className="pl-6">
                {data.topCountributors?.map(
                  ({ country, impressions, percentage, advertisers = [] }) => (
                    <li key={country} className="list-disc">
                      {country}: {impressions} impressions ({percentage}%)
                      <ul className="pl-4">
                        {Object.entries(advertisers).map(
                          ([advertiser, imp]) => (
                            <li key={advertiser}>
                              {advertiser}: {imp} impressions
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  )
                )}
              </ul>
            </div>
          </li>
          <li className="flex items-start mb-2">
            <FontAwesomeIcon
              icon={getIcon("ARROW_UP")}
              className="mr-2 mt-1 text-black"
            />
            <span>Trends: {data.trend}</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MetricInsights;
