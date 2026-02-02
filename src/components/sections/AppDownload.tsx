'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const AppDownload = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-[#4a90e2] relative overflow-hidden">
      {/* Large Circular Background */}
      <div className="absolute -left-50 top-1/2 -translate-y-1/2 w-125 h-125 bg-[#5ba3ff] rounded-full opacity-40"></div>
      
      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Side */}
          <div className={`relative flex justify-center lg:justify-start ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative w-full max-w-87.5 lg:max-w-125">
              <Image
                src="/Images/Home/app-download-profiel.png"
                alt="Woman with Phone"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className={`text-white ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <p className="text-white/90 font-semibold mb-3 text-sm">Download our app</p>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold mb-4 leading-tight">
              Your Dry Cleaning and Laundry just a few clicks away
            </h2>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#"
                className="flex items-center gap-3 bg-black rounded-lg px-5 py-3 transition-all duration-300 hover:scale-105"
              >
                <FaGooglePlay className="w-7 h-7 text-white" />
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Get it on</p>
                  <p className="font-semibold text-white text-base">Google Play</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 bg-black rounded-lg px-5 py-3 transition-all duration-300 hover:scale-105"
              >
                <FaApple className="w-7 h-7 text-white" />
                <div>
                  <p className="text-[9px] text-gray-400 uppercase">Download on the</p>
                  <p className="font-semibold text-white text-base">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
