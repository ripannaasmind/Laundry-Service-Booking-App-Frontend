'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    phone: false,
    password: false,
  });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Please enter a valid phone number';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof typeof touched]) {
      if (name === 'phone') {
        setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
      } else if (name === 'password') {
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    if (name === 'phone') {
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    } else if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneError = validatePhone(formData.phone);
    const passwordError = validatePassword(formData.password);
    
    setErrors({
      phone: phoneError,
      password: passwordError,
    });
    
    setTouched({
      phone: true,
      password: true,
    });

    if (!phoneError && !passwordError) {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#0f2744]/20 to-transparent z-10" />
        <Image
          src="/Images/Home/service-section/img-1.png"
          alt="Laundry Service"
          fill
          className="object-cover animate-scale-in"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-white min-h-screen lg:min-h-0">
        <div className="w-full max-w-100 sm:max-w-105 animate-fade-in-up">
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f2744] mb-2">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-[#5a6a7a]">
              Access your account to manage to laundry
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Phone Input */}
            <div className="space-y-1.5">
              <div className={`relative transition-all duration-300 ${errors.phone && touched.phone ? 'animate-shake' : ''}`}>
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+01374688707"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    errors.phone && touched.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20'
                  }`}
                />
              </div>
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-xs sm:text-sm pl-1 animate-fade-in">{errors.phone}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className={`relative transition-all duration-300 ${errors.password && touched.password ? 'animate-shake' : ''}`}>
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={`w-full pl-10 sm:pl-12 pr-12 py-3 sm:py-3.5 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    errors.password && touched.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0f2744] transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs sm:text-sm pl-1 animate-fade-in">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm sm:text-base text-[#0F7BA0] hover:text-[#0f2744] transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
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
                  <span>Logging in...</span>
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 sm:gap-4 my-4 sm:my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">Or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 sm:gap-3 border border-gray-200 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base text-[#0f2744] transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"
            >
              <FcGoogle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 sm:gap-4 my-4 sm:my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">Or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm sm:text-base text-[#5a6a7a]">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-[#0F7BA0] hover:text-[#0f2744] font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
