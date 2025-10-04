import { PaginationProps } from "@/types/collectionTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Pagination: React.FC<PaginationProps> = ({
  meta,
  onPageChange,
  isLoading = false,
}) => {
  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    if (meta.totalPages <= maxVisiblePages) return pages;

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(meta.page - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, meta.totalPages);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return pages.slice(start - 1, end);
  };

  const visiblePages = getVisiblePages();
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between px-4 py-6 bg-card border-t !border-border rounded-b-2xl">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPreviousPage || isLoading}
          className="relative inline-flex items-center px-4 py-2 border !border-border text-sm font-medium rounded-lg text-white bg-card hover:bg-text/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {t("collections.previous")}
        </button>
        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!meta.hasNextPage || isLoading}
          className="ml-3 relative inline-flex items-center px-4 py-2 border !border-border text-sm font-medium rounded-lg text-copy-primary bg-card hover:bg-text/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {t("collections.next")}
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-copy-secondary">
            {t("collections.total")}{" "}
            <span className="font-medium text-copy-primary">
              {meta.totalCount}
            </span>{" "}
            {t("collections.of")}{" "}
            <span className="font-medium text-copy-primary">
              {(meta.page - 1) * meta.pageSize + 1}
            </span>{" "}
            -{" "}
            <span className="font-medium text-copy-primary">
              {Math.min(meta.page * meta.pageSize, meta.totalCount)}
            </span>{" "}
            {t("collections.showing")}
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-lg shadow-soft -space-x-px"
            aria-label="Pagination">
            <button
              onClick={() => onPageChange(meta.page - 1)}
              disabled={!meta.hasPreviousPage || isLoading}
              className="relative inline-flex items-center px-3 py-2 rounded-l-lg border !border-border bg-card text-sm font-medium text-copy-primary hover:bg-text/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>

            {visiblePages[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="relative inline-flex items-center px-4 py-2 border !border-border bg-card text-sm font-medium text-copy-primary hover:bg-text/5 transition-colors">
                  1
                </button>
                {visiblePages[0] > 2 && (
                  <span className="relative inline-flex items-center px-4 py-2 border !border-border bg-card text-sm font-medium text-copy-secondary">
                    ...
                  </span>
                )}
              </>
            )}

            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={isLoading}
                className={`relative inline-flex items-center px-4 py-2 border !border-border text-sm font-medium transition-colors ${
                  page === meta.page
                    ? "z-10 bg-text border-text text-text-text shadow-soft"
                    : "bg-card border text-copy-primary hover:bg-text/5"
                } disabled:cursor-not-allowed`}>
                {page}
              </button>
            ))}

            {visiblePages[visiblePages.length - 1] < meta.totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] <
                  meta.totalPages - 1 && (
                  <span className="relative inline-flex items-center px-4 py-2 border !border-border bg-card text-sm font-medium text-copy-secondary">
                    ...
                  </span>
                )}
                <button
                  onClick={() => onPageChange(meta.totalPages)}
                  className="relative inline-flex items-center px-4 py-2 border !border-border bg-card text-sm font-medium text-copy-primary hover:bg-text/5 transition-colors">
                  {meta.totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => onPageChange(meta.page + 1)}
              disabled={!meta.hasNextPage || isLoading}
              className="relative inline-flex items-center px-3 py-2 rounded-r-lg border !border-border bg-card text-sm font-medium text-copy-primary hover:bg-text/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
