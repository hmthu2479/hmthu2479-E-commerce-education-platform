import { Alert, Avatar, Rating, Snackbar } from "@mui/material";
import "../Style/ProductCard.css";
import { Product } from "../Model/Product";
import { useFavoriteStore } from "../Store/useFavoriteStore";
import { useProductRatings } from "../hooks/useProductRating";
import { useCartStore } from "../Store/useCartStore";
import { useProductDetailModal } from "../hooks/useProductDetailModal";
import ProductModal from "./ProductModal";
import { useHistoryStore } from "../Store/useHistoryStore";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const ProductCard = (product: Product) => {
  const {
    id,
    title,
    price,
    image,
    author,
    category,
    description,
    avatar,
    index,
  } = product;
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
  const isFavorite = useFavoriteStore((s) => s.isFavorite(id));
  const { average, total, loading, error } = useProductRatings(id);
  const addToHistory = useHistoryStore((s) => s.addToHistory);
  const addToCart = useCartStore((s) => s.addToCart);
  const { open, selectedProduct, handleOpen, handleClose } =
    useProductDetailModal();
  const isInCart = useCartStore((s) => s.items.find((p) => p.id === id)); // kiểm tra có trong giỏ hàng không

  const [showSuccess, setShowSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  if (loading) return <p>Đang tải đánh giá...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div
        className="group cursor-pointer animate-float-up transition-transform duration-500 hover:-translate-y-2 bg-white shadow-xl rounded-2xl relative overflow-hidden bg-white border border-teal-300"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => {
          addToHistory(product.id);
          handleOpen(product);
        }}
      >
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="rounded-t-xl h-44 w-full object-cover"
          />
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${
              category.includes("sách") ? "bg-orange-700" : "bg-green-700"
            } shadow-neon`}
          >
            {category.includes("sách") ? "sách" : "Khóa học"}
          </div>
        </div>

        <div className="p-3 flex flex-col text-left">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-gray-600 text-sm font-comic-neue">
              ({total})
            </span>
            <Rating
              value={average}
              readOnly
              precision={0.5}
              size="small"
              className="text-yellow-500"
            />
          </div>
          <h5 className="text-lg font-bold text-blue-900 line-clamp-2 font-comic-neue">
            {title}
          </h5>
          <p className="my-1 text-gray-500 font-comic-neue text-sm line-clamp-2">
            {description}
          </p>
          <p className="text-base font-semibold text-green-600 font-comic-neue">
            {price.toLocaleString()}₫
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Avatar
                src={avatar || "https://via.placeholder.com/40"}
                alt={author}
                className="w-7 h-7 mr-1"
              />
              <span className="text-sm font-bold text-blue-800 font-comic-neue">
                {author}
              </span>
            </div>
            <button
              className="flex items-center justify-center bg-green-600 text-white text-sm font-comic-neue rounded-full px-4 py-2 hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                // Nếu là sách và đã có trong giỏ hàng → show info
                if (category.includes("khóa học") && isInCart) {
                  setShowInfo(true);
                } else {
                  addToCart(id);
                  setShowSuccess(true);
                }
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          className={`btn-wishlist ${isFavorite ? "favorited" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
        >
          <svg viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thêm vào giỏ hàng thành công
        </Alert>
      </Snackbar>

      {/* Alert Info */}
      <Snackbar
        open={showInfo}
        autoHideDuration={3000}
        onClose={() => setShowInfo(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowInfo(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Sách đã có trong giỏ hàng
        </Alert>
      </Snackbar>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default ProductCard;
