import { Carousel, Flowbite } from "flowbite-react";
import { getFromLocalStorage } from "../utils";
import { useCoins } from '../context/CoinsContext';



const NumArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

function CoinsCarousel() {
  const { currency } = useCoins(); 

  
  const coins = getFromLocalStorage('selectedCoins') || [];
  const coinsNum = NumArray(coins, 4);

  
  const customTheme = {
    control: {
      base: "hidden",
    },
  };

  return (
    <div>
      <div className="relative h-56 sm:h-64 xl:h-80 2xl:h-96 max-w-[1232px] mx-auto">
        <Carousel indicators={false} theme={customTheme}>
          {coinsNum.map((coinsGroup, index) => (
            <div key={index} className="flex justify-around space-x-4">
              {coinsGroup.map((coin) => (
                <div key={coin.id} className="flex flex-col items-center w-1/4 p-2">
                  <img
                    src={coin.image}
                    alt={coin.name} 
                    className="w-20 h-20 object-cover"
                  />
                  <p className="mt-2 text-base font-medium flex items-center font-roboto gap-3">
                    {coin.name}
                    <span className={` ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-[#0ECB81]'}`}>
                    {coin.price_change_percentage_24h < 0 ?
                        `${coin.price_change_percentage_24h.toFixed(2)}%` :
                        `+${coin.price_change_percentage_24h.toFixed(2)}%`}
                    </span>
                  
                  </p>
                  <p className="mt-1 text-[21px] text-white font-medium font-roboto">
                        {currency === 'USD' ? `$ ${coin.current_price}` : 
                         currency === 'EUR' ? `€ ${coin.current_price} `: 
                         currency === 'CAD' ? `C$ ${coin.current_price}` : coin.current_price}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CoinsCarousel;
