'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { usePasswordResetStore } from '@/store/passwordResetStore';

const CreatePasswordPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const { 
    emailOrPhone, 
    resetToken, 
    resetPassword, 
    isLoading, 
    error, 
    clearError,
    clearState 
  } = usePasswordResetStore();

  useEffect(() => {
    clearError();
    
    // Redirect if no emailOrPhone or resetToken in store
    if (!emailOrPhone || !resetToken) {
      console.log('Missing emailOrPhone or resetToken, redirecting to forgot-password');
      router.push('/forgot-password');
    }
  }, [emailOrPhone, resetToken, router, clearError]);

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Must contain at least one number';
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
      if (name === 'password') {
        setValidationErrors((prev) => ({ ...prev, password: validatePassword(value) }));
      } else if (name === 'confirmPassword') {
        setValidationErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
      }
    }
    
    // Re-validate confirm password when password changes
    if (name === 'password' && touched.confirmPassword && formData.confirmPassword) {
      const confirmError = value !== formData.confirmPassword ? 'Passwords do not match' : '';
      setValidationErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    if (name === 'password') {
      setValidationErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    } else if (name === 'confirmPassword') {
      setValidationErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);
    
    setValidationErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    
    setTouched({
      password: true,
      confirmPassword: true,
    });

    if (!passwordError && !confirmPasswordError && emailOrPhone && resetToken) {
      console.log('Resetting password for:', emailOrPhone);
      const success = await resetPassword({
        emailOrPhone,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
        resetToken,
      });
      
      if (success) {
        console.log('Password reset successfully, navigating to success page');
        clearState();
        router.push('/success');
      }
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 xl:p-16 bg-white">
        <div className="relative w-full max-w-lg xl:max-w-xl animate-float">
          <Image
            src="/Images/Home/how-it-works-section/illustration-3.svg"
            alt="Create Password Illustration"
            width={500}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-white lg:bg-gray-50 min-h-screen lg:min-h-0">
        <div className="w-full max-w-[380px] sm:max-w-[420px] bg-white p-6 sm:p-8 rounded-2xl lg:shadow-xl animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image
              src="/Images/logo/header.png"
              alt="Ultra Wash Logo"
              width={120}
              height={50}
              className="w-24 sm:w-28 md:w-32 h-auto"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F7BA0] mb-2">
              Create New Password
            </h1>
            <p className="text-xs sm:text-sm text-[#5a6a7a] leading-relaxed">
              Please Create New Password
            </p>
          </div>

          {/* API Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-fade-in mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* New Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">
                New Password
              </label>
              <div className={`relative transition-all duration-300 ${validationErrors.password && touched.password ? 'animate-shake' : ''}`}>
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
                    validationErrors.password && touched.password
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
              {validationErrors.password && touched.password && (
                <p className="text-red-500 text-xs pl-1 animate-fade-in">{validationErrors.password}</p>
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

            {/* Confirm New Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-[#0f2744]">
                Confirm New Password
              </label>
              <div className={`relative transition-all duration-300 ${validationErrors.confirmPassword && touched.confirmPassword ? 'animate-shake' : ''}`}>
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
                  className={`w-full pl-10 sm:pl-12 pr-12 py-3 sm:py-3.5 border rounded-lg sm:rounded-xl text-sm sm:text-base text-[#0f2744] placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    validationErrors.confirmPassword && touched.confirmPassword
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
              {validationErrors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs pl-1 animate-fade-in">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Next Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0f2744] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#1a3a5c] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                'Next'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordPage;
