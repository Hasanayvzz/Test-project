import { Product } from "@/types/productTypes";
import { Check } from "lucide-react";

const ProductCard = ({
  product,
  isAdded,
  onDragStart,
}: {
  product: Product;
  isAdded: boolean;
  onDragStart: (e: React.DragEvent, product: Product) => void;
}) => {
  return (
    <div
      draggable={!isAdded}
      onDragStart={(e) => onDragStart(e, product)}
      className={`bg-surface rounded-xl  overflow-hidden !shadow-card !hover:shadow-card-hover transition-all duration-300 border !border-border ${
        !isAdded ? "cursor-move" : "cursor-not-allowed"
      }`}>
      <div className="relative pb-[133%] bg-bg-alt">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
            isAdded ? "blur-sm" : ""
          }`}
          loading="lazy"
        />
        {isAdded && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2">
              <Check className="w-5 h-5" />
              Eklendi
            </div>
          </div>
        )}
        {product.outOfStock && !isAdded && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md">
            Stokta Yok
          </div>
        )}
        {product.isSaleB2B && !isAdded && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md">
            B2B
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-copy-primary mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-copy-secondary mb-2">
          <span className="font-mono bg-bg-alt py-1 rounded">
            {product.productCode}
          </span>
          <span className="px-2 py-1 bg-text/10 text-text rounded font-medium">
            {product.colorCode}
          </span>
        </div>
        <div className="text-xs text-copy-secondary">
          {new Date(product.createdOn).toLocaleDateString("tr-TR")}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
