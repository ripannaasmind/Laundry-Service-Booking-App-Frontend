'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiMoon, FiSun, FiMonitor, FiCheck } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';

type ThemeOption = 'light' | 'dark' | 'system';

const ThemeSettingsPage = () => {
  const { theme, setTheme, isDark, t } = useTheme();
  const [message, setMessage] = useState('');

  const themeOptions: { value: ThemeOption; label: string; icon: React.ReactNode; description: string }[] = [
    { 
      value: 'light', 
      label: t('light'), 
      icon: <FiSun className="w-6 h-6" />,
      description: t('useLightTheme')
    },
    { 
      value: 'dark', 
      label: t('dark'), 
      icon: <FiMoon className="w-6 h-6" />,
      description: t('useDarkTheme')
    },
    { 
      value: 'system', 
      label: t('system'), 
      icon: <FiMonitor className="w-6 h-6" />,
      description: t('matchDevice')
    },
  ];

  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    setMessage(t('themeUpdated'));
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F2744] dark:text-white">{t('themeSettings')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('chooseTheme')}</p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {message && (
            <div className="p-3 rounded-lg text-sm bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 animate-fade-in">
              <FiCheck className="inline-block w-4 h-4 mr-2" />
              {message}
            </div>
          )}

          {/* Theme Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-start rtl:text-right ${
                  theme === option.value
                    ? 'border-[#0F7BA0] bg-[#0F7BA0]/5 dark:bg-[#0F7BA0]/10'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    theme === option.value 
                      ? 'bg-[#0F7BA0] text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {option.icon}
                  </div>
                  {theme === option.value && (
                    <FiCheck className="w-5 h-5 text-[#0F7BA0]" />
                  )}
                </div>
                <h3 className={`font-semibold ${
                  theme === option.value 
                    ? 'text-[#0F7BA0]' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}>
                  {option.label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {option.description}
                </p>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-4">{t('preview')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Light Preview */}
              <div className={`p-4 rounded-xl border-2 ${!isDark ? 'border-[#0F7BA0]' : 'border-gray-200'} bg-white`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded mt-1"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">{t('lightMode')}</p>
              </div>

              {/* Dark Preview */}
              <div className={`p-4 rounded-xl border-2 ${isDark ? 'border-[#0F7BA0]' : 'border-gray-700'} bg-gray-900`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div>
                    <div className="h-3 w-20 bg-gray-600 rounded"></div>
                    <div className="h-2 w-16 bg-gray-700 rounded mt-1"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-gray-700 rounded"></div>
                  <div className="h-2 w-3/4 bg-gray-700 rounded"></div>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">{t('darkMode')}</p>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">{t('currentTheme')}:</span>{' '}
              <span className="text-[#0F7BA0]">
                {theme === 'system' 
                  ? `${t('system')} (${isDark ? t('dark') : t('light')})` 
                  : theme.charAt(0).toUpperCase() + theme.slice(1)
                }
              </span>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ThemeSettingsPage;
