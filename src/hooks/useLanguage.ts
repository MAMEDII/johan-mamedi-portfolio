import { useEffect, useState } from "react";
import type { Language } from "../types/content";
import { languages } from "../utils/content";

const STORAGE_KEY = "mamedi-language";

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      return stored && languages.includes(stored) ? stored : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }
  };

  return { language, setLanguage };
};
