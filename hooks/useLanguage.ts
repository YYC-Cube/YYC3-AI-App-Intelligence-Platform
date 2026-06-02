import { useState, useCallback } from 'react';

type Language = 'zh' | 'en';

interface UseLanguageReturn {
  language: Language;
  toggleLanguage: () => void;
  isZh: boolean;
  isEn: boolean;
}

export function useLanguage(initialLanguage: Language = 'zh'): UseLanguageReturn {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  }, []);

  return {
    language,
    toggleLanguage,
    isZh: language === 'zh',
    isEn: language === 'en',
  };
}
