import React, { useMemo } from "react";
import { Filter, Layers, Settings, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FilterItem {
  id: string;
  valueName: string;
}

interface CollectionFilters {
  filters: FilterItem[];
  useOrLogic: boolean;
}

interface CollectionInfo {
  name: string;
  description: string;
  url: string;
}

interface Collection {
  id: number;
  info: CollectionInfo;
  filters: CollectionFilters;
  salesChannelId: number;
}

interface CollectionCardProps {
  collection: Collection;
  onEditPins: (id: number) => void;
}

const FilterSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  items: FilterItem[];
  colorClass: string;
}> = ({ title, icon, items, colorClass }) => {
  if (items.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-copy-secondary flex items-center gap-1.5">
        {icon}
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, idx) => (
          <span
            key={`${item.id}-${idx}`}
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${colorClass} border !border-border transition-colors`}>
            {item.valueName}
          </span>
        ))}
      </div>
    </div>
  );
};

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  onEditPins,
}) => {
  const { t } = useTranslation();

  const filterGroups = useMemo(() => {
    const { filters } = collection.filters;

    return {
      categories: filters.filter((f) => f.id === "category"),
      colors: filters.filter((f) => f.id === "color"),
      tags: filters.filter((f) => f.id === "tag"),
      others: filters.filter(
        (f) => !["category", "color", "tag"].includes(f.id)
      ),
    };
  }, [collection.filters]);

  const cleanDescription = useMemo(
    () => collection.info.description.replace(/<[^>]*>/g, ""),
    [collection.info.description]
  );

  return (
    <div className="group relative bg-card rounded-sm shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden border !border-border h-full flex flex-col">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-text/20 via-text-active/20 to-text/20 animate-pulse-slow" />
      </div>

      <div className="relative p-6 flex flex-col flex-1">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-copy-primary group-hover:text-text transition-colors flex-1 truncate">
              {collection.info.name}
            </h3>
            <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-text/10 text-text border !border-border">
              #{collection.id}
            </span>
          </div>
          <p className="text-sm text-copy-secondary line-clamp-2 min-h-[2.5rem]">
            {cleanDescription || t("collections.noDescription")}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap min-h-[2rem]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border !border-border text-xs text-copy-secondary">
            <span className="opacity-50">🔗</span>
            <span className="font-mono">/{collection.info.url}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-text/5 border !border-border text-xs text-text font-medium">
            <Layers className="w-3 h-3" />
            {t("collections.channel")} {collection.salesChannelId}
          </div>
        </div>

        <div className="space-y-3 mb-4 flex-1">
          <FilterSection
            title={t("collections.categories")}
            icon={<Layers className="w-3 h-3" />}
            items={filterGroups.categories}
            colorClass="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 !border-border hover:bg-indigo-500/20"
          />

          <FilterSection
            title={t("collections.colors")}
            icon={
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
            }
            items={filterGroups.colors}
            colorClass="bg-pink-500/10 text-pink-600 dark:text-pink-400 !border-border hover:bg-pink-500/20"
          />

          <FilterSection
            title={t("collections.tags")}
            icon={<Tag className="w-3 h-3" />}
            items={filterGroups.tags}
            colorClass="bg-amber-500/10 text-amber-600 dark:text-amber-400 !border-border hover:bg-amber-500/20"
          />

          <FilterSection
            title={t("collections.otherFilters")}
            icon={<Filter className="w-3 h-3" />}
            items={filterGroups.others}
            colorClass="bg-purple-500/10 text-purple-600 dark:text-purple-400 !border-border hover:bg-purple-500/20"
          />
        </div>

        <div className="mt-auto pt-4 border-t !border-border">
          <button
            onClick={() => onEditPins(collection.id)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-text text-text-color text-sm font-semibold rounded-lg hover:bg-text-active transition-all duration-200 shadow-soft hover:shadow-soft-lg group/btn">
            <Settings className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
            {t("collections.editPins")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
