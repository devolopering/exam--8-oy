import React, { createContext, useState, useEffect, useContext } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from '../utils';

export const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const storedCoins = getFromLocalStorage('selectedCoins');
    if (storedCoins) {
      setSelectedCoins(storedCoins);
    }
  }, []);

  const toggleCoinSelection = (coin) => {
    const isCoinSelected = selectedCoins.some(selectedCoin => selectedCoin.id === coin.id);

    const updatedSelection = isCoinSelected
      ? selectedCoins.filter(selectedCoin => selectedCoin.id !== coin.id)
      : [...selectedCoins, coin];

    setSelectedCoins(updatedSelection);
    saveToLocalStorage('selectedCoins', updatedSelection);
  };

  return (
    <CoinsContext.Provider value={{ selectedCoins, toggleCoinSelection, currency, setCurrency, coins, setCoins, loading, setLoading, error, setError }}>
      {children}
    </CoinsContext.Provider>
  );
};


export const useCoins = () => useContext(CoinsContext);
