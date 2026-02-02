'use client';

import { ReactNode, useState } from 'react';

import DashboardSidebar from './DashboardSidebar';
import { FiMenu, FiX } from 'react-icons/fi';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24 pb-12 transition-colors duration-300">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8c] transition-colors"
            >
              {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div
              className={`lg:w-72 xl:w-80 shrink-0 fixed lg:relative inset-y-0 left-0 z-50 lg:z-0 transform transition-transform duration-300 ease-in-out rtl:left-auto rtl:right-0 rtl:-translate-x-0 rtl:translate-x-full lg:rtl:translate-x-0 ${
                sidebarOpen ? 'translate-x-0 rtl:!translate-x-0' : '-translate-x-full lg:translate-x-0 rtl:translate-x-full lg:rtl:translate-x-0'
              }`}
            >
              <div className="lg:sticky lg:top-28 h-screen lg:h-auto overflow-y-auto lg:overflow-visible bg-gray-50 dark:bg-gray-900 lg:bg-transparent p-4 lg:p-0">
                <DashboardSidebar />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 animate-fade-in-up">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
