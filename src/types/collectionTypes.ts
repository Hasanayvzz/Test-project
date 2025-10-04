export interface FilterItem {
  id: string;
  title: string;
  value: string;
  valueName: string;
  currency: string | null;
  comparisonType: number;
}

export interface CollectionFilters {
  useOrLogic: boolean;
  filters: FilterItem[];
}

export interface CollectionInfo {
  id: number;
  name: string;
  description: string;
  url: string;
  langCode: string;
}

export interface Collection {
  id: number;
  filters: CollectionFilters;
  type: number;
  info: CollectionInfo;
  salesChannelId: number;
  products: any | null;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CollectionsResponse {
  meta: PaginationMeta;
  data: Collection[];
}

export interface CollectionCardProps {
  collection: Collection;
  onEditPins: (collectionId: number) => void;
}
export interface CollectionsGridProps {
  collections: Collection[];
  onEditPins: (collectionId: number) => void;
}
export interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}
