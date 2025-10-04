import { FilterData, FilterValue } from "@/types/productTypes";
import { ChevronDown, Filter, Search } from "lucide-react";
import { useState } from "react";

const ProductFilter = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
}: {
  filters: FilterData[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
  onClearAll: () => void;
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFilterSelect = (filterId: string, value: string) => {
    const currentValues = selectedFilters[filterId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    onFilterChange(filterId, newValues);
  };

  const filterValues = (values: FilterValue[], filterId: string) => {
    const term = searchTerms[filterId]?.toLowerCase() || "";
    if (!term) return values;

    return values.filter(
      (v) =>
        v.valueName?.toLowerCase().includes(term) ||
        v.value?.toLowerCase().includes(term)
    );
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    (arr) => arr.length > 0
  );

  return (
    <div className="bg-surface rounded-xl shadow-sm p-6 border !border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-copy-primary" />
          <h2 className="text-lg font-bold text-copy-primary">Filtreler</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors">
            Temizle
          </button>
        )}
      </div>

      <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
        {filters.map((filter) => {
          const isOpen = openSections[filter.id];
          const selectedCount = selectedFilters[filter.id]?.length || 0;
          const filteredValues = filterValues(filter.values, filter.id);

          return (
            <div
              key={filter.id}
              className="border-b border-border pb-4 last:border-b-0">
              <button
                onClick={() => toggleSection(filter.id)}
                className="w-full flex items-center justify-between py-2 text-left hover:bg-bg-alt rounded-lg px-2 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-copy-primary text-sm">
                    {filter.title}
                  </span>
                  {selectedCount > 0 && (
                    <span className="!bg-text text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      {selectedCount}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-copy-secondary transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-2 pl-2">
                  {filter.values.length > 5 && (
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-copy-tertiary" />
                      <input
                        type="text"
                        placeholder="Ara..."
                        value={searchTerms[filter.id] || ""}
                        onChange={(e) =>
                          setSearchTerms((prev) => ({
                            ...prev,
                            [filter.id]: e.target.value,
                          }))
                        }
                        className="w-full pl-9 pr-3 py-2 text-sm border !border-border rounded-lg bg-transparent text-copy-primary focus:ring-2  focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  )}

                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {filteredValues.length === 0 ? (
                      <p className="text-sm text-copy-tertiary py-2">
                        Sonuç bulunamadı
                      </p>
                    ) : (
                      filteredValues.map((item) => {
                        const displayName = item.valueName || item.value;
                        const isSelected = selectedFilters[filter.id]?.includes(
                          item.value
                        );

                        return (
                          <label
                            key={item.value}
                            className="flex items-center gap-2 py-1.5 px-2 hover:bg-bg-alt rounded-lg cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                handleFilterSelect(filter.id, item.value)
                              }
                              className="w-4 h-4 text-text border-border rounded focus:ring-text focus:ring-2"
                            />
                            <span className="text-sm text-copy-secondary">
                              {displayName}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductFilter;
