import { useEffect, useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../data/translations';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved === 'en' || saved === 'id') return saved;
      return 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_lang', lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
