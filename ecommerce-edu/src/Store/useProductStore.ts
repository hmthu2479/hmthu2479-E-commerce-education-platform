import { create } from "zustand";
import { Product, Filters } from "../Model/Product";
import axios from "axios";

interface ProductStore {
  products: Product[];
  allProducts: Product[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  fetchFilteredProducts: (filters: Filters, page?: number, limit?: number) => Promise<void>;
  fetchProducts :()=> Promise<void>;
}

const buildFilterQuery = (filters: Filters): string => {
  const params = new URLSearchParams();

  [...filters.keyword, ...filters.suggestedKeyword].forEach(kw => {
    if (kw.trim()) params.append("q", kw.trim());
  });

  filters.categories.forEach(cat => params.append("category", cat));

  filters.priceRanges.forEach(range => {
    if (range.endsWith("+")) {
      params.append("price_gte", (parseInt(range) * 1000).toString());
    } else {
      const [min, max] = range.split("-").map(x => parseInt(x) * 1000);
      params.append("price_gte", min.toString());
      params.append("price_lte", max.toString());
    }
  });
      
  return params.toString();
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  allProducts:[],
  isLoading: false,
  error: null,
  totalPages: 1,

  fetchFilteredProducts: async (filters, page = 1, limit = 6) => {
    set({ isLoading: true, error: null });
    try {
      const query = buildFilterQuery(filters);
            console.log("🚀 ~ fetchFilteredProducts: ~ query:", query)
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products?page=${page}&limit=${limit}&${query}`);
      
      set({
        products: res.data.data,
        totalPages: res.data.totalPages,
        isLoading: false
      });
    } catch (err) {
      console.error("Fetch failed:", err);
      set({ isLoading: false, error: "Đã có lỗi xảy ra" });
    }
  },

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
      set({ allProducts: res.data, isLoading: false });
    } catch (e) {
      console.error("Fetch failed:", e);
      set({ isLoading: false, error: "Đã có lỗi xảy ra" });
    }
  }
}));

