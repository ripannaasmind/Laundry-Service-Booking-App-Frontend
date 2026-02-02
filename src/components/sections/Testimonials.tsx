'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks';
import { FaStar } from 'react-icons/fa';
import { RiDoubleQuotesL } from 'react-icons/ri';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'CEO at Headquarter of ABC info',
    rating: 5,
    content: 'Absolutely life-saving! Their timely service and attention to fabric care mean I never have to worry about my work wardrobe again. Highly recommended!',
    image: '/Images/Home/location-section/location-2.png',
  },
  {
    id: 2,
    name: 'Mr. John Smith',
    role: 'CEO Company',
    rating: 4,
    content: 'Absolutely life-saving! Their timely service and attention to fabric care mean I never have to worry about my work wardrobe again. Highly recommended!',
    image: '/Images/Home/location-section/location-3.png',
  },
  {
    id: 3,
    name: 'Jennifer Brown',
    role: 'Business Owner',
    rating: 5,
    content: 'Absolutely love this service! My clothes have never looked better. The pickup and delivery are always on time.',
    image: '/Images/Home/location-section/location-2.png',
  },
  {
    id: 4,
    name: 'Michael Chen',
    role: 'Software Engineer',
    rating: 5,
    content: 'The best laundry service I have ever used. Convenient, affordable, and the quality is exceptional.',
    image: '/Images/Home/location-section/location-3.png',
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-10 md:py-10 bg-linear-to-br from-[#1e3a5f] via-[#2c5282] to-[#1e3a5f] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content Side */}
          <div className={`text-white ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <p className="text-white font-semibold mb-3 text-xs lg:text-sm tracking-wide">Client Review</p>
            <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold mb-4 leading-tight">
              Trusted By Thousands, Loved By Many Clients
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed text-sm lg:text-base">
              Join thousands of happy customers who trust us every day for our premium quality, reliability, and care for their favorite garments.
            </p>

            {/* Testimonial Slider */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full shrink-0"
                    >
                      <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                        <RiDoubleQuotesL className="w-10 h-10 lg:w-12 lg:h-12 text-[#60a5fa] mb-3" />
                        <p className="text-[#5a6a7a] text-sm lg:text-base leading-relaxed mb-4">
                          {testimonial.content}
                        </p>
                        <div className="flex mb-3 gap-1">{renderStars(testimonial.rating)}</div>
                        <div className="flex items-center gap-3">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-[#60a5fa]"
                          />
                          <div>
                            <h4 className="font-bold text-[#0f2744] text-base lg:text-lg">{testimonial.name}</h4>
                            <p className="text-[#5a6a7a] text-xs lg:text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/Images/client-section.png"
                alt="Delivery Person"
                width={600}
                height={565}
                className="w-full h-[450px] lg:h-[550px] object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
