import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Initialize language from localStorage or default to 'vi'
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return saved === 'en' || saved === 'vi' ? saved : 'vi';
  });

  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  // Persist language selection
  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('portfolio-lang', newLang);
  };

  // Toggle language easily
  const toggleLang = () => {
    changeLang(lang === 'vi' ? 'en' : 'vi');
  };

  // Toggle theme and update HTML class
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  // Sync theme with HTML class for Tailwind dark: modifiers
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ lang, changeLang, toggleLang, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
