import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import { Product } from "../Model/Product";
import { useProductStore } from "../Store/useProductStore";
import { useHistoryStore } from "../Store/useHistoryStore";
import { useEffect, useMemo } from "react";

const History = () => {
  const { allProducts } = useProductStore();
  const seen = useHistoryStore((state) => state.histories);
  const fetchHistory = useHistoryStore((state) => state.fetchHistories);
  useEffect(() => {
    fetchHistory();
  }, []);
  const seenProducts = useMemo(() => {
    return allProducts.filter((p) => seen.includes(p.id));
  }, [seen, allProducts]);

  const settings = {
    dots: true,
    slidesToScroll: 2,
    infinite: false,
    slidesToShow: 4,
    arrows: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1200, // lg
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 960, // md
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 767, // sm
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 468, // xs
        settings: { slidesToShow: 1, centerMode: true },
      },
    ],
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(to right,rgb(208, 242, 247),rgba(118, 243, 145, 0.52))",
        py: 6,
        px: { xs: 2, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        color="primary"
      >
        Lịch sử đã xem
      </Typography>

      {seenProducts.length === 0 ? (
        <Typography variant="body1" textAlign="center">
          Bạn chưa xem sản phẩm nào!
        </Typography>
      ) : (
        <Slider {...settings}>
          {seenProducts.map((product: Product) => (
            <Box
              key={product.id}
              px={2}
              sx={{
                maxWidth: { xs: 240, sm: 260, md: 280 },
                mx: "auto",
                xs: 2,
                sm: 2,
                md: 4,
                xl: 2,
              }}
            >
              <ProductCard {...product} />
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default History;
