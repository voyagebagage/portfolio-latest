"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import translations from "../translations.json";

export type Language =
  | "en"
  | "fr"
  | "ru"
  | "no"
  | "gsw"
  | "ja"
  | "zh"
  | "es"
  | "pt";

interface TranslationKeys {
  name: string;
  title: string;
  about: string;
  skills: string;
  projects: string;
  contact: string;
  experience?: string;
  current_stack?: string;
}

type Translations = Record<Language, TranslationKeys>;
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const languages: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "ru", name: "Русский" },
  { code: "no", name: "Norsk" },
  { code: "gsw", name: "Schweizerdeutsch" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const userLang = navigator.language.split("-")[0] as Language;
    const supportedLang = languages.find((lang) => lang.code === userLang);
    if (supportedLang) {
      setLanguage(supportedLang.code);
    }
  }, []);

  const t = (key: keyof TranslationKeys): string => {
    return (translations as Translations)[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
