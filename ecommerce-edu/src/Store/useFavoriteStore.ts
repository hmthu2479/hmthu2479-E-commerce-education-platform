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

  console.log("🔼 Toggle favorite:", { userId, productId: id });

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/favourite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId: id }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("❌ Failed to toggle favorite:", data);
    } else {
      console.log("✅ Toggled favorite:", data);
      get().fetchFavorites(); // Refresh list
    }
  } catch (err) {
    console.error("❌ Network or unexpected error:", err);
  }
},

  isFavorite: (id) => get().favorites.includes(id),
}));
