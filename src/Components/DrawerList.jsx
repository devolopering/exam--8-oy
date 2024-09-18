import { Button, Drawer, Flowbite } from "flowbite-react";
import { useContext, useState } from "react";
import { CoinsContext } from "../context/CoinsContext";
import { useCoins } from '../context/CoinsContext';


function DrawerList() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCoins, toggleCoinSelection, currency } = useCoins();

  const handleClose = () => setIsOpen(false);

  const removeCoin = (coinId) => {
    toggleCoinSelection({ id: coinId });
  };

  const customTheme = {
    drawer: {
      root: {
        base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-[#515151]",
        backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
        position: {
          right: {
            on: "right-0 top-0 h-screen w-[500px] transform-none",
            off: "right-0 top-0 h-screen w-[500px] translate-x-full",
          },
        },
      },
    },
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border border-gray-300 bg-[#515151] px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-[#515151] enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-[#515151] dark:text-gray-400 enabled:dark:hover:bg-[#515151] enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg border border-gray-300 bg-[#515151] px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-[#515151] enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-[#515151] dark:text-gray-400 enabled:dark:hover:bg-[#515151] enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-[#515151] py-2 leading-tight text-gray-500 enabled:hover:bg-[#515151] enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-[#515151] dark:text-gray-400 enabled:dark:hover:bg-[#515151] enabled:dark:hover:text-white",
        active: "bg-cyan-50 text-cyan-600 hover:bg-[#515151] hover:text-cyan-700 dark:border-gray-700 dark:bg-[#515151] dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Button className="bg-[#87CEEB] font-roboto font-medium text-sm" onClick={() => setIsOpen(true)}>WATCH LIST</Button>
      </div>

      <Flowbite theme={{ theme: customTheme }}>
        <Drawer
        theme={customTheme}
          open={isOpen}
          onClose={handleClose}
          position="right"
          className="transition-transform duration-300 bg-[#515151]"
        >
          <div className="p-4">
            <div className="mb-5">
              <h2 className="text-3xl font-medium text-center text-white font-roboto">WATCHLIST</h2>
            </div>

            <ul className="grid grid-cols-2 gap-10">
              {selectedCoins.length > 0 ? (
                selectedCoins.map(coin => (
                  <li key={coin.id} className="flex flex-col items-center justify-center mb-4 bg-[#14161A] rounded-[25px] p-4">
                    <img src={coin.image} alt={coin.name} className="w-[118px] h-[118px] mb-4" />
                    <p className="text-gray-300 text-center mb-2">
                        {currency === 'USD' ? `$ ${coin.current_price}` : 
                         currency === 'EUR' ? `€ ${coin.current_price} `: 
                         currency === 'CAD' ? `C$ ${coin.current_price}` : coin.current_price}
                    </p>
                    <button
                      onClick={() => removeCoin(coin.id)}
                      className="px-4 py-1 bg-red-600 text-white rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-white text-center">No coins in your watchlist.</p>
              )}
            </ul>
          </div>
        </Drawer>
      </Flowbite>
    </div>
  );
}

export default DrawerList;
