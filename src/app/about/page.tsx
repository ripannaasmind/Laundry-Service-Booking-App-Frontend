'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle, FiUsers, FiHeart, FiTarget, FiTrendingUp } from 'react-icons/fi';

const AboutPage = () => {
  const values = [
    {
      icon: <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'Quality First',
      description: 'We never compromise on quality. Every garment receives premium care and attention to detail.',
    },
    {
      icon: <FiUsers className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We listen, adapt, and deliver exceptional service every time.',
    },
    {
      icon: <FiHeart className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'Eco-Friendly',
      description: 'We use environmentally safe products and sustainable practices to protect our planet.',
    },
    {
      icon: <FiTarget className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: 'Reliability',
      description: 'Count on us for timely service and consistent results. We respect your time and schedule.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '50K+', label: 'Garments Cleaned' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      description: 'With 20 years in the industry, Sarah founded CleanPress to revolutionize laundry services.',
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      description: 'Michael ensures every operation runs smoothly and efficiently across all locations.',
    },
    {
      name: 'Emily Davis',
      role: 'Customer Experience Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      description: 'Emily leads our customer service team with passion and dedication to excellence.',
    },
  ];

  return (
    <>

      <main className="min-h-screen bg-white pt-20 sm:pt-24 mb-10">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-[#0F2744] via-[#1a3a5c] to-[#0F2744] text-white py-16 sm:py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDhoLTJ2LTJoMnYyem0tNCA0aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptLTQgNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bS00IDRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          </div>
          <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                About CleanPress Laundry
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
                Your trusted partner for premium laundry and dry cleaning services since 2010. We&apos;re committed to delivering excellence with every garment we handle.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F7BA0] mb-2 sm:mb-3">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F2744] mb-4 sm:mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2010, CleanPress Laundry began with a simple mission: to provide the highest quality laundry and dry cleaning services with unmatched customer care. What started as a small neighborhood laundromat has grown into a trusted name serving thousands of satisfied customers.
                  </p>
                  <p>
                    Our founder, Sarah Johnson, recognized the need for a laundry service that combines traditional craftsmanship with modern technology. With over 20 years of experience in the textile care industry, she assembled a team of skilled professionals who share her passion for excellence.
                  </p>
                  <p>
                    Today, we operate multiple locations across the city, offering convenient pickup and delivery services, state-of-the-art cleaning technology, and eco-friendly practices. But one thing hasn&apos;t changed: our commitment to treating every garment as if it were our own.
                  </p>
                </div>
              </div>
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-full min-h-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <Image
                  src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=1000&fit=crop"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F2744] mb-4 sm:mb-6">
                Our Core Values
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                These principles guide everything we do and shape our commitment to you
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#0F7BA0]/10 rounded-full text-[#0F7BA0] mb-4 sm:mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F2744] mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-linear-to-br from-[#0F2744] to-[#1a3a5c] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white animate-fade-in-up">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <FiTarget className="w-10 h-10 sm:w-12 sm:h-12" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Our Mission</h2>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
                  To provide exceptional laundry and dry cleaning services that exceed customer expectations while maintaining the highest standards of quality, reliability, and environmental responsibility. We strive to make laundry care convenient, affordable, and stress-free for every customer.
                </p>
              </div>
              <div className="bg-linear-to-br from-[#0F7BA0] to-[#0d6a8a] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <FiTrendingUp className="w-10 h-10 sm:w-12 sm:h-12" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Our Vision</h2>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed">
                  To become the most trusted and innovative laundry service provider in the region, setting new standards for quality and customer satisfaction. We envision a future where professional garment care is accessible to everyone, combining cutting-edge technology with traditional craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F2744] mb-4 sm:mb-6">
                Meet Our Leadership Team
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Passionate professionals dedicated to delivering excellence
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 sm:h-72 md:h-80">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F2744] mb-1 sm:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base text-[#0F7BA0] font-semibold mb-3 sm:mb-4">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="bg-linear-to-br from-[#0F2744] via-[#1a3a5c] to-[#0F2744] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Experience the CleanPress Difference
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
                Join thousands of satisfied customers who trust us with their garment care. Book your first service today and discover why we&apos;re the preferred choice for laundry excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/services"
                  className="inline-block bg-white text-[#0F2744] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                >
                  View Our Services
                </Link>
                <a
                  href="/contact"
                  className="inline-block bg-[#0F7BA0] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#0d6a8a] transition-all duration-300 hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
