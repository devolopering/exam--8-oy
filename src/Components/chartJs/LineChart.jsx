
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLineData } from "../../context/LineContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const { chartData, fetchCoinData, loading, error } = useLineData();
  const [timePeriod, setTimePeriod] = useState("30");

  // Fetch data when time period changes
  useEffect(() => {
    fetchCoinData(timePeriod);
  }, [timePeriod]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Line data={chartData} />
      <div className="flex gap-4 mt-4">
        <button
          className={`px-4 py-2 ${timePeriod === "1" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setTimePeriod("1")}
        >
          24 Hours
        </button>
        <button
          className={`px-4 py-2 ${timePeriod === "30" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setTimePeriod("30")}
        >
          30 Days
        </button>
        <button
          className={`px-4 py-2 ${timePeriod === "90" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setTimePeriod("90")}
        >
          3 Months
        </button>
        <button
          className={`px-4 py-2 ${timePeriod === "365" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setTimePeriod("365")}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default LineChart;
