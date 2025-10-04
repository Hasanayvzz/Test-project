"use client";
import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/redux/reducers/settingsSlice";

const LanguageDropdown = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: "tr" | "en") => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 bg-bg dark:text-gray-300 transition-colors">
        <Globe size={20} />
      </button>

      {isLangOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-bg rounded-lg shadow-lg border !border-border dark:border-gray-700 py-2 z-50">
          <button
            onClick={() => handleLanguageChange("en")}
            className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <span className="text-xl">🇺🇸</span>
            <span>English</span>
          </button>
          <button
            onClick={() => handleLanguageChange("tr")}
            className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <span className="text-xl">🇹🇷</span>
            <span>Türkçe</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
