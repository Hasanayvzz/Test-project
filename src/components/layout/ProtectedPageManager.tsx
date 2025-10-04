"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedPageManagerProps {
  children: React.ReactNode;
}

const ProtectedPageManager: React.FC<ProtectedPageManagerProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) =>
      state.auth.isAuthenticated
  );

  const isAllowedPath = (path: string): boolean => {
    const exactPaths = ["/sign-in"];
    if (exactPaths.includes(path)) return true;

    return false;
  };

  useEffect(() => {
    if (!isAuthenticated && !isAllowedPath(pathname)) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && !isAllowedPath(pathname)) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="relative flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-800 border-t-blue-500 border-r-purple-500 animate-spin" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg animate-pulse" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Yükleniyor
            </h2>
            <p className="text-gray-600 dark:text-gray-400 animate-pulse">
              Lütfen bekleyin...
            </p>
          </div>

          <div className="flex gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200" />
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400" />
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedPageManager;
