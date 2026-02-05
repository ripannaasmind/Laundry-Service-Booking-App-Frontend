'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePasswordResetStore } from '@/store/passwordResetStore';

const OtpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [validationError, setValidationError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { 
    emailOrPhone, 
    verifyOtp, 
    forgotPassword, 
    isLoading, 
    error,
    clearError 
  } = usePasswordResetStore();

  useEffect(() => {
    inputRefs.current[0]?.focus();
    clearError();
    
    // Redirect if no emailOrPhone in store
    if (!emailOrPhone) {
      console.log('No emailOrPhone found, redirecting to forgot-password');
      router.push('/forgot-password');
    }
  }, [emailOrPhone, router, clearError]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setValidationError('');
    clearError();

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleResend = async () => {
    if (!canResend || !emailOrPhone) return;
    
    setCanResend(false);
    setResendTimer(60);
    setOtp(['', '', '', '', '', '']);
    setValidationError('');
    inputRefs.current[0]?.focus();
    
    // Call forgot password API again to resend OTP
    console.log('Resending OTP to:', emailOrPhone);
    await forgotPassword(emailOrPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setValidationError('Please enter the complete 6-digit OTP');
      return;
    }

    if (!emailOrPhone) {
      setValidationError('Email/Phone not found. Please start over.');
      return;
    }

    console.log('Verifying OTP:', { emailOrPhone, otp: otpValue });
    const success = await verifyOtp(emailOrPhone, otpValue);
    
    if (success) {
      console.log('OTP verified successfully, navigating to create-password');
      router.push('/create-password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 xl:p-16 bg-white">
        <div className="relative w-full max-w-lg xl:max-w-xl animate-float">
          <Image
            src="/Images/Home/how-it-works-section/illustration-2.svg"
            alt="OTP Verification Illustration"
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
              Place OTP
            </h1>
            <p className="text-xs sm:text-sm text-[#5a6a7a] leading-relaxed">
              Please enter Your OTP<br />
              OTP sent to {emailOrPhone || 'your email/phone'}
            </p>
          </div>

          {/* API Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-fade-in mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* OTP Inputs */}
            <div className="space-y-3">
              <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-lg sm:text-xl md:text-2xl font-bold border-2 rounded-lg sm:rounded-xl text-[#0f2744] focus:outline-none transition-all duration-300 ${
                      (error || validationError)
                        ? 'border-red-500 focus:border-red-500 animate-shake'
                        : digit
                        ? 'border-[#0F7BA0] bg-[#0F7BA0]/5'
                        : 'border-gray-200 focus:border-[#0F7BA0]'
                    }`}
                  />
                ))}
              </div>
              {validationError && (
                <p className="text-red-500 text-xs sm:text-sm text-center animate-fade-in">{validationError}</p>
              )}
            </div>

            {/* Resend Timer */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-[#5a6a7a]">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#0F7BA0] hover:text-[#0f2744] font-semibold transition-colors"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <>
                    Resend code in{' '}
                    <span className="font-semibold text-[#0F7BA0]">
                      {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Next Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full bg-[#0f2744] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#1a3a5c] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying...</span>
                </>
              ) : (
                'Next'
              )}
            </button>

            {/* Back to Login */}
            <p className="text-center text-sm sm:text-base text-[#5a6a7a]">
              <Link
                href="/login"
                className="text-[#0F7BA0] hover:text-[#0f2744] font-semibold transition-colors"
              >
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
