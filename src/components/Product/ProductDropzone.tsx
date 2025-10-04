import { Product } from "@/types/productTypes";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import SaveModal from "./SaveModal";
import { toast } from "react-toastify";

const ProductDropzone = ({
  addedProducts,
  onDrop,
  onRemove,
  onReorder,
  setAddedProducts,
}: {
  addedProducts: Product[];
  setAddedProducts: any;
  onDrop: (e: React.DragEvent) => void;
  onRemove: (productCode: string) => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = (): void => {
    setIsModalOpen(false);

    toast.success("Ürünler başarıyla kayıt edildi!", {
      position: "top-right",
      autoClose: 2000,
    });
    setAddedProducts([]);
  };
  return (
    <div className="bg-surface rounded-xl shadow-sm border !border-border sticky top-4">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-copy-primary mb-2">
          Seçilen Ürünler
        </h2>
        <p className="text-sm text-copy-secondary">
          {addedProducts.length} ürün eklendi
        </p>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`min-h-[400px] p-6 ${
          addedProducts.length === 0 ? "flex items-center justify-center" : ""
        }`}>
        {addedProducts.length === 0 ? (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-bg-alt flex items-center justify-center">
              <Filter className="w-10 h-10 text-copy-tertiary text-text" />
            </div>
            <p className="text-copy-secondary text-sm">
              Ürünleri buraya sürükleyin
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {addedProducts.map((product, index) => (
              <div
                key={product.productCode}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-bg rounded-lg p-4 flex items-center gap-4 cursor-move hover:shadow-md transition-all ${
                  draggedIndex === index ? "opacity-50" : ""
                }`}>
                <div className="w-16 h-20 flex-shrink-0 bg-bg-alt rounded overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-copy-primary line-clamp-1 mb-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-copy-secondary font-mono">
                    {product.productCode}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(product.productCode)}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group !text-text">
                  <X className="w-5 h-5 text-copy-tertiary group-hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border flex gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={addedProducts.length === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Kaydet
        </button>
        <button
          onClick={() => window.history.back()}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors">
          Vazgeç
        </button>
      </div>

      <SaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addedProducts={addedProducts}
        onSave={handleSave}
      />
    </div>
  );
};
export default ProductDropzone;
