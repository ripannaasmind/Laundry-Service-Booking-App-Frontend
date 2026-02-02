'use client';

import Link from 'next/link';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';


export default function NotFound() {
  return (
    <>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-20 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8 sm:mb-12 animate-fade-in-up">
            <div className="relative w-full max-w-md mx-auto">
              <div className="text-[120px] sm:text-[180px] md:text-[220px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#0F2744] to-[#0F7BA0] leading-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#0F7BA0]/10 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2744] mb-4 sm:mb-6">
              Oops! Page Not Found
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have taken a permanent vacation. 
              It might have been moved, deleted, or perhaps it never existed.
            </p>
          </div>

          {/* Laundry Icon */}
          <div className="mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-center gap-4 text-gray-400">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                </svg>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#0F2744] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#1a3a5c] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FiHome className="w-5 h-5" />
              Go to Homepage
            </Link>
            
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#0F7BA0] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#0d6a8a] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FiSearch className="w-5 h-5" />
              Browse Services
            </Link>
          </div>

          {/* Back Link */}
          <div className="mt-8 sm:mt-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0F2744] font-medium transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Go back to previous page
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              Need help? Here are some useful links:
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <Link href="/about" className="text-[#0F7BA0] hover:text-[#0d6a8a] hover:underline transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-[#0F7BA0] hover:text-[#0d6a8a] hover:underline transition-colors">
                Contact Support
              </Link>
              <Link href="/blog" className="text-[#0F7BA0] hover:text-[#0d6a8a] hover:underline transition-colors">
                Blog
              </Link>
              <Link href="/cart" className="text-[#0F7BA0] hover:text-[#0d6a8a] hover:underline transition-colors">
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
