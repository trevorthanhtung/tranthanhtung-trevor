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

  // Global visitor geolocation state
  const [geo, setGeo] = useState({ city: 'TDTU', lat: '10.7725', lon: '106.6980' });

  // Fetch visitor geolocation once on mount
  useEffect(() => {
    const cachedGeo = localStorage.getItem('visitor_geo_data');
    if (cachedGeo) {
      try {
        setGeo(JSON.parse(cachedGeo));
        return;
      } catch (e) {}
    }

    if (sessionStorage.getItem('geo_api_attempted')) {
      return;
    }
    sessionStorage.setItem('geo_api_attempted', 'true');

    fetch('https://ipapi.co/json/')
      .then((res) => {
        if (!res.ok) throw new Error('API Rate Limit or Error');
        return res.json();
      })
      .then((data) => {
        if (data.city && data.latitude && data.longitude) {
          const geoData = {
            city: data.city,
            lat: data.latitude.toFixed(4),
            lon: data.longitude.toFixed(4)
          };
          setGeo(geoData);
          localStorage.setItem('visitor_geo_data', JSON.stringify(geoData));
        }
      })
      .catch(() => {
        // Fallback silently
      });
  }, []);

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
    <AppContext.Provider value={{ lang, changeLang, toggleLang, theme, toggleTheme, geo }}>
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
