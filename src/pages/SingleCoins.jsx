import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCoins } from '../context/CoinsContext';
import LineChart from '../Components/chartJs/LineChart';
import { LineProvider } from '../context/LineContext';

function SingleCoin() {
  const { id } = useParams();
  const { setCoins, loading, currency, setLoading, setError, error } = useCoins();
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coin data');
        }
        const fetchedCoin = await response.json();
        setCoinData(fetchedCoin);  
        setCoins(fetchedCoin); 
      } catch (err) {
        setError(err.message);
        setCoinData(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id, setLoading, setError, setCoins]);
 
  if (loading) return <p className='mt-[78px] font-bold text-3xl text-white font-montserrat'>Loading...</p>;
  if (error) return <p className='mt-[78px] text-3xl font-medium text-red-500'>Error: {error}</p>;

  if (!coinData) return <div>No data found</div>;

  return (
    <div className="max-w-[1920px] mt-[60px] mx-auto px-5 min-h-screen w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-between gap-10">
      <div className="col-span-1 mt-[25px] flex items-start lg:h-[588px] lg:border-r-2 lg:pr-6 flex-col">
        <div className="flex flex-col items-center w-full">
          <img className='max-w-[200px] max-h-[200px]' src={coinData.image.large} alt={coinData.name} />
          <h2 className="capitalize font-roboto font-bold mb-5 text-5xl text-center text-white">
            {coinData.name}
          </h2>
        </div>
        <p className="line-clamp-3 w-full mb-4 text-white">{coinData.description.en}</p>
        <p className="text-white mb-5">
          <strong>Rank</strong>: {coinData.market_cap_rank}
        </p>
        <p className="text-white">
          <strong>Market Cap</strong>: 
            {currency === 'USD' ? `$ ${coinData.market_data.current_price.usd}` : 
            currency === 'EUR' ? `€ ${coinData.market_data.current_price.eur}` : 
            currency === 'RUB' ? `₽ ${coinData.market_data.current_price.rub}` : coinData.market_data.current_price}M
        </p>
        <p className="text-white">
          <strong>Market Cap:</strong> {coinData.market_cap}
        </p>
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
