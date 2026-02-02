'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, TranslationKey, Language } from '@/translations';
import { parseCookies } from 'nookies';

type Theme = 'light' | 'dark' | 'system';
type Direction = 'ltr' | 'rtl';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  direction: Direction;
  setDirection: (direction: Direction) => void;
  language: string;
  setLanguage: (language: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  t: (key: TranslationKey) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// RTL languages
const RTL_LANGUAGES = ['ar', 'he', 'ur', 'fa', 'ps'];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isDark, setIsDark] = useState(false);
  const [direction, setDirectionState] = useState<Direction>('ltr');
  const [language, setLanguageState] = useState('en');
  const [currency, setCurrencyState] = useState('USD');
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage and cookies
  useEffect(() => {
    const initializeSettings = () => {
      // Get saved theme
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        setThemeState(savedTheme);
      }

      // Get language from Google Translate cookie
      const cookies = parseCookies();
      const googleTransCookie = cookies['googtrans'];
      let currentLang = 'en';
      
      if (googleTransCookie) {
        const parts = googleTransCookie.split('/');
        if (parts.length > 2) {
          currentLang = parts[2];
        }
      }
      
      setLanguageState(currentLang);
      
      // Set RTL direction for RTL languages
      if (RTL_LANGUAGES.includes(currentLang)) {
        setDirectionState('rtl');
        document.documentElement.dir = 'rtl';
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        setDirectionState('ltr');
        document.documentElement.dir = 'ltr';
        document.documentElement.setAttribute('dir', 'ltr');
      }

      // Get saved currency
      const savedCurrency = localStorage.getItem('selectedCurrency');
      if (savedCurrency) {
        setCurrencyState(savedCurrency);
      }
      
      setMounted(true);
    };

    initializeSettings();
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return;

    const updateDarkMode = () => {
      let shouldBeDark = false;

      if (theme === 'dark') {
        shouldBeDark = true;
      } else if (theme === 'system') {
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      setIsDark(shouldBeDark);
      
      // Update document class
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateDarkMode();

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateDarkMode();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Handle direction changes
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dir = direction;
    document.documentElement.setAttribute('dir', direction);
  }, [direction, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setDirection = (newDirection: Direction) => {
    setDirectionState(newDirection);
  };

  const setLanguage = async (newLanguage: string) => {
    setLanguageState(newLanguage);
    
    // Update direction based on language
    if (RTL_LANGUAGES.includes(newLanguage)) {
      setDirectionState('rtl');
      document.documentElement.dir = 'rtl';
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      setDirectionState('ltr');
      document.documentElement.dir = 'ltr';
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('selectedCurrency', newCurrency);
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    const lang = language as Language;
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isDark, 
      direction, 
      setDirection,
      language,
      setLanguage,
      currency,
      setCurrency,
      t
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
