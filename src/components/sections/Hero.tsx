'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoChevronDown } from 'react-icons/io5';
import { useTheme } from '@/context';

const Hero = () => {
  const { t } = useTheme();
  const [location, setLocation] = useState('');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f0f4f8]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Images/Home/Hero.png"
          alt="Laundry Background"
          fill
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/35 via-white/10 to-transparent"></div>
      </div>

      {/* Content */} <div className="w-full max-w-325 mx-auto relative z-10 pt-32 pb-20 px-4 ">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0f2744] mb-6 leading-[1.1] animate-fade-in-up" style={{ fontFamily: 'DM Serif Display, serif' }}>
            {t('heroTitle1')}
            <br />
            {t('heroTitle2')}
          </h1>
          
          <p className="text-[#4a5568] text-lg md:text-xl mb-10 animate-fade-in-up animation-delay-200 max-w-2xl">
            {t('heroSubtitle')}
          </p>

          {/* Location Dropdown & Button */}
          <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl animate-fade-in-up animation-delay-300">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg text-[#4a5568] appearance-none cursor-pointer focus:outline-none focus:border-[#0f2744] transition-colors"
                >
                  <option value="">{t('selectLocation')}</option>
                  <option value="downtown">Downtown</option>
                  <option value="uptown">Uptown</option>
                  <option value="suburbs">Suburbs</option>
                </select>
                <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <button className="bg-[#0f2744] text-white px-16 py-2 rounded font-semibold transition-all duration-300 hover:bg-[#1a3a5c] hover:shadow-lg hover:-translate-y-0.5">
                {t('bookNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default Hero;
