"use client";

import { useEffect, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { ApiRequest } from "@/service/apiService";
import { AlertCircle, Loader2, Grid, List, Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { FilterData, Product } from "@/types/productTypes";
import ProductFilter from "../Product/ProductFilter";
import ProductCard from "../Product/ProductCard";

import LoadingScreen from "../ui/LoadingScreen";
import ProductDropzone from "../Product/ProductDropzone";
import DashboardLayout from "../layout/DashboardLayout";

export default function EditProductsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterData[]>([]);
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [meta, setMeta] = useState({ page: 1, pageSize: 36, totalProduct: 0 });
  const params = useParams();

  const { collectionId } = params;

  const fetchData = async (filterParams = selectedFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const filtersRes = await ApiRequest.getFiltersForConstants(
        Number(collectionId)
      );
      if (filtersRes?.data) {
        setFilters(filtersRes.data);
      }

      const additionalFilters = Object.entries(filterParams).flatMap(
        ([id, values]) => values.map((value) => ({ id, value }))
      );

      const productsRes = await ApiRequest.getProductsForConstants(
        {
          request: {
            additionalFilters,
            page: meta.page,
            pageSize: meta.pageSize,
          },
        },
        String(collectionId)
      );

      if (productsRes?.data) {
        setProducts(productsRes.data.data || []);
        setMeta(productsRes.data.meta || meta);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      setError("Veriler yüklenirken bir hata oluştu");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionId]);

  useEffect(() => {
    if (filters.length > 0) {
      fetchData(selectedFilters);
    }
  }, [selectedFilters]);

  const handleFilterChange = (filterId: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: values,
    }));
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
  };

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const handleDragStart = (e: React.DragEvent, product: Product) => {
    e.dataTransfer.setData("productCode", product.productCode);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const productCode = e.dataTransfer.getData("productCode");
    const product = products.find((p) => p.productCode === productCode);

    if (product && !addedProducts.find((p) => p.productCode === productCode)) {
      setAddedProducts([...addedProducts, product]);
    }
  };

  const handleRemove = (productCode: string) => {
    setAddedProducts(
      addedProducts.filter((p) => p.productCode !== productCode)
    );
  };

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const newProducts = [...addedProducts];
    const draggedProduct = newProducts[dragIndex];
    newProducts.splice(dragIndex, 1);
    newProducts.splice(hoverIndex, 0, draggedProduct);
    setAddedProducts(newProducts);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-bg transition-colors duration-300">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-copy-primary mb-2">
              Ürünler
            </h1>
            <p className="text-copy-secondary">
              Toplam {meta.pageSize} ürün bulundu
              {activeFilterCount > 0 && ` • ${activeFilterCount} filtre aktif`}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-red-600 dark:text-red-400 font-medium">
                  {error}
                </p>
              </div>
            </div>
          )}

          {isLoading && <LoadingScreen text="Ürünler yükleniyor..." />}

          {!isLoading && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-72 flex-shrink-0">
                <div className="sticky top-4">
                  <ProductFilter
                    filters={filters}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onClearAll={handleClearAllFilters}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {products.length > 0 ? (
                  <>
                    <div className="flex-1 min-w-0">
                      {products.length > 0 ? (
                        <>
                          <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6">
                            {products.map((product) => (
                              <ProductCard
                                key={product.productCode}
                                product={product}
                                isAdded={
                                  !!addedProducts.find(
                                    (p) => p.productCode === product.productCode
                                  )
                                }
                                onDragStart={handleDragStart}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="bg-surface rounded-xl shadow-sm p-12 text-center border border-border">
                          <div className="text-copy-tertiary mb-4">
                            <Filter className="w-16 h-16 mx-auto" />
                          </div>
                          <h3 className="text-xl font-semibold text-copy-primary mb-2">
                            Ürün bulunamadı
                          </h3>
                          <p className="text-copy-secondary mb-4">
                            Seçtiğiniz filtrelere uygun ürün bulunmamaktadır.
                          </p>
                          {activeFilterCount > 0 && (
                            <button
                              onClick={handleClearAllFilters}
                              className="px-4 py-2 bg-text text-white rounded-lg hover:bg-text/90 transition-colors shadow-md">
                              Filtreleri Temizle
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-surface rounded-xl shadow-sm p-12 text-center border border-border">
                    <div className="text-copy-tertiary mb-4">
                      <Filter className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-copy-primary mb-2">
                      Ürün bulunamadı
                    </h3>
                    <p className="text-copy-secondary mb-4">
                      Seçtiğiniz filtrelere uygun ürün bulunmamaktadır.
                    </p>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={handleClearAllFilters}
                        className="px-4 py-2 bg-text text-white rounded-lg hover:bg-text/90 transition-colors shadow-md">
                        Filtreleri Temizle
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="lg:w-96 flex-shrink-0">
                <ProductDropzone
                  setAddedProducts={setAddedProducts}
                  addedProducts={addedProducts}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onReorder={handleReorder}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
