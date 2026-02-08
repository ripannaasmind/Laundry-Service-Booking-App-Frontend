'use client';

import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiLock, FiGlobe, FiDollarSign, FiBell, FiMoon } from 'react-icons/fi';

const settingsItems = [
  {
    title: 'Change Password',
    description: 'Update your password to keep your account secure',
    href: '/dashboard/settings/password',
    icon: FiLock,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    title: 'Language',
    description: 'Choose your preferred language for the app',
    href: '/dashboard/settings/language',
    icon: FiGlobe,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    title: 'Currency',
    description: 'Set your preferred currency for pricing',
    href: '/dashboard/settings/currency',
    icon: FiDollarSign,
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  {
    title: 'Notifications',
    description: 'Manage your notification preferences',
    href: '/dashboard/settings/notification',
    icon: FiBell,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    title: 'Theme',
    description: 'Switch between light and dark mode',
    href: '/dashboard/settings/theme',
    icon: FiMoon,
    color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  },
];

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F2744] dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your account preferences
          </p>
        </div>

        {/* Settings Grid */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settingsItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-[#0F7BA0]/30 hover:shadow-md transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color} transition-transform group-hover:scale-110`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-[#0F2744] dark:text-white group-hover:text-[#0F7BA0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0F7BA0] transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
