'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiCreditCard, FiPlus, FiTrash2 } from 'react-icons/fi';
import { SiVisa, SiMastercard, SiAmericanexpress } from 'react-icons/si';

interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  lastFour: string;
  name: string;
}

const PaymentMethodPage = () => {
  const [cards, setCards] = useState<PaymentCard[]>([
    { id: '1', type: 'visa', lastFour: '1175', name: 'Visa' },
    { id: '2', type: 'mastercard', lastFour: '1175', name: 'Master Card' },
    { id: '3', type: 'amex', lastFour: '1175', name: 'AMEX' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  const getCardIcon = (type: PaymentCard['type']) => {
    switch (type) {
      case 'visa':
        return <SiVisa className="w-10 h-10 text-blue-600" />;
      case 'mastercard':
        return <SiMastercard className="w-10 h-10 text-orange-500" />;
      case 'amex':
        return <SiAmericanexpress className="w-10 h-10 text-blue-500" />;
      default:
        return <FiCreditCard className="w-10 h-10 text-gray-500" />;
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleAddCard = () => {
    if (newCard.cardNumber && newCard.cardHolder) {
      const lastFour = newCard.cardNumber.slice(-4);
      const newCardEntry: PaymentCard = {
        id: Date.now().toString(),
        type: 'visa',
        lastFour,
        name: 'Visa',
      };
      setCards([...cards, newCardEntry]);
      setNewCard({ cardNumber: '', cardHolder: '', expiry: '', cvv: '' });
      setShowAddModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F2744] dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Payment Method</p>
        </div>

        {/* Cards List */}
        <div className="p-4 sm:p-6 space-y-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#0F7BA0]/30 transition-colors group"
            >
              <div className="flex items-center gap-4">
                {getCardIcon(card.type)}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">**** **** **** {card.lastFour}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{card.name}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          {/* Add Card Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full flex items-center justify-center gap-2 p-4 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-xl font-medium hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Add Card
          </button>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[9998] animate-fade-in"
            onClick={() => setShowAddModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90vw] max-w-md animate-scale-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-[#0F2744] dark:text-white mb-4">Add New Card</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Holder Name</label>
                  <input
                    type="text"
                    value={newCard.cardHolder}
                    onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={newCard.expiry}
                      onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                    <input
                      type="text"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0F7BA0] focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCard}
                  className="flex-1 px-6 py-2.5 bg-[#0F2744] dark:bg-[#0F7BA0] text-white rounded-lg font-medium hover:bg-[#1a3a5c] dark:hover:bg-[#0d6a8a] transition-colors"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default PaymentMethodPage;
