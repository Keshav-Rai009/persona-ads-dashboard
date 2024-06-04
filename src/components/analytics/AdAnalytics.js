import React, { useEffect, useState } from "react";
import MetricAnalytics from "./MetricAnalytics";
import {
  extractMetricInsights,
  getAdvertiserOptions,
  getMetricDatasets,
  transformToGraphdata,
} from "../../util/AnalyticsUtil";
import { useDispatch, useSelector } from "react-redux";
import { storeMetricesAnalysisData } from "../../redux/csvDataSlice";

const AdAnalytics = () => {
  const dispatch = useDispatch();
  const {
    keyMetrices,
    advertisersData,
    impressionsData,
    processedAdvertisersData,
    processedImpressionsData,
    loading,
  } = useSelector((state) => state.csvData);

  const [metricInsights, setMetricInsights] = useState(null);
  const graphData = transformToGraphdata(processedAdvertisersData);

  useEffect(() => {
    if (!loading) {
      const insights = extractMetricInsights({
        keyMetrices,
        metricData: advertisersData,
        pieChartData: {
          impressionsData,
          impressionsByCountry: processedImpressionsData,
        },
      });
      setMetricInsights(insights);
      dispatch(storeMetricesAnalysisData(insights));
    }
  }, [
    loading,
    keyMetrices,
    advertisersData,
    impressionsData,
    processedImpressionsData,
    dispatch,
  ]);

  const advertiserOptions = getAdvertiserOptions(
    processedAdvertisersData.advertisers
  );

  return (
    !loading &&
    metricInsights &&
    graphData && (
      <div className="flex flex-col gap-4 p-5 min-h-screen">
        {keyMetrices.map((metric, i) => {
          const { title, type, options } = metric;
          const metricData = {
            title,
            data:
              type === "pie"
                ? { ...processedImpressionsData }
                : {
                    ...graphData,
                    datasets: [getMetricDatasets(graphData?.datasets, title)],
                  },
            type: type,
            options,
          };
          return (
            <MetricAnalytics
              key={i}
              metricData={metricData}
              insightsData={metricInsights[title]}
              initialData={{
                keyMetrices,
                advertisersData,
                impressionsData,
                processedAdvertisersData,
                processedImpressionsData,
                advertiserOptions,
              }}
              customisations={{
                style: { backgroundColor: metric.visuals.borderColor[0] },
              }}
            ></MetricAnalytics>
          );
        })}
      </div>
    )
  );
};

export default AdAnalytics;
