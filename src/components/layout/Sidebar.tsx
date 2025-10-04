"use client";
import React, { useState, useRef, useEffect } from "react";
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
  LogOut,
} from "lucide-react";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/redux/reducers/authSlice";
import { RootState } from "@/redux/store";
import { getFirstChars, truncateText } from "@/utils/helper";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const navItems = [
    { name: "Dashboard", href: "/collections", icon: Home, active: true },
    { name: "Products", href: "/collections", icon: TrendingUp, active: false },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      dispatch(logout());

      await signOut({
        redirect: false,
        callbackUrl: "/sign-in",
      });

      toast.success("Başarıyla çıkış yapıldı", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/sign-in");
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Çıkış yapılırken bir hata oluştu", {
        position: "top-right",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          bg-card
        border-r !border-border
          transform transition-transform duration-300 ease-in-out
          z-50 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        <div className="h-16 flex items-center justify-between px-6 border-b !border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            <span className="font-bold text-xl text-copy-primary">
              Dashboard
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-copy-secondary hover:text-copy-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active && pathname === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-text/10 text-text font-medium border !border-border"
                      : "text-copy-primary hover:bg-text/5 hover:text-text"
                  }
                `}>
                <Icon size={20} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t !border-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-text/5 border !border-border">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {getFirstChars(userData.fullName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-copy-primary truncate">
                {userData.fullName}
              </p>
              <p className="text-xs text-copy-secondary truncate">
                {truncateText(userData.email, 5, 9)}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
            <LogOut size={20} />
            <span className="font-medium">
              {isLoggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
