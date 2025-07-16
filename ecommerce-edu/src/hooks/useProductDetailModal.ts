import { useState } from "react";
import { Product } from "../Model/Product";

export interface ProductModal {
  product:Product;
  open: boolean;
  handleClose: () => void;
}
export const useProductDetailModal = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return {
    open : selectedProduct!==null,
    selectedProduct,
    handleOpen,
    handleClose,
  };
};
