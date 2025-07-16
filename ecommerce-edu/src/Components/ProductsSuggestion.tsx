import { useProductDetailModal } from "../hooks/useProductDetailModal";
import { useProductStore } from "../Store/useProductStore";
import ProductModal from "./ProductModal";

interface ProductSuggestionsProps {
  productIds: number[];
}

export const ProductSuggestions = ({ productIds }: ProductSuggestionsProps) => {
  const { open, handleOpen, handleClose, selectedProduct } =
    useProductDetailModal();
  const { allProducts } = useProductStore();
  const productSuggestions = allProducts.filter((p) => productIds.includes(p.id));
  return (
    <section>
      <div className="p-9 mx-auto bg-gray-50">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-7 mt-1">
          Gợi Ý Sản Phẩm
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productSuggestions.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className={`group cursor-pointer animate-float-up transition-transform duration-500 hover:-translate-y-2 hover:rotate-1 bg-white shadow-xl rounded-2xl p-4 relative overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleOpen(product)}
            >
              {/* background gradient bubble */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-yellow-200 to-lime-300 rounded-full opacity-20 blur-2xl z-0" />

              <img
                src={product.image}
                alt={product.title}
                className="relative z-10 w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-[1.03] transition-transform duration-300"
              />
              <h3 className="relative z-10 text-md font-semibold text-gray-800">
                {product.title}
              </h3>
              <p className="relative z-10 text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="relative z-10 text-md font-bold text-indigo-600">
                  {product.price.toLocaleString()}đ
                </p>
                <button
                  onClick={() => handleOpen(product)}
                  className="cursor-pointer text-blue-600 hover:text-blue-800 flex items-center text-sm font-semibold transition-all"
                >
                  Xem chi tiết
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={open}
          handleClose={handleClose}
        />
      )}
    </section>
  );
};
