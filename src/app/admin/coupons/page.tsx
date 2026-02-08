'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/services/api';
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
  FiToggleRight,
  FiLoader
} from 'react-icons/fi';

interface Coupon {
  _id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount: number | null;
  expiryDate: string;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
}

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Form state
  const [formCode, setFormCode] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDiscountType, setFormDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [formDiscountValue, setFormDiscountValue] = useState('');
  const [formMinOrderValue, setFormMinOrderValue] = useState('');
  const [formMaxDiscount, setFormMaxDiscount] = useState('');
  const [formExpiryDate, setFormExpiryDate] = useState('');
  const [formUsageLimit, setFormUsageLimit] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/coupons');
      setCoupons(res.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const openCreateModal = () => {
    setEditingCoupon(null);
    setFormCode('');
    setFormTitle('');
    setFormDescription('');
    setFormDiscountType('percentage');
    setFormDiscountValue('');
    setFormMinOrderValue('');
    setFormMaxDiscount('');
    setFormExpiryDate('');
    setFormUsageLimit('');
    setFormIsActive(true);
    setShowCouponModal(true);
  };

  const openEditModal = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormCode(coupon.code);
    setFormTitle(coupon.title || '');
    setFormDescription(coupon.description || '');
    setFormDiscountType(coupon.discountType);
    setFormDiscountValue(String(coupon.discountValue));
    setFormMinOrderValue(String(coupon.minOrderValue || ''));
    setFormMaxDiscount(String(coupon.maxDiscount || ''));
    setFormExpiryDate(coupon.expiryDate ? new Date(coupon.expiryDate).toISOString().split('T')[0] : '');
    setFormUsageLimit(coupon.usageLimit ? String(coupon.usageLimit) : '');
    setFormIsActive(coupon.isActive);
    setShowCouponModal(true);
  };

  const handleSaveCoupon = async () => {
    try {
      setSaving(true);
      const payload: Record<string, unknown> = {
        code: formCode.toUpperCase(),
        title: formTitle,
        description: formDescription,
        discountType: formDiscountType,
        discountValue: Number(formDiscountValue),
        minOrderValue: Number(formMinOrderValue) || 0,
        maxDiscount: formMaxDiscount ? Number(formMaxDiscount) : null,
        expiryDate: formExpiryDate || null,
        usageLimit: formUsageLimit ? Number(formUsageLimit) : null,
        isActive: formIsActive,
      };

      if (editingCoupon) {
        await api.put(`/admin/coupons/${editingCoupon._id}`, payload);
      } else {
        await api.post('/admin/coupons', payload);
      }
      setShowCouponModal(false);
      fetchCoupons();
    } catch (err) {
      console.error('Failed to save coupon:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      await api.put(`/admin/coupons/${coupon._id}`, { isActive: !coupon.isActive });
      fetchCoupons();
    } catch (err) {
      console.error('Failed to toggle coupon:', err);
    }
  };

  const handleDeleteCoupon = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/coupons/${deleteTarget._id}`);
      setDeleteTarget(null);
      fetchCoupons();
    } catch (err) {
      console.error('Failed to delete coupon:', err);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isExpired = (coupon: Coupon) => {
    if (!coupon.expiryDate) return false;
    return new Date(coupon.expiryDate) < new Date();
  };

  const isFullyUsed = (coupon: Coupon) => {
    if (!coupon.usageLimit) return false;
    return coupon.usedCount >= coupon.usageLimit;
  };

  // Filter coupons
  const filteredCoupons = coupons.filter(c => {
    const matchesSearch = !searchQuery || 
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!statusFilter) return matchesSearch;
    if (statusFilter === 'active') return matchesSearch && c.isActive && !isExpired(c);
    if (statusFilter === 'inactive') return matchesSearch && !c.isActive;
    if (statusFilter === 'expired') return matchesSearch && isExpired(c);
    return matchesSearch;
  });

  const totalUsed = coupons.reduce((acc, c) => acc + c.usedCount, 0);
  const activeCoupons = coupons.filter(c => c.isActive && !isExpired(c));

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Promo & Coupons</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage discount coupons and promotions</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-8 h-8 animate-spin text-[#0F7BA0]" />
        </div>
      ) : (
        <>
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
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeCoupons.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsed}</p>
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
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{coupons.filter(c => isExpired(c)).length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expired</p>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coupons..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Coupons Grid */}
          {filteredCoupons.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <FiTag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No coupons found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCoupons.map((coupon) => {
                const expired = isExpired(coupon);
                const fullyUsed = isFullyUsed(coupon);
                const inactive = !coupon.isActive || expired || fullyUsed;

                return (
                  <div 
                    key={coupon._id}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${
                      inactive ? 'opacity-60' : ''
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
                          {coupon.title && <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{coupon.title}</p>}
                          {coupon.description && <p className="text-sm text-gray-500 dark:text-gray-400">{coupon.description}</p>}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          expired
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : fullyUsed
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                              : coupon.isActive 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {expired ? 'Expired' : fullyUsed ? 'Fully Used' : coupon.isActive ? 'Active' : 'Inactive'}
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
                          {coupon.minOrderValue > 0 && <p>Min. Order: ${coupon.minOrderValue}</p>}
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
                        <span>Expires: {coupon.expiryDate ? formatDate(coupon.expiryDate) : 'No expiry'}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(coupon)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                          <FiEdit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleActive(coupon)}
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
                        <button 
                          onClick={() => setDeleteTarget(coupon)}
                          className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

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
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="e.g., SAVE20"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white uppercase" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Coupon title"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <input 
                    type="text" 
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Coupon description"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Type *</label>
                    <select 
                      value={formDiscountType}
                      onChange={(e) => setFormDiscountType(e.target.value as 'percentage' | 'fixed')}
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
                      value={formDiscountValue}
                      onChange={(e) => setFormDiscountValue(e.target.value)}
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
                      value={formMinOrderValue}
                      onChange={(e) => setFormMinOrderValue(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max. Discount ($)</label>
                    <input 
                      type="number" 
                      value={formMaxDiscount}
                      onChange={(e) => setFormMaxDiscount(e.target.value)}
                      placeholder="No limit"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
                    <input 
                      type="date" 
                      value={formExpiryDate}
                      onChange={(e) => setFormExpiryDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usage Limit</label>
                    <input 
                      type="number" 
                      value={formUsageLimit}
                      onChange={(e) => setFormUsageLimit(e.target.value)}
                      placeholder="Unlimited"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
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
                  onClick={handleSaveCoupon}
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && <FiLoader className="w-4 h-4 animate-spin" />}
                  {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setDeleteTarget(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Coupon</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete <strong>{deleteTarget.code}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCoupon}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
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
