'use client';

import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';

// Google-predefined cookie name for translation
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

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<GoogleTranslationConfig>();

  // Initialize translation engine
  useEffect(() => {
    const initializeLanguage = () => {
      // Read the cookie
      const cookies = parseCookies();
      const existingLanguageCookieValue = cookies[COOKIE_NAME];

      let languageValue;
      if (existingLanguageCookieValue) {
        // Extract language from cookie
        const sp = existingLanguageCookieValue.split('/');
        if (sp.length > 2) {
          languageValue = sp[2];
        }
      }
      
      // Use default language if not set
      if (window.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
        languageValue = window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
      }
      
      if (languageValue) {
        setCurrentLanguage(languageValue);
      }
      
      // Set language config
      if (window.__GOOGLE_TRANSLATION_CONFIG__) {
        setLanguageConfig(window.__GOOGLE_TRANSLATION_CONFIG__);
      }
    };
    
    initializeLanguage();
  }, []);

  // Don't display if config unavailable
  if (!currentLanguage || !languageConfig) {
    return null;
  }

  // Switch language function
  const switchLanguage = (lang: string) => () => {
    setCookie(null, COOKIE_NAME, '/auto/' + lang, { path: '/' });
    window.location.reload();
  };

  return (
    <div className="notranslate">
      <select
        value={currentLanguage}
        onChange={(e) => switchLanguage(e.target.value)()}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languageConfig.languages.map((ld: LanguageDescriptor) => (
          <option key={ld.name} value={ld.name}>
            {ld.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };
