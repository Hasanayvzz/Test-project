"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zhHK from "../public/locales/tr/translation.json";
import enUS from "../public/locales/en/translation.json";

import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "tr",
    debug: false,
    resources: {
      en: {
        translation: enUS,
      },
      tr: {
        translation: zhHK,
      },
    },
    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag"],

      caches: ["localStorage"],

      lookupLocalStorage: "i18nextLng",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
