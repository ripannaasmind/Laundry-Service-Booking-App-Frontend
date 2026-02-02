'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks';
import { IoChevronDown } from 'react-icons/io5';

const faqs = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer: 'We offer a comprehensive range of laundry services including wash & fold, dry cleaning, ironing & pressing, stain removal, and specialty item care. Our expert team handles everything from everyday clothing to delicate fabrics and formal wear.',
  },
  {
    id: 2,
    question: 'How does pickup and delivery work?',
    answer: 'Simply schedule a pickup through our app or website. Our driver will arrive at your location, collect your laundry, and deliver it back to you fresh and clean within 24-48 hours. We offer flexible time slots to fit your schedule.',
  },
  {
    id: 3,
    question: 'What are your turnaround times?',
    answer: 'Standard service is 24-48 hours. We also offer express same-day service for urgent needs. Rush orders placed before 10 AM can be ready by 6 PM the same day.',
  },
  {
    id: 4,
    question: 'How do you handle delicate items?',
    answer: 'Delicate items receive special attention from our expert team. We use gentle, eco-friendly detergents and follow care label instructions carefully. Items like silk, wool, and cashmere are hand-processed when needed.',
  },
  {
    id: 5,
    question: 'What is your pricing structure?',
    answer: 'Our pricing is transparent and competitive. Wash & fold starts at $2.50/lb, dry cleaning from $8/item. We offer subscription plans with significant discounts for regular customers.',
  },
];

const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-14 md:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[#0F7BA0] font-semibold mb-3 text-sm">FAQ</p>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0f2744] mb-4">
            Frequently Ask Question
          </h2>
          <p className="text-[#5a6a7a] max-w-2xl mx-auto text-base leading-relaxed">
            Some frequently asked questions and answers below
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-300"
              >
                <span className="font-semibold text-[#0f2744] pr-4 text-[15px]">{faq.question}</span>
                <div
                  className={`transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <IoChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 pt-0 bg-gray-50">
                  <p className="text-[#5a6a7a] text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
