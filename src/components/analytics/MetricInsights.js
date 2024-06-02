import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCalculator,
  faStar,
  faInfoCircle,
  faArrowTrendUp,
  faMaximize,
  faSeedling,
  faSquareRootVariable,
  faRocket,
  faBookAtlas,
  faUmbrellaBeach,
  faCloudSunRain,
  faGlobe,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const MetricInsights = ({ data, customisations = {}, title = "", type }) => {
  const metricName = title.toLocaleLowerCase();
  const isPieChart = type === "pie";
  return (
    <div
      className="w-full bg-lime-200 p-4 shadow rounded-md flex flex-col items-center"
      style={{
        height: "500px",
        backgroundColor: customisations.style?.backgroundColor,
        opacity: 0.8,
      }}
    >
      <h4 className="text-2xl font-semibold mb-4 flex items-center mt-1">
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-black" />
        KEY INSIGHTS
      </h4>
      {!isPieChart && (
        <ul className="my-4 ">
          <li className="flex items-center mb-2 ml-0.5">
            <FontAwesomeIcon icon={faPlus} className="mr-2 text-white" />
            <span>
              Total {metricName}: {data.totalSum}
            </span>
          </li>
          <li className="flex items-center mb-2 ml-0.5">
            <FontAwesomeIcon
              icon={faCalculator}
              className="mr-3 text-yellow-500"
            />
            <span>
              Average {metricName}: {data.avgMetricValue}
            </span>
          </li>
          <li className="flex items-center mb-2 ">
            <FontAwesomeIcon icon={faMaximize} className="mr-2  text-red-500" />
            <span className="ml-0.5">
              Max {metricName}: {data.maxMetricValue}
            </span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon icon={faStar} className="mr-2 text-green-700" />
            <span>Top Performers: {data.topPerformers.join(", ")}</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon icon={faChartLine} className="mr-2 text-white" />
            <span>Growth Rate: {data.growthRate}%</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={faSquareRootVariable}
              className="mr-2 text-yellow-500"
            />
            <span>Standard Deviation: {data.standardDeviation}</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon icon={faRocket} className="mr-2 text-red-500" />
            <span>Peak Period: {data.peakPeriod}</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon icon={faGlobe} className="mr-2 text-green-700" />
            <span>Geographical Distribution: India</span>
          </li>
          <li className="flex items-start mb-2">
            <FontAwesomeIcon
              icon={faCloudSunRain}
              className="mr-2 mt-1.5 text-orange-400"
            />
            <span>Seasonal Trend: Seasonal trends data here...</span>
          </li>
          <li className="flex items-start mb-2">
            <FontAwesomeIcon
              icon={faArrowTrendUp}
              className="mr-2 mt-1 text-black"
            />
            <span>Trends: {data.trend}</span>
          </li>
        </ul>
      )}
      {isPieChart && (
        <ul className="my-4 ">
          <li className="flex items-start mb-2 ml-0.5">
            <FontAwesomeIcon icon={faPlus} className="mr-2 mt-1 text-white" />
            <span>
              Total {metricName}: {data.totalSum}
            </span>
          </li>
          <li className="flex items-center mb-2 ">
            <FontAwesomeIcon icon={faMaximize} className="mr-2  text-red-500" />
            <span className="ml-0.5">
              Max {metricName}: {data.topPerformingCountry}
            </span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon icon={faChartLine} className="mr-2 text-white" />
            <span>Max Advertisers: {data.maxAdvertiserImpressions}</span>
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={faSquareRootVariable}
              className="mr-2 text-yellow-500"
            />
            <span>No of countries: {data.numberOfCountries}</span>
          </li>
          <li className="flex items-start mb-2">
            <FontAwesomeIcon
              icon={faStar}
              className="mr-2 text-green-700 mt-1"
            />
            <div className="flex flex-col">
              Top Contributors:
              <ul className="pl-6">
                {data.topCountributors.map(
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
              icon={faArrowTrendUp}
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
