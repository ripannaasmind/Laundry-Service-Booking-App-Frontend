'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks';

const features = [
  {
    id: 1,
    number: '01',
    title: 'Guaranteed Quality',
    description: 'We Stand Behind The Quality Of Our Work. You\'re Completely Satisfied With Our Service, We Will Make It Right. We Stand Behind The Quality Of Our Work.',
  },
  {
    id: 2,
    number: '02',
    title: 'Pro Cleaning Masters',
    description: 'Our Team Of Experts Uses Advanced Cleaning Techniques And Eco-Friendly Products To Give Your Garments A Professional Finish.',
  },
  {
    id: 3,
    number: '03',
    title: 'Green & Safe Cleaning',
    description: 'We Prioritize Your Health And The Environment By Using Eco-Friendly, Non-Toxic Detergents For Every Wash. Our Gentle Yet Effective Cleaning Process Ensures Your Clothes Stay Fresh Without Harsh Chemicals.',
  },
  {
    id: 4,
    number: '04',
    title: 'Timely Service',
    description: 'We Value Your Time As Much As You Do. Our Streamlined Process Ensures Your Laundry Is Picked Up, Cleaned To Perfection, And Delivered Back To Your Doorstep Exactly When Promised. Experience A Fast & Reliable Service',
  },
];

const images = [
  '/Images/Home/why-we-choose-section/img-1.png',
  '/Images/Home/why-we-choose-section/img-2.png',
  '/Images/Home/why-we-choose-section/img-3.png',
  '/Images/Home/why-we-choose-section/img-4.png',

];

const Features = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-14 md:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[#0F7BA0] font-semibold mb-4 text-sm tracking-wide">Why We Choose US</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f2744] mb-5">
            Your Reliable Partner In Success
          </h2>
          <p className="text-[#5a6a7a] max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            We Deliver Exceptional Cleanliness And Guaranteed Satisfaction With Every Service And Our Eco-Friendly
            Products And Highly Trained Professionals Ensure A Safe, Spotless Environment For You And Your Family.
          </p>
        </div>

        {/* Features Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Side - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-block border border-[#d1d9e6] rounded-lg px-4 py-2 mb-4">
                  <span className="text-[#5a6a7a] font-medium">{feature.number}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0f2744] mb-3">{feature.title}</h3>
                <p className="text-[#5a6a7a] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Right Side - Images Grid */}
          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 gap-3">
              {/* Large Image */}
              <div className="row-span-2 relative h-87.5 rounded-2xl overflow-hidden">
                <Image
                  src={images[0]}
                  alt="Laundry Service"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Small Images */}
              <div className="relative h-42.5 rounded-2xl overflow-hidden">
                <Image
                  src={images[1]}
                  alt="Laundry Service"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative row-span-2 h-87.5 rounded-2xl overflow-hidden">
                <Image
                  src={images[2]}
                  alt="Laundry Service"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Bottom Row */}
              <div className="relative h-42.5 rounded-2xl overflow-hidden">
                <Image
                  src={images[3]}
                  alt="Laundry Service"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
