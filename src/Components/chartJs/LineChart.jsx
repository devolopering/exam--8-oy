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
      
        <button
          className={`w-[284px] text-left font-montserrat text-base    font-medium ${timePeriod === "1"? " bg-[#87CEEB] font-bold   text-black" : "bg-transparent text-white"} rounded border-2 border-[#87CEEB] pl-[21px] py-1 hover:bg-[#87CEEB] hover:text-black duration-300 `}
          onClick={() => setTimePeriod("1")}
        >
          24 Hours
        </button>
        
      
        <button
          className={`w-[284px] text-left font-montserrat text-base    font-medium ${timePeriod === "30" ? "bg-[#87CEEB] font-bold text-black" : "bg-transparent text-white"} rounded border-2 border-[#87CEEB] pl-[21px] py-1 hover:bg-[#87CEEB] hover:text-black duration-300 `}
          onClick={() => setTimePeriod("30")}
        >
          30 Days
        </button>
        
     
        <button
          className={`w-[284px] text-left font-montserrat text-base    font-medium ${timePeriod === "90" ? "bg-[#87CEEB] font-bold text-black" : "bg-transparent text-white"} rounded border-2 border-[#87CEEB] pl-[21px] py-1 hover:bg-[#87CEEB] hover:text-black duration-300 `}
          onClick={() => setTimePeriod("90")}
        >
          3 Months
        </button>
        

        <button
          className={`w-[284px] text-left font-montserrat text-base    font-medium ${timePeriod === "365" ? "bg-[#87CEEB] font-bold text-black" : "bg-transparent text-white"} rounded border-2 border-[#87CEEB] pl-[21px] py-1 hover:bg-[#87CEEB] hover:text-black duration-300 `}
          onClick={() => setTimePeriod("365")}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default LineChart;
