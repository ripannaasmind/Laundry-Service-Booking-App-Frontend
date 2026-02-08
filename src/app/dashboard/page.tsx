'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';
import {
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiPlus,
  FiTruck,
  FiList,
  FiArrowRight,
  FiCalendar,
  FiDollarSign,
  FiRefreshCw,
  FiLoader,
} from 'react-icons/fi';

// Types
interface OrderStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}

interface LatestOrder {
  _id: string;
  orderId: string;
  itemsSummary: string;
  status: string;
  orderDate: string;
  deliveryDate: string;
  totalPayment: number;
}

// Stat Card Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
    </div>
  </div>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
    case 'picked_up':
    case 'in_process':
    case 'ready':
    case 'out_for_delivery':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'delivered':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'cancelled':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<OrderStats>({ totalOrders: 0, activeOrders: 0, completedOrders: 0, cancelledOrders: 0 });
  const [latestOrders, setLatestOrders] = useState<LatestOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders/dashboard-stats');
      if (res.data.status === 'success') {
        const d = res.data.data;
        setStats({
          totalOrders: d.totalOrders,
          activeOrders: d.activeOrders,
          completedOrders: d.completedOrders,
          cancelledOrders: d.cancelledOrders,
        });
        setLatestOrders(d.latestOrders || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const greeting = getGreeting();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-[#0F2744] to-[#0F7BA0] rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {greeting}, {user?.name || 'User'}! 👋
              </h1>
              <p className="text-blue-100 mt-1 text-sm sm:text-base">
                Here&apos;s an overview of your laundry orders
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white text-[#0F2744] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors shadow"
            >
              <FiPlus className="w-4 h-4" />
              New Booking
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <FiLoader className="w-8 h-8 text-[#0F7BA0] animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={FiPackage}
            color="text-blue-600"
            bgColor="bg-blue-100 dark:bg-blue-900/30"
          />
          <StatCard
            title="Active / Ongoing"
            value={stats.activeOrders}
            icon={FiClock}
            color="text-orange-600"
            bgColor="bg-orange-100 dark:bg-orange-900/30"
          />
          <StatCard
            title="Completed"
            value={stats.completedOrders}
            icon={FiCheckCircle}
            color="text-green-600"
            bgColor="bg-green-100 dark:bg-green-900/30"
          />
          <StatCard
            title="Cancelled"
            value={stats.cancelledOrders}
            icon={FiXCircle}
            color="text-red-600"
            bgColor="bg-red-100 dark:bg-red-900/30"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/services"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-400 text-center">New Booking</span>
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiTruck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-400 text-center">Track Order</span>
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiList className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-400 text-center">Order History</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiRefreshCw className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-orange-700 dark:text-orange-400 text-center">Re-order</span>
            </Link>
          </div>
        </div>

        {/* Latest Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Latest Orders</h2>
            <Link
              href="/dashboard/orders"
              className="text-sm text-[#0F7BA0] hover:underline flex items-center gap-1"
            >
              View all <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {latestOrders.length === 0 ? (
            <div className="p-12 text-center">
              <FiPackage className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 mt-4 text-[#0F7BA0] hover:underline"
              >
                <FiPlus className="w-4 h-4" /> Place your first order
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {latestOrders.map((order) => (
                <Link
                  key={order._id}
                  href={`/dashboard/orders/${order._id}`}
                  className="block p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {order.orderId}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {formatStatus(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {order.itemsSummary}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" /> {new Date(order.orderDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiTruck className="w-3 h-3" /> Est. {new Date(order.deliveryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                        <FiDollarSign className="w-4 h-4" />
                        {order.totalPayment.toFixed(2)}
                      </span>
                      <FiArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
