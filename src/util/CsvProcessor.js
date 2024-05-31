export default function processCsvData(data) {
  if (!data) return { labels: null, datasets: null };
  const advertisers = [...new Set(data.map((d) => d.Advertiser))];
  const labels = data.map((row) => row.Date);
  const impressions = data.map((row) => ({
    advertiser: row.Advertiser,
    value: parseInt(row.Impressions, 10),
  }));

  const clicks = data.map((row) => ({
    advertiser: row.Advertiser,
    value: parseInt(row.Clicks, 10),
  }));

  const ctr = data.map((row) => ({
    advertiser: row.Advertiser,
    value: row["CTR (in %)"],
  }));

  return {
    advertisers,
    labels,
    datasets: [
      {
        label: "Impressions",
        data: impressions,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: "Clicks",
        data: clicks,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
        borderWidth: 1.5,
      },
      {
        label: "CTR",
        data: ctr,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

export function processCsvDataForPieChart(data) {
  const countryImpressions = {};

  data.forEach((row) => {
    const country = row.Country;
    const impressions = parseInt(row.Impressions, 10);

    if (country in countryImpressions) {
      countryImpressions[country] += impressions;
    } else {
      countryImpressions[country] = impressions;
    }
  });
  console.log(countryImpressions);

  return countryImpressions;
}
