'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/services/api';

interface ServiceItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  pricePerKg: number;
  pricePerItem: number;
  pricingType: string;
  estimatedDays: number;
  features: string[];
  isActive: boolean;
}

const categoryTabs = [
  { key: 'all', label: 'All Services' },
  { key: 'washing', label: 'Washing' },
  { key: 'dry_cleaning', label: 'Dry Cleaning' },
  { key: 'ironing', label: 'Ironing' },
  { key: 'premium', label: 'Premium' },
  { key: 'specialty', label: 'Specialty' },
];

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [allServices, setAllServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data?.status === 'success' && res.data?.data) {
          setAllServices(res.data.data);
        }
      } catch {
        console.error('Failed to fetch services');
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Update the sliding indicator position
  const updateIndicator = useCallback(() => {
    const activeIndex = categoryTabs.findIndex(t => t.key === activeTab);
    const activeEl = tabsRef.current[activeIndex];
    if (activeEl) {
      const parent = activeEl.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: elRect.left - parentRect.left,
          width: elRect.width,
        });
      }
    }
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleTabChange = (key: string) => {
    if (key === activeTab) return;
    setIsTransitioning(true);
    // Short fade-out, then switch
    setTimeout(() => {
      setActiveTab(key);
      // Fade back in after state updates
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const services = activeTab === 'all'
    ? allServices
    : allServices.filter(service => service.category === activeTab);

  const getPrice = (service: ServiceItem) => {
    if (service.pricingType === 'per_kg') return `From $${service.pricePerKg}/kg`;
    if (service.pricePerItem > 0) return `From $${service.pricePerItem}`;
    return 'Get Quote';
  };

  return (
    <>
      <main className="min-h-screen bg-white pt-20 sm:pt-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f2744] mb-3 sm:mb-4">
              Available Services
            </h1>
            <p className="text-xs sm:text-sm text-[#5a6a7a] max-w-2xl mx-auto">
              Choose from our professional laundry services. Each service is performed to a high standard with close attention to detail.
            </p>
          </div>

          {/* Smooth Animated Tabs */}
          <div className="flex justify-center mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="relative inline-flex flex-wrap justify-center bg-gray-100 rounded-xl p-1.5 gap-1">
              {/* Sliding indicator */}
              <div
                className="absolute top-1.5 h-[calc(100%-12px)] bg-[#0F7BA0] rounded-lg shadow-lg transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
              {categoryTabs.map((tab, index) => (
                <button
                  key={tab.key}
                  ref={(el) => { tabsRef.current[index] = el; }}
                  onClick={() => handleTabChange(tab.key)}
                  className={`relative z-10 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    activeTab === tab.key
                      ? 'text-white'
                      : 'text-[#5a6a7a] hover:text-[#0f2744]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0F7BA0]"></div>
            </div>
          )}

          {/* Services Grid with smooth transition */}
          {!isLoading && (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-all duration-300 ease-out ${
                isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {services.map((service, index) => (
                <div
                  key={service._id}
                  className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative group"
                  style={{
                    animation: !isTransitioning ? `fadeInUp 0.4s ease-out ${index * 80}ms both` : 'none',
                  }}
                >
                  {/* Image */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-gray-50 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-[#0F7BA0]/5 transition-colors duration-300">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={60}
                      height={60}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                    />
                  </div>

                  {/* Category badge */}
                  <span className="inline-block text-[10px] sm:text-xs bg-[#0F7BA0]/10 text-[#0F7BA0] font-medium px-2 py-0.5 rounded-full mb-2 capitalize">
                    {service.category.replace('_', ' ')}
                  </span>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0f2744] mb-2 sm:mb-3">
                    {service.name}
                  </h3>
                  <p className="text-[#5a6a7a] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-3">
                    {service.shortDescription || service.description}
                  </p>

                  {/* Price and Duration */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="text-[#0f2744] font-bold text-sm sm:text-base">
                      {getPrice(service)}
                    </span>
                    <span className="text-[#5a6a7a] text-xs sm:text-sm flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {service.estimatedDays} day{service.estimatedDays > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Features */}
                  {service.features?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-[#5a6a7a] px-2 py-0.5 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

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
          )}

          {/* Empty state */}
          {!isLoading && services.length === 0 && !isTransitioning && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <p className="text-[#5a6a7a] font-medium">No services found in this category.</p>
              <p className="text-[#5a6a7a] text-sm mt-1">Try selecting a different category above.</p>
            </div>
          )}
        </div>
      </main>

      {/* Keyframe animation for staggered card entry */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default ServicesPage;
