import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProducList from "./Pages/ProductListPage";
import Navbar from "./Components/Navbar";
import FavoritePage from "./Pages/FavouritePage";
import FloatingFavoriteButton from "./Components/FloatingFavoriteBtn";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFavoriteStore } from "./Store/useFavoriteStore";
import { useHistoryStore } from "./Store/useHistoryStore";
import Cart from "./Components/Cart";
import { useCartStore } from "./Store/useCartStore";
import { useProductStore } from "./Store/useProductStore";

function App() {
  const fetchFavorites = useFavoriteStore((state) => state.fetchFavorites);
  const fetchHistory = useHistoryStore((state) => state.fetchHistories);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const {fetchProducts } = useProductStore();
  useEffect(() => {
    const existingUserId = localStorage.getItem("userId");
    if (!existingUserId) {
      const newUserId = uuidv4(); // tạo UUID duy nhất
      localStorage.setItem("userId", newUserId);
      console.log("🔐 Tạo userId mới:", newUserId);
    } else {
      console.log("✅ Đã có userId:", existingUserId);
      fetchFavorites();
      fetchHistory();
      fetchCart();
      fetchProducts();
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProducList />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
      <Cart />
      <FloatingFavoriteButton />
    </Router>
  );
}

export default App;
