import React, { useEffect, useState } from "react";
import MetricAnalytics from "./analytics/MetricAnalytics";
import {
  extractMetricInsights,
  getMetricDatasets,
  transformToGraphdata,
} from "../util/AnalyticsUtil";
import { useDispatch, useSelector } from "react-redux";
import { storeMetricesAnalysisData } from "../redux/csvDataSlice";

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
      setMetricInsights(
        extractMetricInsights({
          keyMetrices,
          metricData: advertisersData,
          pieChartData: {
            impressionsData,
            impressionsByCountry: processedImpressionsData,
          },
        })
      );
      dispatch(storeMetricesAnalysisData(metricInsights));
    }
  }, [loading, advertisersData, keyMetrices, dispatch]);

  const advertisers = processedAdvertisersData.advertisers;

  const advertiserOptions = [{ value: "All", label: "All" }];
  advertiserOptions.push(
    ...(advertisers
      ?.map((advertiser) => ({
        value: advertiser,
        label: advertiser,
      }))
      .sort((a, b) => (a.value - b.value ? 1 : -1)) || [])
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
