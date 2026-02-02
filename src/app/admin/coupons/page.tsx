'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Coupon } from '@/types/admin';
import { 
  FiSearch, 
  FiPlus,
  FiEdit2, 
  FiTrash2,
  FiX,
  FiTag,
  FiCalendar,
  FiPercent,
  FiDollarSign,
  FiCopy,
  FiToggleLeft,
  FiToggleRight
} from 'react-icons/fi';

const AdminCouponsPage = () => {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const coupons = [
    {
      id: '1',
      code: 'WELCOME20',
      description: 'Welcome discount for new users',
      discountType: 'percentage',
      discountValue: 20,
      minOrder: 30,
      maxDiscount: 50,
      usageLimit: 1000,
      usedCount: 245,
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
      isActive: true
    },
    {
      id: '2',
      code: 'FLAT10',
      description: 'Flat $10 off on orders',
      discountType: 'fixed',
      discountValue: 10,
      minOrder: 50,
      maxDiscount: null,
      usageLimit: 500,
      usedCount: 89,
      validFrom: '2025-01-15',
      validUntil: '2025-03-31',
      isActive: true
    },
    {
      id: '3',
      code: 'SUMMER25',
      description: 'Summer special 25% off',
      discountType: 'percentage',
      discountValue: 25,
      minOrder: 40,
      maxDiscount: 75,
      usageLimit: null,
      usedCount: 156,
      validFrom: '2025-06-01',
      validUntil: '2025-08-31',
      isActive: false
    },
    {
      id: '4',
      code: 'VIP50',
      description: 'VIP exclusive 50% discount',
      discountType: 'percentage',
      discountValue: 50,
      minOrder: 100,
      maxDiscount: 100,
      usageLimit: 100,
      usedCount: 45,
      validFrom: '2025-01-01',
      validUntil: '2025-06-30',
      isActive: true
    },
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Could add a toast notification here
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Promo & Coupons</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage discount coupons and promotions</p>
        </div>
        <button 
          onClick={() => {
            setEditingCoupon(null);
            setShowCouponModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiTag className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{coupons.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Coupons</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiToggleRight className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{coupons.filter(c => c.isActive).length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <FiPercent className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{coupons.reduce((acc, c) => acc + c.usedCount, 0)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Used</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <FiDollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$2,450</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Saved by Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search coupons..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <div 
            key={coupon.id}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${
              !coupon.isActive ? 'opacity-60' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{coupon.code}</span>
                    <button 
                      onClick={() => copyToClipboard(coupon.code)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      title="Copy code"
                    >
                      <FiCopy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{coupon.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  coupon.isActive 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Discount Display */}
              <div className="flex items-center gap-4 mb-4 p-4 bg-linear-to-r from-[#0F7BA0]/10 to-[#0F2744]/10 dark:from-[#0F7BA0]/20 dark:to-[#0F2744]/20 rounded-xl">
                <div className="flex items-center gap-2">
                  {coupon.discountType === 'percentage' ? (
                    <>
                      <FiPercent className="w-8 h-8 text-[#0F7BA0]" />
                      <span className="text-3xl font-bold text-[#0F7BA0]">{coupon.discountValue}%</span>
                    </>
                  ) : (
                    <>
                      <FiDollarSign className="w-8 h-8 text-[#0F7BA0]" />
                      <span className="text-3xl font-bold text-[#0F7BA0]">{coupon.discountValue}</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Min. Order: ${coupon.minOrder}</p>
                  {coupon.maxDiscount && <p>Max. Discount: ${coupon.maxDiscount}</p>}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{coupon.usedCount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Times Used</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {coupon.usageLimit ? `${coupon.usageLimit - coupon.usedCount}` : '∞'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Remaining</p>
                </div>
              </div>

              {/* Validity */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <FiCalendar className="w-4 h-4" />
                <span>Valid: {coupon.validFrom} to {coupon.validUntil}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCoupon(coupon as Coupon);
                    setShowCouponModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                    coupon.isActive
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {coupon.isActive ? (
                    <>
                      <FiToggleRight className="w-4 h-4" />
                      Disable
                    </>
                  ) : (
                    <>
                      <FiToggleLeft className="w-4 h-4" />
                      Enable
                    </>
                  )}
                </button>
                <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Coupon Modal */}
      {showCouponModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowCouponModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                </h3>
                <button 
                  onClick={() => setShowCouponModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Coupon Code *</label>
                  <input 
                    type="text" 
                    defaultValue={editingCoupon?.code || ''}
                    placeholder="e.g., SAVE20"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white uppercase" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <input 
                    type="text" 
                    defaultValue={editingCoupon?.description || ''}
                    placeholder="Coupon description"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Type *</label>
                    <select 
                      defaultValue={editingCoupon?.discountType || 'percentage'}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Value *</label>
                    <input 
                      type="number" 
                      defaultValue={editingCoupon?.discountValue || ''}
                      placeholder="0"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min. Order Value ($)</label>
                    <input 
                      type="number" 
                      defaultValue={editingCoupon?.minOrder || ''}
                      placeholder="0"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max. Discount ($)</label>
                    <input 
                      type="number" 
                      defaultValue={editingCoupon?.maxDiscount || ''}
                      placeholder="No limit"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usage Limit</label>
                  <input 
                    type="number" 
                    defaultValue={editingCoupon?.usageLimit || ''}
                    placeholder="Unlimited"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valid From *</label>
                    <input 
                      type="date" 
                      defaultValue={editingCoupon?.validFrom || ''}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valid Until *</label>
                    <input 
                      type="date" 
                      defaultValue={editingCoupon?.validUntil || ''}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    defaultChecked={editingCoupon?.isActive ?? true}
                    className="w-5 h-5 rounded border-gray-300 text-[#0F7BA0] focus:ring-[#0F7BA0]"
                  />
                  <label htmlFor="isActive" className="text-gray-700 dark:text-gray-300">Active</label>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowCouponModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCouponModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
                >
                  {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminCouponsPage;
