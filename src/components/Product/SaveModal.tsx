import { X } from "lucide-react";
import { useState } from "react";

interface Product {
  productCode: string;
  name: string;
  imageUrl: string;
}

interface SaveConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  addedProducts: Product[];
  onSave: () => void;
}

const SaveModal: React.FC<SaveConfirmationModalProps> = ({
  isOpen,
  onClose,
  addedProducts,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Kayıt Onayı</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-lg mb-6">
            Seçtiğiniz ürünler aşağıdaki sırayla kayıt edilecektir. Onaylıyor
            musunuz?
          </p>

          <div className="bg-gray-50 rounded-lg p-4 max-h-[40vh] overflow-y-auto">
            <div className="space-y-3">
              {addedProducts.map((product, index) => (
                <div
                  key={product.productCode}
                  className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.productCode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors">
            İptal
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
