'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (touched) {
      setError(validateEmail(e.target.value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    setError(emailError);
    setTouched(true);

    if (!emailError) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      router.push('/otp');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 xl:p-16 bg-white">
        <div className="relative w-full max-w-lg xl:max-w-xl animate-float">
          <Image
            src="/Images/Home/how-it-works-section/illustration-1.svg"
            alt="Forgot Password Illustration"
            width={500}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-white lg:bg-gray-50 min-h-screen lg:min-h-0">
        <div className="w-full max-w-[380px] sm:max-w-[400px] bg-white p-6 sm:p-8 rounded-2xl lg:shadow-xl animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image
              src="/Images/logo-2.png"
              alt="Ultra Wash Logo"
              width={120}
              height={50}
              className="w-24 sm:w-28 md:w-32 h-auto"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F7BA0] mb-2">
              Forgot Password
            </h1>
            <p className="text-xs sm:text-sm text-[#5a6a7a] leading-relaxed">
              Please enter Your Email<br />
              One OTP Will send to your Email
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">
                Your Registered Email
              </label>
              <div className={`relative transition-all duration-300 ${error && touched ? 'animate-shake' : ''}`}>
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ex: name@yourprs.com"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    error && touched
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20'
                  }`}
                />
              </div>
              {error && touched && (
                <p className="text-red-500 text-xs sm:text-sm pl-1 animate-fade-in">{error}</p>
              )}
            </div>

            {/* Next Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0f2744] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#1a3a5c] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending OTP...</span>
                </>
              ) : (
                'Next'
              )}
            </button>

            {/* Back to Login */}
            <p className="text-center text-sm sm:text-base text-[#5a6a7a] mt-6">
              Remember your password?{' '}
              <Link
                href="/login"
                className="text-[#0F7BA0] hover:text-[#0f2744] font-semibold transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
