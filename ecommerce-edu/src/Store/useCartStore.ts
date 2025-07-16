import { create } from "zustand";
import { CartItem } from "../Components/Cart";

interface CartStore {
  items: CartItem[];
  fetchCart: () => void;
  addToCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  fetchCart: async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cart?userId=${userId}`);
    const data = await res.json();
    console.log("🚀 ~ fetchCart: ~ data:", data)
    set({ items: data });
  },
  addToCart: async (id) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    await fetch(`${import.meta.env.VITE_BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId: id }),
    });


    get().fetchCart(); // Refresh list
  },
  updateQuantity: async (id, quantity) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    await fetch(`${import.meta.env.VITE_BASE_URL}/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, quantity }),
    });

    get().fetchCart(); // Refresh list
  },


  removeFromCart: async (id) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    await fetch(`${import.meta.env.VITE_BASE_URL}/cart/${id}?userId=${userId}`, {
      method: "DELETE",
    });

    get().fetchCart(); // Refresh list
  },
}));
