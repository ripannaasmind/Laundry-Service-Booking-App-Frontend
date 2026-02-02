'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiPhone, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateFullName = (name: string) => {
    if (!name) return 'Full name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Please enter a valid phone number';
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== formData.password) return 'Passwords do not match';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'fullName':
        error = validateFullName(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(value);
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      fullName: validateFullName(formData.fullName),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword),
    };
    
    setErrors(newErrors);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    
    if (!hasErrors) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      router.push('/otp');
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#0f2744]/20 to-transparent z-10" />
        <Image
          src="/Images/Home/service-section/img-2.png"
          alt="Laundry Service"
          fill
          className="object-cover animate-scale-in"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-white min-h-screen lg:min-h-0 overflow-y-auto">
        <div className="w-full max-w-100 sm:max-w-105 py-6 sm:py-8 animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <Image
              src="/Images/logo-2.png"
              alt="Ultra Wash Logo"
              width={120}
              height={50}
              className="w-24 sm:w-28 md:w-32 h-auto"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-5 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f2744] mb-2">
              Create Your Account
            </h1>
            <p className="text-sm sm:text-base text-[#5a6a7a]">
              Please Register to get our Service
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Full Name Input */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Full Name</label>
              <div className={`relative transition-all duration-300 ${errors.fullName && touched.fullName ? 'animate-shake' : ''}`}>
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Full Name"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    errors.fullName && touched.fullName
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20'
                  }`}
                />
              </div>
              {errors.fullName && touched.fullName && (
                <p className="text-red-500 text-xs pl-1 animate-fade-in">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Phone Number</label>
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
                  className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    errors.phone && touched.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20'
                  }`}
                />
              </div>
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-xs pl-1 animate-fade-in">{errors.phone}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Email</label>
              <div className={`relative transition-all duration-300 ${errors.email && touched.email ? 'animate-shake' : ''}`}>
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ex: name@yourprs.com"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20'
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs pl-1 animate-fade-in">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Create Password</label>
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
                  className={`w-full pl-10 sm:pl-12 pr-12 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
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
                <p className="text-red-500 text-xs pl-1 animate-fade-in">{errors.password}</p>
              )}
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 animate-fade-in">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < getPasswordStrength() ? strengthColors[getPasswordStrength() - 1] : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${strengthColors[getPasswordStrength() - 1]?.replace('bg-', 'text-') || 'text-gray-400'}`}>
                    {getPasswordStrength() > 0 ? strengthLabels[getPasswordStrength() - 1] : 'Enter password'}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">Confirm Password</label>
              <div className={`relative transition-all duration-300 ${errors.confirmPassword && touched.confirmPassword ? 'animate-shake' : ''}`}>
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={`w-full pl-10 sm:pl-12 pr-12 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-[#0F7BA0] focus:ring-2 focus:ring-[#0F7BA0]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0f2744] transition-colors"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs pl-1 animate-fade-in">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F7BA0] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#0d6a8a] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 sm:gap-4 my-3 sm:my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">Or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Login Link */}
            <p className="text-center text-sm sm:text-base text-[#5a6a7a]">
              Already have an account?{' '}
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

export default SignupPage;
