'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiCheck, FiSearch } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', flag: '🇧🇩' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', flag: '🇵🇰' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: '🇰🇷' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: '🇹🇭' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', flag: '🇪🇬' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', flag: '🇬🇭' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', flag: '🇩🇰' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', flag: '🇵🇱' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', flag: '🇨🇿' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', flag: '🇭🇺' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', flag: '🇮🇱' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar', flag: '🇹🇼' },
  { code: 'CLP', symbol: 'CLP$', name: 'Chilean Peso', flag: '🇨🇱' },
  { code: 'COP', symbol: 'COL$', name: 'Colombian Peso', flag: '🇨🇴' },
  { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso', flag: '🇦🇷' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', flag: '🇵🇪' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', flag: '🇶🇦' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', flag: '🇰🇼' },
  { code: 'BHD', symbol: 'ب.د', name: 'Bahraini Dinar', flag: '🇧🇭' },
  { code: 'OMR', symbol: 'ر.ع', name: 'Omani Rial', flag: '🇴🇲' },
];

const CurrencySettingsPage = () => {
  const { currency, setCurrency, t } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const currentCurrency = currencies.find(c => c.code === currency);
  
  const filteredCurrencies = currencies.filter(curr => 
    curr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    curr.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    curr.symbol.includes(searchQuery)
  );

  const handleCurrencySelect = (currCode: string) => {
    setCurrency(currCode);
    setMessage(t('currencyUpdated'));
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F2744] dark:text-white">{t('currencySettings')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('chooseCurrency')}</p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {message && (
            <div className="p-3 rounded-lg text-sm bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 animate-fade-in">
              <FiCheck className="inline-block w-4 h-4 mr-2" />
              {message}
            </div>
          )}

          {/* Current Currency */}
          <div className="p-4 bg-[#0F7BA0]/10 rounded-xl border border-[#0F7BA0]/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentCurrency?.flag}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#0F7BA0]">{currentCurrency?.symbol}</span>
                <div>
                  <p className="font-medium text-[#0F2744] dark:text-white">
                    {currentCurrency?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentCurrency?.code}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchCurrencies')}
              className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-[#0F7BA0] transition-colors"
            />
          </div>

          {/* Currency Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
            {filteredCurrencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencySelect(curr.code)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-start rtl:text-right ${
                  currency === curr.code
                    ? 'border-[#0F7BA0] bg-[#0F7BA0]/5 dark:bg-[#0F7BA0]/10'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <span className="text-xl">{curr.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${
                      currency === curr.code ? 'text-[#0F7BA0]' : 'text-gray-700 dark:text-gray-200'
                    }`}>
                      {curr.symbol}
                    </span>
                    <span className="text-xs text-gray-400">{curr.code}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {curr.name}
                  </p>
                </div>
                {currency === curr.code && (
                  <FiCheck className="w-5 h-5 text-[#0F7BA0] shrink-0" />
                )}
              </button>
            ))}
          </div>

          {filteredCurrencies.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No currencies found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CurrencySettingsPage;
