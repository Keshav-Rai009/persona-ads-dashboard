import { useEffect, useState } from "react";
import Papa from "papaparse";
// import { useDispatch } from "react-redux";
// import { storeData } from "../redux/csvDataSlice";

export default function useCSVData(csvFilePath, delimiter = ",") {
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [csvErrors, setCsvErrors] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        await Papa.parse(csvFilePath, {
          header: true,
          download: true,
          skipEmptyLines: true,
          delimiter: delimiter,
          complete: (results) => {
            setCsvData(results.data);
          },
          error: (e) => {
            setCsvErrors(e);
          },
        });
      } catch (e) {
        setCsvErrors(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCsvData();
  }, [csvFilePath, delimiter]);

  return { csvData, csvErrors, loading };
}
