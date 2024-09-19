import React from 'react';
import Hero from '/hero.jpg'; // import qilgan rasm
import CoinsCarousel from './CoinsCarusel';

function HeroSection() {
  return (
    <div 
      style={{ backgroundImage: `url(${Hero})` }} 
      className='max-w-[1920px]  bg-cover bg-center mx-auto'
    >
      <h1 className='text-6xl text-[#87CEEB] font-bold text-center pt-[54px] pb-4'>CRYPTOFOLIO WATCH LIST</h1>
      <p className='text-sm font-medium text-[#A9A9A9] text-center'>Get all the Info regarding your favorite Crypto Currency</p>
  <CoinsCarousel/>
    </div>
  );
}

export default HeroSection;
