export interface Product {
  productCode: string;
  colorCode: string;
  name: string;
  outOfStock: boolean;
  isSaleB2B: boolean;
  imageUrl: string;
  createdOn: string;
}

export interface FilterValue {
  value: string;
  valueName: string | null;
}

export interface FilterData {
  id: string;
  title: string;
  values: FilterValue[];
  currency: string | null;
  comparisonType: number;
}
