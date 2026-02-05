'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiCheck, FiSearch } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import { parseCookies, setCookie } from 'nookies';

const COOKIE_NAME = 'googtrans';

interface LanguageDescriptor {
  name: string;
  title: string;
}

interface GoogleTranslationConfig {
  languages: LanguageDescriptor[];
  defaultLanguage: string;
}

declare global {
  interface Window {
    __GOOGLE_TRANSLATION_CONFIG__?: GoogleTranslationConfig;
  }
}

export default function LanguageSettingsPage() {
  const { t } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [languageConfig, setLanguageConfig] = useState<LanguageDescriptor[]>([]);

  useEffect(() => {
    const initializeLanguage = () => {
      // Read current language from cookie
      const cookies = parseCookies();
      const existingLanguageCookieValue = cookies[COOKIE_NAME];

      let languageValue = 'en';
      if (existingLanguageCookieValue) {
        const sp = existingLanguageCookieValue.split('/');
        if (sp.length > 2) {
          languageValue = sp[2];
        }
      }
      
      setCurrentLanguage(languageValue);
      
      // Load language config
      if (typeof window !== 'undefined' && window.__GOOGLE_TRANSLATION_CONFIG__) {
        setLanguageConfig(window.__GOOGLE_TRANSLATION_CONFIG__.languages);
      }
    };

    initializeLanguage();
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCookie(null, COOKIE_NAME, '/auto/' + langCode, { path: '/' });
    setCurrentLanguage(langCode);
    
    // Reload page to apply translation
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const filteredLanguages = languageConfig.filter((lang) =>
    lang.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('languageSettings')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('chooseLanguage')}
          </p>
        </div>

        {/* Current Language */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            {/* <span className="text-3xl">{getFlagEmoji(currentLanguage)}</span> */}
             <FlagImage langCode={currentLanguage} size={30} />
            <div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Current Language
              </div>
              <div className="text-lg font-semibold text-blue-900 dark:text-blue-100 notranslate">
                {languageConfig.find(l => l.name === currentLanguage)?.title || 'English'}
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchLanguages')}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-100 overflow-y-auto notranslate">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => handleLanguageChange(lang.name)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  currentLanguage === lang.name
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* <span className="text-2xl">{getFlagEmoji(lang.name)}</span> */}
                     <FlagImage langCode={lang.name} size={30} />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {lang.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {lang.name}
                      </div>
                    </div>
                  </div>
                  {currentLanguage === lang.name && (
                    <FiCheck className="text-blue-500 w-5 h-5" />
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
              No languages found
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// Helper function to get country code for flag image
function getCountryCode(langCode: string): string {
  const countryMap: Record<string, string> = {
    'en': 'gb', 'bn': 'bd', 'ar': 'sa', 'hi': 'in', 'es': 'es',
    'fr': 'fr', 'de': 'de', 'it': 'it', 'pt': 'pt', 'ru': 'ru',
    'ja': 'jp', 'zh-CN': 'cn', 'ko': 'kr', 'tr': 'tr', 'pl': 'pl',
    'nl': 'nl', 'sv': 'se', 'da': 'dk', 'no': 'no', 'fi': 'fi',
    'el': 'gr', 'cs': 'cz', 'ro': 'ro', 'hu': 'hu', 'sr': 'rs',
    'hr': 'hr', 'bg': 'bg', 'sk': 'sk', 'sl': 'si', 'lt': 'lt',
    'lv': 'lv', 'et': 'ee', 'uk': 'ua', 'he': 'il', 'ur': 'pk',
    'fa': 'ir', 'ta': 'in', 'te': 'in', 'mr': 'in', 'gu': 'in',
    'pa': 'in', 'kn': 'in', 'ml': 'in', 'si': 'lk', 'ne': 'np',
    'th': 'th', 'vi': 'vn', 'id': 'id', 'ms': 'my', 'tl': 'ph',
  };
  
  return countryMap[langCode] || 'un';
}

// Flag Image component
function FlagImage({ langCode, size = 24 }: { langCode: string; size?: number }) {
  const countryCode = getCountryCode(langCode);
  const height = Math.round(size * 0.6); // Height is 70% of width
  return (
    <div 
      style={{ 
        width: size, 
        height: height, 
        minWidth: size, 
        minHeight: height,
        overflow: 'hidden',
        borderRadius: '4px'
      }}
      className="flex items-center justify-center bg-gray-100 dark:bg-gray-700"
    >
      <img 
        src={`https://flagcdn.com/w80/${countryCode}.png`}
        srcSet={`https://flagcdn.com/w160/${countryCode}.png 2x`}
        alt={`${langCode} flag`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
