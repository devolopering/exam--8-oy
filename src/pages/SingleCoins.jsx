import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCoins } from '../context/CoinsContext';
import LineChart from '../Components/chartJs/LineChart';
import { LineProvider } from '../context/LineContext';

function SingleCoin() {
  const { id } = useParams();
  console.log(id)
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
        console.log(fetchedCoin)
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
  console.log(coins)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!coins) return <div>No data found</div>;

  return (
    <div className=' min-h-screen font-montserrat max-w-[1920px] mx-auto px-5 '>
      <div className='grid grid-cols-3 gap-10'>
        <div className=' col-span-1  mt-[25px] flex items-start border-r-2  flex-col '>
        <img src={coins.image.large} alt={coins.name} />
      <h2 className='capitalize font-roboto font-bold text-5xl text-center text-white  '>{coins.name}</h2>
      <p className='line-clamp-2 w-full'> {coins.description.en}</p>
      <p className='text-white'><strong>Rank</strong>: {coins.market_cap_rank}</p>

      <p className='text-white '><strong>Market Cap</strong>:
         {currency === 'USD' ? `$ ${coins.market_data.current_price.usd}` : 
          currency === 'EUR' ? `€ ${coins.market_data.current_price.eur} `: 
          currency === 'CAD' ? `C$ ${coins.market_data.current_price.cad}` : coins.market_data.current_price}M</p>
          <p>{coins.market_cap}</p>
        </div>
          <LineProvider>
          <div className='col-span-2 mt-[65px]'>
          <LineChart/>
          </div> 
          </LineProvider>
         
       
      </div>
      
    </div>
  );
}

export default SingleCoin;
