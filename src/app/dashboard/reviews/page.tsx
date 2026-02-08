'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import api from '@/services/api';
import { FiStar, FiEdit3, FiCheck, FiClock, FiMessageCircle, FiPackage, FiX, FiLoader } from 'react-icons/fi';

interface Review {
  _id: string;
  orderId: string;
  service: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminReply?: string;
  order?: { _id: string; orderId: string; itemsSummary: string; totalPayment: number };
}

type TabType = 'all' | 'approved' | 'pending';

const ReviewsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/reviews/my-reviews');
      if (res.data.status === 'success') {
        setReviews(res.data.data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filteredReviews = activeTab === 'all' ? reviews : reviews.filter(r => r.status === activeTab);

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: 'all', label: 'All Reviews', count: reviews.length },
    { key: 'approved', label: 'Approved', count: reviews.filter(r => r.status === 'approved').length },
    { key: 'pending', label: 'Pending', count: reviews.filter(r => r.status === 'pending').length },
  ];

  const openReviewModal = (review: Review) => {
    setSelectedReview(review);
    setNewRating(review.rating || 0);
    setNewComment(review.comment || '');
    setShowModal(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedReview || newRating === 0) return;
    setSubmitting(true);

    try {
      if (selectedReview._id) {
        // Update existing review
        await api.put(`/reviews/${selectedReview._id}`, { rating: newRating, comment: newComment });
      }
      fetchReviews();
    } catch {
      // silently fail
    }

    setShowModal(false);
    setSubmitting(false);
    setSelectedReview(null);
    setNewRating(0);
    setNewComment('');
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm', interactive = false) => {
    const starSize = size === 'sm' ? 'w-4 h-4' : 'w-7 h-7';
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setNewRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={interactive ? 'cursor-pointer' : 'cursor-default'}
          >
            <FiStar
              className={`${starSize} transition-colors ${
                star <= (interactive ? (hoverRating || newRating) : rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-semibold text-[#0F2744] dark:text-white border-b-2 border-[#0F7BA0] pb-2 inline-block">
            Reviews & Feedback
          </h1>
        </div>

        {/* Tabs */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="flex gap-2 border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-[#0F7BA0] text-[#0F7BA0]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
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

        {/* Reviews List */}
        <div className="p-4 sm:p-6 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FiLoader className="w-8 h-8 text-[#0F7BA0] animate-spin" />
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <FiMessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No reviews found</p>
            </div>
          ) : (
            filteredReviews.map(review => (
              <div
                key={review._id}
                className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FiPackage className="w-4 h-4 text-[#0F7BA0]" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {review.orderId}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{review.service}</span>
                    </div>
                    
                    {review.status !== 'pending' || review.rating > 0 ? (
                      <>
                        <div className="mb-2">{renderStars(review.rating)}</div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {review.comment}
                        </p>
                        {review.adminReply && (
                          <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Admin Reply:</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">{review.adminReply}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                        <FiClock className="w-4 h-4" />
                        <span className="text-sm">Waiting for your review</span>
                      </div>
                    )}

                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {review.status === 'approved' ? (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">
                        <FiCheck className="w-3 h-3" /> Approved
                      </span>
                    ) : review.status === 'rejected' ? (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-full">
                        Rejected
                      </span>
                    ) : (
                      <button
                        onClick={() => openReviewModal(review)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#0F7BA0] text-white text-sm font-medium rounded-lg hover:bg-[#0d6a8a] transition-colors"
                      >
                        <FiEdit3 className="w-4 h-4" />
                        Edit Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showModal && selectedReview && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-9998 animate-fade-in"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-9999 w-[90vw] max-w-md animate-scale-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rate Your Experience</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center mb-5">
                <div className="flex items-center justify-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                  <FiPackage className="w-4 h-4" />
                  {selectedReview.orderId} — {selectedReview.service}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(newRating, 'lg', true)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {newRating === 0 ? 'Tap a star to rate' : 
                   newRating <= 2 ? 'We\'re sorry to hear that' : 
                   newRating <= 3 ? 'Thanks for your feedback' : 
                   newRating <= 4 ? 'Great experience!' : 'Excellent!'}
                </p>
              </div>

              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Share your experience (optional)..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-[#0F7BA0]/30 focus:border-[#0F7BA0] bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-sm"
              />

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={newRating === 0 || submitting}
                  className="flex-1 px-6 py-2.5 bg-[#0F7BA0] text-white rounded-lg font-medium hover:bg-[#0d6a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting
                    </span>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default ReviewsPage;
