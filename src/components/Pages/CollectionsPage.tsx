"use client";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Header from "@/components/layout/Header";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { ApiRequest } from "@/service/apiService";
import { Collection, PaginationMeta } from "@/types/collectionTypes";
import Pagination from "../Collection/CollectionPagination";
import {
  AlertCircle,
  ChevronRight,
  Filter,
  Layers,
  Loader2,
  Settings,
} from "lucide-react";
import CollectionsGrid from "../Collection/CollectionGrid";
import CollectionStats from "../Collection/CollectionStats";
import CollectionStatsCard from "../Collection/CollectionStats";
import { useRouter } from "next/navigation";
import DashboardLayout from "../layout/DashboardLayout";
import LoadingScreen from "../ui/LoadingScreen";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation();
  const router = useRouter();
  const fetchCollections = async (page: number = 1) => {
    setIsLoading(true);
    setError(null);

    await ApiRequest.collectionGetAll()
      .then((res) => {
        if (res && res.data && res.meta) {
          setCollections(res.data);
          setMeta(res.meta);
        } else {
          throw new Error("Invalid response structure");
        }
      })
      .catch((err) => {
        setError("Koleksiyonlar yüklenirken bir hata oluştu");
        console.error("Error fetching collections:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCollections(currentPage);
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditPins = (collectionId: number) => {
    router.push(`/collections/${collectionId}`);
  };
  return (
    <>
      <DashboardLayout>
        <div className="min-h-screen bg-bg transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-copy-primary mb-2">
                {t("collections.title")}
              </h1>
              <p className="text-copy-secondary">{t("collections.subtitle")}</p>
            </div>

            {meta && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <CollectionStatsCard
                  label={t("collections.totalCollections")}
                  value={meta.totalCount}
                  icon={<Layers className="w-5 h-5 text-purple-300" />}
                  color="from-purple-500 to-purple-600"
                />
                <CollectionStatsCard
                  label={t("collections.currentPage")}
                  value={meta.page}
                  icon={<Filter className="w-5 h-5 text-blue-300" />}
                  color="from-blue-500 to-blue-600"
                />
                <CollectionStatsCard
                  label={t("collections.totalPages")}
                  value={meta.totalPages}
                  icon={<ChevronRight className="w-5 h-5 text-pink-300" />}
                  color="from-pink-500 to-pink-600"
                />
                <CollectionStatsCard
                  label={t("collections.perPage")}
                  value={meta.pageSize}
                  icon={<Settings className="w-5 h-5 text-indigo-300" />}
                  color="from-indigo-500 to-indigo-600"
                />
              </div>
            )}

            {isLoading && <LoadingScreen text={t("collections.loading")} />}

            {error && (
              <div className="bg-red-500/10 border !border-border-red-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {!isLoading && !error && (
              <>
                <CollectionsGrid
                  collections={collections}
                  onEditPins={handleEditPins}
                />

                {meta && meta.totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      meta={meta}
                      onPageChange={handlePageChange}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
