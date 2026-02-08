'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks';
import { useTheme } from '@/context';
import api from '@/services/api';

interface ServiceData {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: string;
  pricePerKg: number;
  pricePerItem: number;
  pricingType: string;
}

const Services = () => {
  const { t } = useTheme();
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [services, setServices] = useState<ServiceData[]>([]);

  // Fetch services from backend API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data?.status === 'success' && res.data?.data) {
          setServices(res.data.data);
        }
      } catch {
        // Fallback to empty - cards won't show
        console.error('Failed to fetch services');
      }
    };
    fetchServices();
  }, []);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, services.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, maxIndex, currentIndex]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#e8eef6]">
      <div className="container-custom px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[#0F7BA0] font-semibold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm tracking-wide">{t('ourServices')}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold text-[#0f2744] mb-3 sm:mb-4 md:mb-5 px-4">
            {t('servicesTitle')}
          </h2>
          <p className="text-[#5a6a7a] max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
            {t('servicesSubtitle')}
          </p>
        </div>

        {/* Custom Slider */}
        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden select-none" ref={sliderRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div
              className="flex transition-transform duration-500 py-2 sm:py-3 md:py-4 ease-out gap-3 sm:gap-4 md:gap-5 lg:gap-6"
              style={{ 
                transform: `translateX(calc(-${currentIndex} * (${
                  typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' :
                  typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 
                  typeof window !== 'undefined' && window.innerWidth < 1024 ? '50%' : '25%'
                } + ${typeof window !== 'undefined' && window.innerWidth < 640 ? '12px' :
                  typeof window !== 'undefined' && window.innerWidth < 768 ? '16px' : 
                  typeof window !== 'undefined' && window.innerWidth < 1024 ? '20px' : '24px'})))`
              }}
            >
              {services.map((service, index) => (
                <div
                  key={service._id}
                  className={`shrink-0 bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col w-full sm:w-full md:w-[calc(50%-10px)] lg:w-[calc(25%-18px)] ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms` 
                  }}
                >
                  {/* Image */}
                  <div className="h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-white overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl hover:rounded-none transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col grow">
                    <div className="flex items-center justify-between mb-2 md:mb-3 gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0f2744] truncate">{service.name}</h3>
                      <span className="text-[#0f2744] font-bold text-sm sm:text-base md:text-lg shrink-0">
                        ${service.pricingType === 'per_kg' ? service.pricePerKg : service.pricePerItem}
                      </span>
                    </div>
                    <p className="text-[#5a6a7a] text-xs sm:text-sm mb-3 sm:mb-4 md:mb-5 leading-relaxed grow">{service.shortDescription}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full block text-center bg-[#0f2744] text-white py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-[#1a3a5c] hover:shadow-lg mt-auto"
                    >
                      {t('getTheService')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 md:mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-[#0f2744] w-5 sm:w-5.5 md:w-6' : 'bg-[#c5d0dc] w-2 sm:w-2.5 md:w-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
