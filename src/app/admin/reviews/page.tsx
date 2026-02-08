'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiSearch,
  FiStar,
  FiCheck,
  FiX,
  FiMessageSquare,
  FiThumbsUp,
  FiEye,
  FiFilter,
  FiLoader
} from 'react-icons/fi';
import api from '@/services/api';

interface Review {
  _id: string;
  user: { _id: string; name: string; email: string };
  order?: { _id: string; orderId: string };
  orderId: string;
  service: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  adminReply?: string;
  createdAt: string;
}

const AdminReviewsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminReply, setAdminReply] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/reviews');
      if (res.data.status === 'success') {
        setReviews(res.data.data);
      }
    } catch {
      console.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleUpdateStatus = async (reviewId: string, status: string) => {
    try {
      await api.put(`/admin/reviews/${reviewId}`, { status });
      fetchReviews();
    } catch {
      console.error('Failed to update review status');
    }
  };

  const handleSendReply = async () => {
    if (!selectedReview || !adminReply.trim()) return;
    try {
      setSaving(true);
      await api.put(`/admin/reviews/${selectedReview._id}`, { adminReply, status: 'approved' });
      setShowResponseModal(false);
      setAdminReply('');
      setSelectedReview(null);
      fetchReviews();
    } catch {
      console.error('Failed to send reply');
    } finally {
      setSaving(false);
    }
  };

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === activeTab);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return '0.0';
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach(r => dist[r.rating - 1]++);
    return dist.reverse();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews & Feedback</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage customer reviews and ratings</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <FiLoader className="w-8 h-8 text-[#0F7BA0] animate-spin" />
        </div>
      ) : (
      <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <FiStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{getAverageRating()}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiMessageSquare className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Reviews</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <FiEye className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.filter(r => r.status === 'pending').length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiThumbsUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.filter(r => r.rating >= 4).length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Positive</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {getRatingDistribution().map((count, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-12 text-sm text-gray-600 dark:text-gray-400">{5 - index} stars</span>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }} />
              </div>
              <span className="w-8 text-sm text-gray-600 dark:text-gray-400 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-[#0F2744] dark:bg-[#0F7BA0] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search reviews..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FiFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">No reviews found</div>
        ) : (
        filteredReviews.map((review) => (
          <div key={review._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0F7BA0]/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-[#0F7BA0]">{review.user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{review.user?.name || 'Unknown'}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{review.user?.email} • Order {review.orderId}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${review.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : review.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'}`}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">• {review.service}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{review.comment}</p>
                {review.adminReply && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Admin Response:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{review.adminReply}</p>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {review.status === 'pending' && (
                    <>
                      <button onClick={() => handleUpdateStatus(review._id, 'approved')} className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                        <FiCheck className="w-4 h-4" /> Approve
                      </button>
                      <button onClick={() => handleUpdateStatus(review._id, 'rejected')} className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                        <FiX className="w-4 h-4" /> Reject
                      </button>
                    </>
                  )}
                  {!review.adminReply && (
                    <button onClick={() => { setSelectedReview(review); setAdminReply(''); setShowResponseModal(true); }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                      <FiMessageSquare className="w-4 h-4" /> Respond
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
        )}
      </div>
      </>
      )}

      {showResponseModal && selectedReview && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowResponseModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Respond to Review</h3>
                <button onClick={() => setShowResponseModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">{renderStars(selectedReview.rating)}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">&ldquo;{selectedReview.comment}&rdquo;</p>
                <p className="text-xs text-gray-500 mt-2">- {selectedReview.user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Response</label>
                <textarea rows={4} value={adminReply} onChange={(e) => setAdminReply(e.target.value)}
                  placeholder="Write your response to this review..."
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" />
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setShowResponseModal(false)} className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <button onClick={handleSendReply} disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving && <FiLoader className="w-4 h-4 animate-spin" />}
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminReviewsPage;
