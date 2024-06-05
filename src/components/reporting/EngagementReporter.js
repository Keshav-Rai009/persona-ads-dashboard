import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { processEngagementData } from "../../util/CsvProcessor";
import { setEngagementData } from "../../redux/engagementSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../../util/IconFactory";

const EngagementReport = () => {
  const dispatch = useDispatch();
  const { engagementData, loading } = useSelector((state) => state.engagement);
  const { advertisersData } = useSelector((state) => state.csvData);

  const [tableData, setTableData] = useState([]);

  // should be configurable
  const columns = [
    "Advertiser",
    "Impressions",
    "Clicks",
    "CTR (%)",
    "Start Date",
    "State",
    "Cost Per Ad ($)",
    "Total Cost ($)",
  ];

  // should be configurable
  const engagementParameters = [
    "advertiser",
    "impressions",
    "clicks",
    "ctr",
    "startDate",
    "state",
    "costPerAd",
    "totalCost",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const processedData = processEngagementData(advertisersData);
      dispatch(setEngagementData(processedData));
    };
    fetchData();
  }, [dispatch, advertisersData]);

  useEffect(() => {
    if (engagementData) {
      setTableData(engagementData);
    }
  }, [engagementData]);

  const exportPDF = () => {
    const pdf = new jsPDF();
    pdf.autoTable({
      head: [columns],
      body: tableData.map((row) =>
        engagementParameters.map((param) => row[param])
      ),
    });

    pdf.save("engagement_report.pdf");
  };

  return (
    <div className="p-5">
      {loading ? (
        <h1 className="text-3xl"> Loading data. Please wait... </h1>
      ) : (
        <div className="bg-white rounded-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Your Ads Engagement</h1>
            <button
              onClick={exportPDF}
              className="flex items-center bg-gray-200 p-2 rounded-sm shadow hover:bg-gray-300 "
            >
              <FontAwesomeIcon icon={getIcon("EXPORT_PDF")} />
            </button>
          </div>
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((column, i) => (
                  <th key={i} className="border border-gray-200 p-2 text-left">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} style={{ borderTop: "1px solid lightgray" }}>
                  {engagementParameters.map((kpi, i) => (
                    <td key={i} className="border p-2 text-left">
                      {row[kpi]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EngagementReport;
