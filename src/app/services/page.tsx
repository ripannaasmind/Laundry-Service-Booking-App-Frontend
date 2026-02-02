'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { services as allServices } from '@/data';
// import { Header, Footer } from '@/components/layout';

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState<'regular' | 'special'>('regular');
  
  const services = allServices.filter(service => service.category === activeTab);

  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen bg-white pt-20 sm:pt-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f2744] mb-3 sm:mb-4">
              Available Services
            </h1>
            <p className="text-xs sm:text-sm text-[#5a6a7a] max-w-2xl mx-auto">
              Leather, Wool/yarn, Suede, Velvet/yet, Casper, Flannel<br className="hidden sm:block" />
              Choose from our professional laundry services. Each service is performed to a high standard with close attention to detail.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('regular')}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'regular'
                    ? 'bg-[#0F7BA0] text-white shadow-md'
                    : 'text-[#5a6a7a] hover:text-[#0f2744]'
                }`}
              >
                Regular Services
              </button>
              <button
                onClick={() => setActiveTab('special')}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'special'
                    ? 'bg-[#0F7BA0] text-white shadow-md'
                    : 'text-[#5a6a7a] hover:text-[#0f2744]'
                }`}
              >
                Special Services
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up relative"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Best Seller Badge */}
                {service.bestSeller && (
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#0f2744] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                    Best Seller
                  </span>
                )}

                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-gray-50 flex items-center justify-center mb-4 sm:mb-5">
                  {service.icon && (
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={60}
                      height={60}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                    />
                  )}
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0f2744] mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-[#5a6a7a] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-3">
                  {service.description}
                </p>

                {/* Price and Duration */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="text-[#0f2744] font-bold text-sm sm:text-base">
                    {service.priceRange}
                  </span>
                  <span className="text-[#5a6a7a] text-xs sm:text-sm">
                    {service.duration}
                  </span>
                </div>

                {/* Button */}
                <Link
                  href={`/services/${service.slug}`}
                  className="block w-full bg-[#0F7BA0] text-white text-center py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:bg-[#0d6a8a] hover:shadow-md"
                >
                  Get The Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default ServicesPage;
