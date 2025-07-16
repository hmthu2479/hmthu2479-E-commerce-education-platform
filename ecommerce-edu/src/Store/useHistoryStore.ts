import { create } from "zustand";

interface HistoryStore {
  histories: number[];
  fetchHistories: () => void;
  addToHistory: (id: number) => void;
  isHistory: (id: number) => boolean;
}
export const useHistoryStore = create<HistoryStore>((set, get) => ({
  histories: [],
  fetchHistories: async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/history?userId=${userId}`);
    const data = await res.json();
    set({ histories: data });
  },
  addToHistory: async (id) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    await fetch(`${import.meta.env.VITE_BASE_URL}/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId: id }),
    });


    get().fetchHistories(); // Refresh list
  },
  isHistory: (id) => get().histories.includes(id),
}));
