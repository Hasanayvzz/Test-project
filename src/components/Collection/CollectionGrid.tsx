import { Collection, PaginationMeta } from "@/types/collectionTypes";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import CollectionCard from "./CollectionCard";
import { useTranslation } from "react-i18next";

interface CollectionsGridProps {
  collections: Collection[];
  onEditPins: (collectionId: number) => void;
}

const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collections,
  onEditPins,
}) => {
  const { t } = useTranslation();
  if (collections.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card border !border-border mb-4">
          <AlertCircle className="w-8 h-8 text-copy-secondary" />
        </div>
        <p className="text-copy-primary font-medium mb-1">
          {t("collections.notFound")}
        </p>
        <p className="text-copy-secondary text-sm">
          {t("collections.noCollections")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {collections.map((collection, index) => (
        <div
          key={collection.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-slide-up">
          <CollectionCard collection={collection} onEditPins={onEditPins} />
        </div>
      ))}
    </div>
  );
};

export default CollectionsGrid;
