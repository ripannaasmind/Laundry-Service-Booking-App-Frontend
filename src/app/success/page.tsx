'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

const SuccessPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className={`w-full max-w-[320px] sm:max-w-[380px] bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center transition-all duration-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Success Icon */}
        <div className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mb-5 sm:mb-6 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <FiCheckCircle className={`w-8 h-8 sm:w-10 sm:h-10 text-green-500 transition-all duration-500 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* Success Message */}
        <div className={`transition-all duration-500 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0f2744] mb-2">
            Password Change Successfully
          </h2>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className={`block w-full bg-[#0F7BA0] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-500 delay-500 hover:bg-[#0d6a8a] hover:shadow-lg mt-6 sm:mt-8 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Login Now
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
