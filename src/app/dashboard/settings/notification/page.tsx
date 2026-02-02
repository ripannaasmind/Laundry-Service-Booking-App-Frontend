'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiBell } from 'react-icons/fi';

const NotificationSettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F2744] dark:text-white">Settings</h1>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 max-w-md">
          {message && (
            <div className="p-3 rounded-lg text-sm bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              {message}
            </div>
          )}

          {/* Notification Toggle */}
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div className="flex items-center gap-3">
              <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-300">Notification</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                notificationsEnabled ? 'bg-[#0F7BA0]' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  notificationsEnabled ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg font-medium hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationSettingsPage;
