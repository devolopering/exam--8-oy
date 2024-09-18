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
import { Button } from "flowbite-react";

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
  const [timePeriod, setTimePeriod] = useState("1");

 
  useEffect(() => {
    fetchCoinData(timePeriod);
  }, [timePeriod]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Line data={chartData} />
      <div className="flex gap-4 mt-4">
      
        <Button
          className={`w-[284px] text-left${timePeriod === "1" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setTimePeriod("1")}
        >
          24 Hours
        </Button>
        
      
        <Button
          className={`w-[284px] text-left ${timePeriod === "30" ? "bg-blue-600 text-white" : "bg-transparent"} rounded`}
          onClick={() => setTimePeriod("30")}
        >
          30 Days
        </Button>
        
     
        <Button
          className={`w-[284px] text-left${timePeriod === "90" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setTimePeriod("90")}
        >
          3 Months
        </Button>
        

        <Button
          className={`w-[284px] text-left${timePeriod === "365" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setTimePeriod("365")}
        >
          1 Year
        </Button>
      </div>
    </div>
  );
};

export default LineChart;
