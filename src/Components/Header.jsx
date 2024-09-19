import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.svg';
import DrawerList from './DrawerList';
import { useCoins } from '../context/CoinsContext'; 

function Header() {
  const { currency, setCurrency } = useCoins(); 

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className='bg-[#14161A] max-w-[1920px] shadow-lg border-b border-[#14161A] overflow-hidden mx-auto px-5 py-4'>
      <div className='max-w-[1232px] mx-auto'>
        <header className='flex justify-between items-center'>
          <Link to={'/'} className='' >
            <img src={logo} alt="Logo" />
          </Link>
          <div className='flex items-center gap-4'>
            <select
              className="select select-ghost bg-[#14161A] font-roboto font-normal outline-none focus:outline-none focus:border-none text-white"
              value={currency}
              onChange={handleCurrencyChange} 
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </select>
            <DrawerList />
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
