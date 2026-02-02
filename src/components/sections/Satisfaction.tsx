'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks';
import { MdCheck, MdOutlineVerified } from 'react-icons/md';

const Satisfaction = () => {
  const { ref, isVisible } = useScrollAnimation();

  const checklistItems = [
    'Free pickup and delivery service',
    'Custom care for delicate fabrics',
    'Premium quality detergents',
    'Stain removal expertise',
    'On-time delivery guaranteed',
    'Instant Expert Assistance',
  ];

  return (
    <section className="py-20 md:py-28 bg-[#e8eef6]">
      <div className="container-custom" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Image Side */}
          <div className={`relative ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/Images/Home/why-we-choose-section/img-4.png"
                alt="Guaranteed Satisfaction"
                width={600}
                height={550}
                className="w-full h-112.5 lg:h-137.5 object-cover"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <p className="text-[#0F7BA0] font-semibold mb-4 text-sm tracking-wide">Premium Excellence</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f2744] mb-5 leading-tight">
              Flawless Cleaning, Guaranteed Satisfaction
            </h2>
            <p className="text-[#5a6a7a] mb-10 leading-relaxed text-base md:text-lg">
              Experience the best in care with expert service, attention to detail, spotless clean, 
              and lasting freshness in every wash. All premium service always fills our family with confidence.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {checklistItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <MdOutlineVerified className="w-6 h-6 text-[#108A7E] shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[#0f2744] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Satisfaction;
