"use client";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  Star,
  User,
  Globe,
  Home,
  TrendingUp,
  BarChart3,
  Briefcase,
  Gift,
  Info,
  ChevronDown,
  Wallet,
} from "lucide-react";
const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors relative">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white !bg-bg rounded-lg shadow-lg border !border-border dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  New update available
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  2 hours ago
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default NotificationsDropdown;
