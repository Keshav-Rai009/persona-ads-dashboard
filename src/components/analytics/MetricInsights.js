import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../../util/IconFactory";
import { useSelector } from "react-redux";

const MetricInsights = ({ data, customisations = {}, title = "", type }) => {
  const metricName = title.toLocaleLowerCase();
  const isPieChart = type === "pie";
  const { keyInsights } = useSelector((state) => state.csvData);
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
          {keyInsights.graphs.map((insight, i) => {
            const title = insight.showMetricTitle
              ? insight.name + " " + metricName
              : insight.name;
            return (
              <li key={i} className="flex items-start mb-2">
                <FontAwesomeIcon
                  icon={getIcon(insight.icon)}
                  className={`mr-2 mt-1 text-${insight.iconColor}`}
                />
                <span>
                  {title}:{" "}
                  {Array.isArray(data[insight.key])
                    ? data[insight.key]?.join(", ")
                    : data[insight.key]}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {isPieChart && (
        <ul className="my-4 ">
          {keyInsights.charts.map((insight, i) => {
            const title = insight.showMetricTitle
              ? insight.name + " " + metricName
              : insight.name;
            return (
              <li key={i} className="flex items-start mb-2">
                <FontAwesomeIcon
                  icon={getIcon(insight.icon)}
                  className={`mr-2 mt-1 text-${insight.iconColor}`}
                />
                <span>
                  {title}: {data[insight.key]}
                </span>
              </li>
            );
          })}
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
        </ul>
      )}
    </div>
  );
};

export default MetricInsights;
