import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

export default function useCSVData(csvFilePath, delimiter = ",") {
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [csvErrors, setCsvErrors] = useState(null);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        Papa.parse(csvFilePath, {
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

  const memoizedData = useMemo(() => csvData, [csvData]);

  return { csvData: memoizedData, csvErrors, loading };
}
