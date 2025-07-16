import Grid from "@mui/material/Grid";
import FilterSidebar from "../Components/FilterSidebar";
import HeroBanner from "../Components/HeroBanner";
import ProductList from "../Components/ProductList";
import History from "../Components/History";
import { useEffect, useState } from "react";
import { useProductStore } from "../Store/useProductStore";
import Alert from "@mui/material/Alert";
import { Filters } from "../Model/Product";
import FilterChipsBar from "../Components/FilterChipBar";
import { Box } from "@mui/joy";
import { ProductSuggestions } from "../Components/ProductsSuggestion";
import ProductListSkeleton from "../Components/ProductListSkeleton";

function ProducList() {
  const { error, products, isLoading } = useProductStore();

  const [filters, setFilters] = useState<Filters>({
    keyword: [],
    suggestedKeyword: [],
    priceRanges: [],
    categories: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const fetchFilteredProducts = useProductStore((s) => s.fetchFilteredProducts);
  const [suggest, setSuggest] = useState([]);

  const fetchSuggestions = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/suggestion?userId=${userId}`
    );
    const data = await res.json();
    setSuggest(data);
  };

  // Reset page về 1 khi filters thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    fetchFilteredProducts(filters, currentPage);
  }, [currentPage, filters]);

  if (error)
    return (
      <Alert variant="filled" severity="error">
        Không thể lấy API lúc này
      </Alert>
    );

  const handleFilterChange = (key: string, value: Filters[keyof Filters]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <HeroBanner filters={filters} onFilterChange={handleFilterChange} />
      <Grid container spacing={3} padding={3}>
        {/* Sidebar bên trái */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Grid>

        {/* Danh sách sản phẩm bên phải */}
        <Grid size={{ xs: 12, md: 9 }}>
          <FilterChipsBar filters={filters} setFilters={setFilters} />
          <Box
            sx={{
              animation: "fadeIn 0.3s ease-in-out",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            {isLoading ? (
              <ProductListSkeleton />
            ) : (
              <ProductList
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                products={products}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <ProductSuggestions productIds={suggest} />
      <History />
    </>
  );
}

export default ProducList;
