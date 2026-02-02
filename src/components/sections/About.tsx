'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks';
import { MdVerifiedUser, MdCheckCircle } from 'react-icons/md';

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container-custom" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className={`relative ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/Images/Home/about-section.png"
                alt="Professional Laundry Team"
                width={700}
                height={550}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <p className="text-[#0F7BA0] font-semibold mb-4 text-sm tracking-wide">About Ultra Wash</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f2744] mb-6 leading-tight">
              Luxury Cleaning, Effortless Shine
            </h2>
            <p className="text-[#5a6a7a] mb-4 leading-relaxed text-base">
              Experience more than just clean. Ultra Wash brings luxury, comfort, and
              precision to your space, ensuring a spotless finish in every corner.
            </p>
            <p className="text-[#5a6a7a] mb-8 leading-relaxed text-base">
              Transform your space with Ultra Wash. Our dedicated team provides eco-
              friendly, stress-free cleaning for homes and offices, ensuring a spotless finish
              every time.
            </p>

            {/* Features Box */}
            <div className="bg-[#e6f7f2] rounded-xl p-6 border-l-4 border-[#14b8a6]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <MdVerifiedUser className="w-5 h-5 text-[#14b8a6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f2744] mb-1">Experienced & Trained</h4>
                    <p className="text-[#5a6a7a] text-sm leading-relaxed">
                      Our verified experts guarantee top-tier service and total peace of mind.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <MdCheckCircle className="w-5 h-5 text-[#14b8a6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f2744] mb-1">Eco-Friendly & Safe</h4>
                    <p className="text-[#5a6a7a] text-sm leading-relaxed">
                      Purely plant-based and biodegradable solutions for a healthier home and a safer world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
