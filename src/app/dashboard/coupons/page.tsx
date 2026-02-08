'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiTag, FiCopy, FiCheck, FiClock, FiPercent, FiGift, FiShoppingBag, FiLoader } from 'react-icons/fi';
import api from '@/services/api';

interface Coupon {
  _id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  usageLimit: number;
  usedCount: number;
}

type TabType = 'available' | 'used' | 'expired';

const CouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('available');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/coupons/active');
      if (res.data.status === 'success') {
        setCoupons(res.data.data);
      }
    } catch {
      console.error('Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const isExpired = (coupon: Coupon) => new Date(coupon.expiryDate) < new Date();
  const isFullyUsed = (coupon: Coupon) => coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit;

  const availableCoupons = coupons.filter(c => !isExpired(c) && !isFullyUsed(c));
  const usedCoupons = coupons.filter(c => isFullyUsed(c) && !isExpired(c));
  const expiredCoupons = coupons.filter(c => isExpired(c));

  const tabs: { key: TabType; label: string; count: number; icon: React.ElementType }[] = [
    { key: 'available', label: 'Available', count: availableCoupons.length, icon: FiGift },
    { key: 'used', label: 'Used', count: usedCoupons.length, icon: FiCheck },
    { key: 'expired', label: 'Expired', count: expiredCoupons.length, icon: FiClock },
  ];

  const filteredCoupons = activeTab === 'available' ? availableCoupons : activeTab === 'used' ? usedCoupons : expiredCoupons;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusBadge = (coupon: Coupon) => {
    if (isExpired(coupon)) {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
          <FiClock className="w-3 h-3" /> Expired
        </span>
      );
    }
    if (isFullyUsed(coupon)) {
      return (
        <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
          <FiCheck className="w-3 h-3" /> Fully Used
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full">
        <FiTag className="w-3 h-3" /> Active
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-semibold text-[#0F2744] dark:text-white border-b-2 border-[#0F7BA0] pb-2 inline-block">
            Coupons & Offers
          </h1>
        </div>

        {/* Tabs */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="flex gap-2 border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-[#0F7BA0] text-[#0F7BA0]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key
                    ? 'bg-[#0F7BA0]/10 text-[#0F7BA0]'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Coupons List */}
        <div className="p-4 sm:p-6 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FiLoader className="w-8 h-8 text-[#0F7BA0] animate-spin" />
            </div>
          ) : filteredCoupons.length === 0 ? (
            <div className="text-center py-12">
              <FiTag className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                {activeTab === 'available' ? 'No coupons available right now' : 
                 activeTab === 'used' ? 'No used coupons yet' : 'No expired coupons'}
              </p>
            </div>
          ) : (
            filteredCoupons.map(coupon => {
              const expired = isExpired(coupon);
              const used = isFullyUsed(coupon);
              const inactive = expired || used;
              return (
              <div
                key={coupon._id}
                className={`relative border rounded-xl overflow-hidden transition-shadow hover:shadow-md ${
                  inactive
                    ? 'border-gray-200 dark:border-gray-700 opacity-75'
                    : 'border-[#0F7BA0]/30 dark:border-[#0F7BA0]/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Discount Badge */}
                  <div className={`shrink-0 w-full sm:w-32 p-4 flex flex-col items-center justify-center text-center ${
                    inactive
                      ? 'bg-gray-100 dark:bg-gray-700/50'
                      : 'bg-linear-to-br from-[#0F7BA0]/10 to-[#0F2744]/10 dark:from-[#0F7BA0]/20 dark:to-[#0F2744]/20'
                  }`}>
                    <FiPercent className={`w-6 h-6 mb-1 ${
                      inactive ? 'text-gray-400' : 'text-[#0F7BA0]'
                    }`} />
                    <span className={`text-2xl font-bold ${
                      inactive ? 'text-gray-400 dark:text-gray-500' : 'text-[#0F2744] dark:text-[#0F7BA0]'
                    }`}>
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                    </span>
                    <span className={`text-xs ${
                      inactive ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>OFF</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{coupon.title}</h3>
                      {getStatusBadge(coupon)}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{coupon.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FiShoppingBag className="w-3.5 h-3.5" />
                        Min. order: ${coupon.minOrderValue}
                      </span>
                      {coupon.maxDiscount && (
                        <span>Max discount: ${coupon.maxDiscount}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3.5 h-3.5" />
                        Expires: {new Date(coupon.expiryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    {/* Coupon Code */}
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-dashed ${
                        inactive
                          ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
                          : 'border-[#0F7BA0]/50 bg-[#0F7BA0]/5 dark:bg-[#0F7BA0]/10'
                      }`}>
                        <code className={`text-sm font-mono font-bold tracking-wider ${
                          inactive ? 'text-gray-400' : 'text-[#0F2744] dark:text-[#0F7BA0]'
                        }`}>
                          {coupon.code}
                        </code>
                      </div>
                      {!inactive && (
                        <button
                          onClick={() => handleCopyCode(coupon.code)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#0F7BA0] hover:bg-[#0F7BA0]/10 rounded-lg transition-colors"
                        >
                          {copiedCode === coupon.code ? (
                            <>
                              <FiCheck className="w-3.5 h-3.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <FiCopy className="w-3.5 h-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Usage */}
                    {coupon.usageLimit > 1 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-1">
                          <span>Used {coupon.usedCount}/{coupon.usageLimit}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0F7BA0] rounded-full transition-all"
                            style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CouponsPage;
