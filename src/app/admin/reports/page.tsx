'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiDownload,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage
} from 'react-icons/fi';

const AdminReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeReport, setActiveReport] = useState('revenue');

  const reports = [
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag },
    { id: 'services', label: 'Services', icon: FiPackage },
    { id: 'customers', label: 'Customers', icon: FiUsers },
  ];

  const revenueData = {
    total: '$48,250',
    change: '+15.3%',
    changeType: 'up',
    breakdown: [
      { label: 'Wash & Fold', value: '$18,500', percentage: 38 },
      { label: 'Dry Cleaning', value: '$12,800', percentage: 27 },
      { label: 'Wash & Iron', value: '$9,450', percentage: 20 },
      { label: 'Special Care', value: '$4,500', percentage: 9 },
      { label: 'Others', value: '$3,000', percentage: 6 },
    ]
  };

  const topServices = [
    { name: 'Wash & Fold', orders: 1245, revenue: '$18,500', growth: '+12%' },
    { name: 'Dry Cleaning', orders: 856, revenue: '$12,800', growth: '+8%' },
    { name: 'Wash & Iron', orders: 634, revenue: '$9,450', growth: '+15%' },
    { name: 'Special Care', orders: 189, revenue: '$4,500', growth: '+5%' },
    { name: 'Ironing Only', orders: 321, revenue: '$3,000', growth: '-2%' },
  ];

  const topCustomers = [
    { name: 'John Doe', orders: 28, spent: '$2,450', avgOrder: '$87.50' },
    { name: 'Jane Smith', orders: 24, spent: '$1,980', avgOrder: '$82.50' },
    { name: 'Mike Johnson', orders: 19, spent: '$1,650', avgOrder: '$86.84' },
    { name: 'Sarah Williams', orders: 17, spent: '$1,420', avgOrder: '$83.53' },
    { name: 'Chris Brown', orders: 15, spent: '$1,200', avgOrder: '$80.00' },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FiCalendar className="w-4 h-4" />
            <span>Date Range</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors">
            <FiDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['week', 'month', 'quarter', 'year'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize whitespace-nowrap ${
              selectedPeriod === period
                ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            This {period}
          </button>
        ))}
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeReport === report.id
                  ? 'bg-[#0F7BA0]/10 text-[#0F7BA0]'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <report.icon className="w-4 h-4" />
              {report.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</span>
            <span className="flex items-center gap-1 text-xs text-green-500">
              <FiTrendingUp className="w-3 h-3" />
              15.3%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$48,250</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Orders</span>
            <span className="flex items-center gap-1 text-xs text-green-500">
              <FiTrendingUp className="w-3 h-3" />
              8.2%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">2,845</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Avg. Order Value</span>
            <span className="flex items-center gap-1 text-xs text-green-500">
              <FiTrendingUp className="w-3 h-3" />
              3.5%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$16.96</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">New Customers</span>
            <span className="flex items-center gap-1 text-xs text-red-500">
              <FiTrendingDown className="w-3 h-3" />
              2.1%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
          
          {/* Simple Bar Chart */}
          <div className="h-48 flex items-end justify-around gap-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
              const heights = [60, 80, 45, 90, 75, 95];
              return (
                <div key={month} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="w-full max-w-12 bg-linear-to-t from-[#0F7BA0] to-[#0F7BA0]/60 rounded-t-lg transition-all duration-300 hover:from-[#0F2744] hover:to-[#0F2744]/60"
                    style={{ height: `${heights[index]}%` }}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Service</h3>
          
          <div className="space-y-4">
            {revenueData.breakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0F7BA0] rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Services</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {topServices.map((service, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{service.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{service.orders}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{service.revenue}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${
                        service.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {service.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Customers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total Spent</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Avg Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {topCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{customer.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{customer.orders}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{customer.spent}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{customer.avgOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReportsPage;
