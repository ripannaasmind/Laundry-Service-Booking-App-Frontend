'use client';

import { useState } from 'react';
import { FiBell, FiX } from 'react-icons/fi';
import { Header, Footer } from '@/components/layout';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  isNew: boolean;
}

const notificationsData: Notification[] = [
  {
    id: '1',
    title: 'Order Confirmation',
    message: 'Your pickup for Order #L514 is confirmed for [Day] between [Start Time] and [End Time]. Please have your bags ready!',
    time: '20:48',
    date: '18 Dec 2025',
    isNew: true,
  },
  {
    id: '2',
    title: 'Order Confirmation',
    message: 'Your pickup for Order #L514 is confirmed for [Day] between [Start Time] and [End Time]. Please have your bags ready!',
    time: '20:48',
    date: '18 Dec 2025',
    isNew: false,
  },
  {
    id: '3',
    title: 'Order Confirmation',
    message: 'Your pickup for Order #L514 is confirmed for [Day] between [Start Time] and [End Time]. Please have your bags ready!',
    time: '20:48',
    date: '18 Dec 2025',
    isNew: false,
  },
  {
    id: '4',
    title: 'Order Confirmation',
    message: 'Your pickup for Order #L514 is confirmed for [Day] between [Start Time] and [End Time]. Please have your bags ready!',
    time: '20:48',
    date: '18 Dec 2025',
    isNew: false,
  },
  {
    id: '5',
    title: 'Order Confirmation',
    message: 'Your pickup for Order #L514 is confirmed for [Day] between [Start Time] and [End Time]. Please have your bags ready!',
    time: '20:48',
    date: '18 Dec 2025',
    isNew: false,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    // Mark as read
    setNotifications(prev =>
      prev.map(n => (n.id === notification.id ? { ...n, isNew: false } : n))
    );
  };

  const closeDetail = () => {
    setSelectedNotification(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24 pb-12">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Notifications List */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700 bg-[#0F2744] dark:bg-gray-800">
                  <h1 className="text-lg sm:text-xl font-bold text-white">All Notification</h1>
                </div>

                {/* Notifications */}
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full p-4 sm:p-6 text-start hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                        notification.isNew ? 'bg-[#0F7BA0]/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${notification.isNew ? 'bg-[#0F7BA0]/10' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <FiBell className={`w-5 h-5 ${notification.isNew ? 'text-[#0F7BA0]' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {notification.time} , {notification.date}
                            </span>
                          </div>
                          <h3 className={`font-semibold mb-1 ${notification.isNew ? 'text-[#0F7BA0]' : 'text-gray-700 dark:text-gray-300'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notification Detail - Desktop */}
            <div className="hidden lg:block w-80 xl:w-96">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden sticky top-28">
                <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-bold text-[#0F2744] dark:text-white">All Notification Detail</h2>
                </div>

                {selectedNotification ? (
                  <div className="p-6">
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={closeDetail}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <FiBell className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                        {selectedNotification.time}, {selectedNotification.date}
                      </p>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                        {selectedNotification.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedNotification.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-400 dark:text-gray-500">
                    <FiBell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Select a notification to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Notification Detail Modal */}
        {selectedNotification && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/50" onClick={closeDetail} />
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl p-6 animate-slide-up">
              <div className="flex justify-end mb-4">
                <button
                  onClick={closeDetail}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiBell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                  {selectedNotification.time}, {selectedNotification.date}
                </p>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                  {selectedNotification.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedNotification.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default NotificationsPage;
