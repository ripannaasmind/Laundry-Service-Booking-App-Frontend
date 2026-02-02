'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks';
import { MdCalendarMonth } from 'react-icons/md';
import { IoSparkles } from 'react-icons/io5';
import { PiHandHeartFill } from 'react-icons/pi';

const steps = [
  {
    id: 1,
    title: 'Book Your Service',
    description: 'Choose your desired cleaning service, date, and time through our easy online booking form.',
    icon: <MdCalendarMonth className="w-7 h-7 text-white" />,
    image: '/Images/Home/how-it-works-section/how-it-work.png',
  },
  {
    id: 2,
    title: 'Clean With Care',
    description: 'Our professional team arrives on time and performs a detailed, high-quality cleaning tailored to your needs.',
    icon: <PiHandHeartFill  className="w-7 h-7 text-white" />,
    image: '/Images/Home/how-it-works-section/how-it-work (2).png',
  },
  {
    id: 3,
    title: 'Enjoy The Shine',
    description: 'Relax and enjoy your spotless, fresh, and sparkling space the Lavisha way.',
    icon: <IoSparkles className="w-7 h-7 text-white" />,
    image: '/Images/Home/how-it-works-section/how-it-wok.png',
  },
];

const CleaningJourney = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-[#e8eef6]">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-14 md:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[#0F7BA0] font-semibold mb-4 text-sm tracking-wide">How it Works</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f2744] mb-5">
            The Cleaning Journey
          </h2>
          <p className="text-[#5a6a7a] max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Experience the gold standard of cleanliness. We bring luxury and precision into your home and
            office through expert techniques and eco-friendly solutions. Our mission is to transform your space
            into a spotless sanctuary, giving you the peace of mind and comfort you deserve.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-70 md:h-80 rounded-3xl overflow-hidden mb-6">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Icon Circle */}
              <div className="flex justify-center -mt-12 mb-4 relative z-10">
                <div className="w-16 h-16 bg-[#0f2744] rounded-full flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="text-center px-4">
                <h3 className="text-xl font-bold text-[#0f2744] mb-3">{step.title}</h3>
                <p className="text-[#5a6a7a] text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleaningJourney;
