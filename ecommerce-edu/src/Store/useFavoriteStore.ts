import { create } from "zustand";

interface FavoriteStore {
  favorites: number[];
  fetchFavorites: () => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  fetchFavorites: async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/favourite?userId=${userId}`);
    const data = await res.json();
    set({ favorites: data });
  },
  toggleFavorite: async (id) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    await fetch(`${import.meta.env.VITE_BASE_URL}/favourite/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId: id }),
    });

    get().fetchFavorites(); // Refresh list
  },
  isFavorite: (id) => get().favorites.includes(id),
}));
