import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCoins } from '../context/CoinsContext';
import LineChart from '../Components/chartJs/LineChart';
import { LineProvider } from '../context/LineContext';

function SingleCoin() {
  const { id } = useParams();
  const { coins, setCoins, loading, currency, setLoading, error, setError } = useCoins();
  
  useEffect(() => {
    async function fetchCoin() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coin data');
        }
        const fetchedCoin = await response.json();
        setCoins(fetchedCoin);  
      } catch (err) {
        setError(err.message);
        setCoins(null); 
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [id]);
 
  if (loading) return <p className='mt-[78px] font-bold text-3xl text-white font-montserrat'>Loading...</p>;
  if (error) return <p className='mt-[78px] text-3xl font-medium text-red-500'>Error:{error}</p>;

  if (!coins) return <div>No data found</div>;

  return (
    <div className="max-w-[1920px] mt-[60px] mx-auto px-5 min-h-screen w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-between gap-10">
      <div className="col-span-1 mt-[25px] flex items-start lg:h-[588px] lg:border-r-2 lg:pr-6 flex-col">
        <div className="flex flex-col items-center w-full">
          <img className='max-w-[200px] max-h-[200px]' src={coins.image.large} alt={coins.name} />
          <h2 className="capitalize font-roboto font-bold mb-5 text-5xl text-center text-white">
            {coins.name}
          </h2>
        </div>
        <p className="line-clamp-3 w-full mb-4 text-white">{coins.description.en}</p>
        <p className="text-white mb-5">
          <strong>Rank</strong>: {coins.market_cap_rank}
        </p>
        <p className="text-white">
          <strong>Market Cap</strong>: 
            {currency === 'USD' ? ` $ ${coins.market_data.current_price.usd}` : 
            currency === 'EUR' ? ` € ${coins.market_data.current_price.eur}` : 
            currency === 'RUB' ? ` ₽ ${coins.market_data.current_price.rub}` : coins.market_data.current_price}M
        </p>
        <p>{coins.market_cap}</p>
      </div>
      <LineProvider>
        <div className="col-span-2 lg:mt-[65px] w-full">
          <LineChart />
        </div>
      </LineProvider>
    </div>
  );
}

export default SingleCoin;
