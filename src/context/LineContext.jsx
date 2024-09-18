
import React, { createContext, useContext, useState, useEffect } from 'react';

const LineContext = createContext();


export const useLineData = () => {
  return useContext(LineContext);
};


export const LineProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchCoinData = async (timePeriod) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${timePeriod}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coin data");
      }

      const data = await response.json();
      const formattedData = {
        labels: data.prices.map(([timestamp]) =>
          new Date(timestamp).toLocaleDateString()
        ),
        datasets: [
          {
            label: `Price over ${timePeriod} days`,
            data: data.prices.map(([, price]) => price),
            fill: false,
            tension: 0.3,
            borderColor: "#42a5f5",
            backgroundColor: "#90caf9",
          },
        ],
      };
      setChartData(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Provide data and fetch function to children
  return (
    <LineContext.Provider value={{ chartData, fetchCoinData, loading, error }}>
      {children}
    </LineContext.Provider>
  );
};
