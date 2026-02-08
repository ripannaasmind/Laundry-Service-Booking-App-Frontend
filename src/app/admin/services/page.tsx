'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiSearch, 
  FiPlus,
  FiEdit2, 
  FiTrash2,
  FiMoreVertical,
  FiX,
  FiImage,
  FiDollarSign,
  FiToggleLeft,
  FiToggleRight,
  FiLoader
} from 'react-icons/fi';
import api from '@/services/api';

interface Service {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription?: string;
  pricingType: 'per_kg' | 'per_item';
  pricePerKg: number;
  pricePerItem: number;
  estimatedDays: number;
  features: string[];
  image: string;
  isActive: boolean;
  sortOrder: number;
}

const AdminServicesPage = () => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPricingType, setFormPricingType] = useState('per_item');
  const [formPricePerKg, setFormPricePerKg] = useState('');
  const [formPricePerItem, setFormPricePerItem] = useState('');
  const [formEstimatedDays, setFormEstimatedDays] = useState('3');
  const [formSortOrder, setFormSortOrder] = useState('0');
  const [formIsActive, setFormIsActive] = useState(true);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/services');
      if (res.data.status === 'success') {
        setServices(res.data.data);
      }
    } catch {
      console.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const openCreateModal = () => {
    setEditingService(null);
    setFormName(''); setFormCategory(''); setFormDescription('');
    setFormPricingType('per_item'); setFormPricePerKg(''); setFormPricePerItem('');
    setFormEstimatedDays('3'); setFormSortOrder('0'); setFormIsActive(true);
    setShowServiceModal(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormName(service.name); setFormCategory(service.category); setFormDescription(service.description);
    setFormPricingType(service.pricingType); setFormPricePerKg(service.pricePerKg?.toString() || '');
    setFormPricePerItem(service.pricePerItem?.toString() || '');
    setFormEstimatedDays(service.estimatedDays?.toString() || '3');
    setFormSortOrder(service.sortOrder?.toString() || '0'); setFormIsActive(service.isActive);
    setShowServiceModal(true);
  };

  const handleSaveService = async () => {
    try {
      setSaving(true);
      const payload = {
        name: formName,
        category: formCategory,
        description: formDescription,
        pricingType: formPricingType,
        pricePerKg: parseFloat(formPricePerKg) || 0,
        pricePerItem: parseFloat(formPricePerItem) || 0,
        estimatedDays: parseInt(formEstimatedDays) || 3,
        sortOrder: parseInt(formSortOrder) || 0,
        isActive: formIsActive,
      };
      if (editingService) {
        await api.put(`/admin/services/${editingService._id}`, payload);
      } else {
        await api.post('/admin/services', payload);
      }
      setShowServiceModal(false);
      fetchServices();
    } catch {
      console.error('Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/services/${deleteTarget}`);
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
      fetchServices();
    } catch {
      console.error('Failed to delete service');
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      await api.put(`/admin/services/${service._id}`, { isActive: !service.isActive });
      fetchServices();
    } catch {
      console.error('Failed to toggle service');
    }
  };

  const categories = [
    { value: 'wash-fold', label: 'Wash & Fold' },
    { value: 'wash-iron', label: 'Wash & Iron' },
    { value: 'dry-cleaning', label: 'Dry Cleaning' },
    { value: 'ironing', label: 'Ironing' },
    { value: 'special-care', label: 'Special Care' },
    { value: 'alterations', label: 'Alterations' },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Service Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your laundry services and pricing</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <FiLoader className="w-8 h-8 text-[#0F7BA0] animate-spin" />
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div 
            key={service._id}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${
              !service.isActive ? 'opacity-60' : ''
            }`}
          >
            {/* Service Image */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <FiImage className="w-12 h-12 text-gray-400" />
              </div>
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  service.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              {/* Sort Order */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{service.sortOrder}</span>
              </div>
            </div>

            {/* Service Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                  <p className="text-xs text-[#0F7BA0]">{service.category}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <FiMoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Pricing */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FiDollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {service.pricingType === 'per_kg' ? `$${service.pricePerKg?.toFixed(2) || '0.00'} per kg` : `$${service.pricePerItem?.toFixed(2) || '0.00'} per item`}
                  </span>
                </div>
                {service.features && service.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-white dark:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-[#0F7BA0]/10 text-[#0F7BA0] rounded-lg">
                      +{service.features.length - 3} more
                    </span>
                  )}
                </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(service)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleActive(service)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    service.isActive
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {service.isActive ? (
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
                  onClick={() => { setDeleteTarget(service._id); setShowDeleteConfirm(true); }}
                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Add/Edit Service Modal */}
      {showServiceModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowServiceModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button 
                  onClick={() => setShowServiceModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Name *</label>
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g., Wash & Fold"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                    <input 
                      type="text"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="e.g., wash-fold"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                  <textarea 
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Service description..."
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" 
                  />
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pricing Type *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="priceType" value="per_item" checked={formPricingType === 'per_item'} onChange={() => setFormPricingType('per_item')} />
                      <span className="text-gray-700 dark:text-gray-300">Per Item</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="priceType" value="per_kg" checked={formPricingType === 'per_kg'} onChange={() => setFormPricingType('per_kg')} />
                      <span className="text-gray-700 dark:text-gray-300">Per Kg</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price per Kg ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={formPricePerKg}
                      onChange={(e) => setFormPricePerKg(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price per Item ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={formPricePerItem}
                      onChange={(e) => setFormPricePerItem(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estimated Days</label>
                  <input 
                    type="number" 
                    value={formEstimatedDays}
                    onChange={(e) => setFormEstimatedDays(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Image</label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-6 text-center">
                    <FiImage className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
                    <input 
                      type="number" 
                      value={formSortOrder}
                      onChange={(e) => setFormSortOrder(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formIsActive}
                        onChange={(e) => setFormIsActive(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#0F7BA0] focus:ring-[#0F7BA0]"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Active</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveService}
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && <FiLoader className="w-4 h-4 animate-spin" />}
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowDeleteConfirm(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4 flex items-center justify-center">
                  <FiTrash2 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Service?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  This action cannot be undone. All pricing and item data will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteService}
                    className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminServicesPage;
