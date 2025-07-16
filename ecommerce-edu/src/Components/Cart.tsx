import { useState, useRef, useEffect } from "react";
import { Product } from "../Model/Product";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCartStore } from "../Store/useCartStore";

export interface CartItem extends Product {
  quantity: number;
  userId: string;
  itemId: number;
}
export interface CartList extends Product {
  items: CartItem[];
  products: Product[];
}

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartPanelRef = useRef<HTMLDivElement | null>(null);
  const cartBtnRef = useRef<HTMLDivElement | null>(null);
  const updateCart = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeFromCart);
  const cartItems = useCartStore((s) => s.items);

  const updateCartCount = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.category.includes("sách") ? item.quantity : 1),
      0
    );
  };

  const handleQuantityChange = (id: number, change: number) => {
    const item = cartItems.find((item) => {
      return item.id === id;
    });
    console.log("🚀 ~ handleQuantityChange ~ item:", item);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateCart(id, newQuantity);
    }
  };

  const toggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      cartPanelRef.current &&
      !cartPanelRef.current.contains(e.target as Node) &&
      !cartBtnRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-[90px] right-[31px] z-[999]">
      {/* 🛒 Floating Cart Panel */}
      {isOpen && (
        <div
          ref={cartPanelRef}
          className="fixed bottom-[120px] right-[54px] z-[999] w-90 max-h-[65vh] overflow-y-auto rounded-xl bg-white shadow-2xl p-4 mb-5 transition-all duration-300 animate-fade-in-up scrollbar-custom"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Giỏ hàng ({updateCartCount()} sản phẩm)
          </h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Chưa có sản phẩm nào.</p>
          ) : (
            <ul className="space-y-3 border border-gray-200 rounded-lg p-3 divide-y divide-gray-100 bg-gray-50">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 items-center pt-2 first:pt-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.author}</p>
                    <p className="text-xs text-gray-500">
                      {item.price.toLocaleString()}đ
                    </p>
                  </div>
                  {item.category.includes("sách") ? (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="cursor-pointer w-6 h-6 text-sm rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-sm text-gray-600 px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="cursor-pointer w-6 h-6 text-sm rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="cursor-pointer w-6 h-6 text-sm rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        x
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 🟡 Floating Button */}
      <div
        ref={cartBtnRef}
        onClick={toggleCart}
        className={`fixed bottom-[90px] right-[30.5px] z-[998] group shadow-md flex items-center bg-gradient-to-br from-lime-300 to-yellow-200 p-3 rounded-full cursor-pointer transition-all duration-300 ${
          isOpen ? "scale-90 opacity-70" : "scale-100"
        }`}
      >
        <ShoppingBagIcon className="w-6 h-6 text-gray-600" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {updateCartCount()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Cart;
