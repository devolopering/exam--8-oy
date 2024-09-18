import React, { useEffect, useState } from 'react';
import { useCoins } from '../context/CoinsContext';
import HeroSection from '../Components/HeroSection';
import { Flowbite, Table, Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Coins() {
  const { selectedCoins, toggleCoinSelection, currency,  coins, setCoins, loading, setLoading, error, setError } = useCoins(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [searchCoin, setSearchCoin] = useState('');

  const fetchCoins = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      if (!response.ok) {
        throw new Error('Fetched Coins Error!');
      }
      const fetchedCoins = await response.json();
      setCoins(fetchedCoins);
      setTotalPages(Math.ceil(100 / 10));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins(currentPage);
  }, [currentPage, currency]); 

  const onPageChange = (page) => setCurrentPage(page);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

 

  const customTheme = {
    table: {
      row: {
        base: "group/row",
        hovered: "hover:bg-transparent",
        striped: "odd:bg-transparent even:bg-transparent",
      },
      head: {
        base: "group/head text-xs uppercase text-gray-700 dark:text-[#87CEEB]",
        cell: {
          base: "bg-[#2d85a8] text-black px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg "
        }
      },
      selector: {
        base: "w-10 h-10 border-b-2 border-gray-700  dark:border-gray-700 ",
        active: " dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        disabled: "cursor-not-allowed opacity-50"
      }
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-full border-none bg-transparent px-3 py-3 mt-2 leading-tighttext-[#87CEEB] enabled:hover:bg-transparent enabled:hover:hover:text-[#87CEEB] dark:border-gray-700 dark:bg-transparent dark:text-[#87CEEB] enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5"
      },
      next: {
        base: "rounded-full border-none bg-transparent px-3 py-3 mt-2 leading-tighttext-[#87CEEB] enabled:hover:bg-transparent enabled:hover:hover:text-[#87CEEB] dark:border-gray-700 dark:bg-transparent dark:text-[#87CEEB] enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5"
      },
      selector: {
        base: "w-10 h-10 border-none rounded-full mt-2 bg-transparent py-2 leading-tight text-[#87CEEB] enabled:hover:bg-transparent enabled:hover:text-[#87CEEB] dark:border-gray-700 dark:bg-transparent dark:text-[#87CEEB] enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        active: "bg-[#FFFFFF29] text-cyan-600 mt-2 hover:bg-[#FFFFFF29] hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        disabled: "cursor-not-allowed opacity-50"
      }
    }
  };

  const filteredCoins = coins.filter((coin) => 
  coin.name.toLowerCase().includes(searchCoin.toLowerCase()) || 
  coin.symbol.toLowerCase().includes(searchCoin.toLowerCase())
);

  return (
    <div className="bg-[#14161A] max-w-[1920px] mx-auto">
      <HeroSection />

      <Flowbite theme={{ theme: customTheme }}  >

        <div className="max-w-[1280px] mx-auto mt-4 px-6">
        <h3 className='font-roboto font-normal  text-white mt-[18px] mb-3 text-[34px] text-center'>Cryptocurrency Prices by Market Cap</h3>
        <input
        value={searchCoin}
        onChange={(e) => setSearchCoin(e.target.value)}
        type="text"
        placeholder="Search For a Crypto Currency.."
        className="input w-full border-slate-500 mb-5 rounded-[5px]"
      />
          <Table striped className='border-b border-gray-600'>
            <Table.Head className="bg-[#2d85a8] font-montserrat font-bold text-sm px-4 py-5">
              <Table.HeadCell>Coin</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>24h Change</Table.HeadCell>
              <Table.HeadCell>Market Cap</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y font-roboto">
              {filteredCoins.map((coin) => (
                <Table.Row key={coin.id} className="dark:bg-transparent dark:border-gray-700">
                  <Table.Cell className="flex items-center gap-4 text-gray-900 dark:text-white">
                    <img className="w-[50px] h-[50px]" src={coin.image} alt={coin.name} />
                    <Link to={`/coins/${coin.id}`} className="uppercase whitespace-nowrap font-normal text-[22px] flex flex-col items-start">
                      {coin.symbol}
                      <span className="text-sm font-normal text-[#A9A9A9] mt-1 capitalize ">{coin.name}</span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                  <Table.Cell className='text-white'>
                        {currency === 'USD' ? `$ ${coin.current_price}` : 
                         currency === 'EUR' ? `€ ${coin.current_price} `: 
                         currency === 'CAD' ? `C$ ${coin.current_price}` : coin.current_price}
                   </Table.Cell>
                 </Table.Cell>
                  <Table.Cell>
                    <div  className="flex items-center gap-4  ">
                    <IoEyeSharp
                      className={`cursor-pointer text-2xl ${selectedCoins.some(selectedCoin => selectedCoin.id === coin.id) ? 'text-green-500' : 'text-white'}`}
                      onClick={() => toggleCoinSelection(coin)}
                    />
                    <span className={` ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {coin.price_change_percentage_24h < 0 ?
                        `${coin.price_change_percentage_24h.toFixed(2)}%` :
                        `+${coin.price_change_percentage_24h.toFixed(2)}%`}
                    </span>
                    </div>
                   
                  </Table.Cell>
                  <Table.Cell className='text-white'>${coin.market_cap}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="flex overflow-x-auto sm:justify-center mt-4 pb-5">
          <Pagination theme={customTheme} className="bg-transparent border-none mt-2"
             currentPage={currentPage}
             totalPages={totalPages} 
             onPageChange={onPageChange}
             previousLabel={<FaChevronLeft />}
             nextLabel={<FaChevronRight />}
              />
        </div>
      </Flowbite>
    </div>
  );
}
