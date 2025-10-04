"use client";
import { useDispatch, useSelector } from "react-redux";
import LanguageDropdown from "./Header/LanguageDropdown";
import NotificationsDropdown from "./Header/NotificationsDropdown";
import { setLanguage, toggleTheme } from "@/redux/reducers/settingsSlice";
import { Menu, Moon, Star, Sun, User, Wallet } from "lucide-react";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    setMounted(true);
  }, []);
  const [mounted, setMounted] = useState(false);

  const { theme } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      root.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);
  return (
    <header className="h-16 bg-card border-b !border-border sticky top-0 z-30 transition-colors duration-300 shadow-sm dark:shadow-dark-sm">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Menu">
            <Menu size={24} />
          </button>

          <div className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border  !border-border focus:border-blue-500 dark:focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label={theme === "light" ? "Dark Mode" : "Light Mode"}
            title={
              theme === "light" ? "Karanlık Moda Geç" : "Aydınlık Moda Geç"
            }>
            {theme === "light" ? (
              <Moon size={20} className="transition-transform duration-200" />
            ) : (
              <Sun size={20} className="transition-transform duration-200" />
            )}
          </button>

          <LanguageDropdown />

          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Favorites"
            title="Favoriler">
            <Star size={20} />
          </button>

          <NotificationsDropdown />

          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Profile"
            title="Profil">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
