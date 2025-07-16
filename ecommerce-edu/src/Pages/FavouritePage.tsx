import { Box, Typography } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import { useFavoriteStore } from "../Store/useFavoriteStore";
import { useProductStore } from "../Store/useProductStore";

const FavoritePage = () => {
  const { allProducts } = useProductStore();
  const { favorites } = useFavoriteStore();
  const favoriteProducts = allProducts.filter((p) => favorites.includes(p.id));
  return (
    <>
      <Box
        sx={{
          py: 6,
          px: { xs: 2, md: 6 },
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #f0f4f8,rgb(116, 250, 104))",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          textAlign="center"
          color="primary"
        >
          Danh sách yêu thích ❤️
        </Typography>

        {favoriteProducts.length === 0 ? (
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Bạn chưa yêu thích sản phẩm nào!
          </Typography>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {favoriteProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                {...product}
                index={index}  
              />
            ))}
          </div>
        )}
      </Box>

    </>
  );
};

export default FavoritePage;
