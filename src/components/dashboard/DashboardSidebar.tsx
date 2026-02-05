'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { 
  FiUser, 
  FiPackage, 
  FiMessageSquare, 
  FiCreditCard, 
  FiSettings, 
  FiLogOut, 
  FiChevronDown, 
  FiChevronUp,
  FiCamera,
  FiLock,
  FiBell,
  FiGlobe,
  FiMoon,
  FiDollarSign
} from 'react-icons/fi';

interface DashboardSidebarProps {
  className?: string;
}

const DashboardSidebar = ({ className = '' }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const { t } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(pathname.includes('/dashboard/settings'));

  const menuItems = [
    { icon: FiUser, label: t('myProfile'), href: '/dashboard/profile' },
    { icon: FiPackage, label: t('myOrder'), href: '/dashboard/orders' },
    { icon: FiMessageSquare, label: t('chat'), href: '/dashboard/chat' },
    { icon: FiCreditCard, label: t('paymentMethod'), href: '/dashboard/payment-method' },
  ];

  const settingsItems = [
    { icon: FiLock, label: t('changePassword'), href: '/dashboard/settings/password' },
    { icon: FiBell, label: t('notification'), href: '/dashboard/settings/notification' },
    { icon: FiGlobe, label: t('language'), href: '/dashboard/settings/language' },
    { icon: FiMoon, label: t('theme'), href: '/dashboard/settings/theme' },
    { icon: FiDollarSign, label: t('currency'), href: '/dashboard/settings/currency' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const isSettingsActive = pathname.includes('/dashboard/settings');

  return (
    <aside className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
      {/* Profile Section */}
      <div className="p-6 sm:p-8 flex flex-col items-center border-b border-gray-100 dark:border-gray-700">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#0F7BA0]/20 shadow-lg bg-gray-200 dark:bg-gray-600">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-3 sm:p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0F2744] dark:hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm sm:text-base">{item.label}</span>
              </Link>
            </li>
          ))}

          {/* Settings with submenu */}
          <li>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isSettingsActive
                  ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0F2744] dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FiSettings className="w-5 h-5" />
                <span className="text-sm sm:text-base">{t('settings')}</span>
              </div>
              {settingsOpen ? (
                <FiChevronUp className="w-4 h-4" />
              ) : (
                <FiChevronDown className="w-4 h-4" />
              )}
            </button>
            {settingsOpen && (
              <ul className="mt-1 ms-4 space-y-1 animate-fade-in">
                {settingsItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'text-[#0F7BA0] dark:text-[#0F7BA0] font-medium bg-[#0F7BA0]/10'
                          : 'text-gray-600 dark:text-gray-400 hover:text-[#0F2744] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={() => {
                window.location.href = '/login';
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="text-sm sm:text-base">{t('logout')}</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
