'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTheme();

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('services'), href: '/services' },
    { label: t('aboutUs'), href: '/about' },
    { label: t('contactUs'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/30 py-3'
          : 'bg-white/95 dark:bg-gray-900/95 py-4'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-35 h-10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Images/logo/header.png"
                alt="Ultra Wash Logo"
                fill
                className="object-contain dark:brightness-0 dark:invert"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 lg:gap-12">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#5a6a7a] dark:text-gray-300 font-medium transition-all duration-300 hover:text-[#1A3A5D] dark:hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#1A3A5D] dark:after:bg-[#0F7BA0] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link href="/login" className="bg-[#0f2744] dark:bg-[#0F7BA0] text-white px-16 py-3 rounded font-semibold transition-all duration-300 hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8c] hover:shadow-lg hover:-translate-y-0.5">
              {t('login')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-[#0f2744] dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-[#0f2744] dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-[#0f2744] dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            ></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/30 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-4'
          }`}
        >
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#5a6a7a] dark:text-gray-300 font-medium py-2 hover:text-[#1A3A5D] dark:hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="bg-[#0f2744] dark:bg-[#0F7BA0] text-white px-16 py-3 rounded font-semibold w-full text-center">
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
