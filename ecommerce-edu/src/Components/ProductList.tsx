import ProductCard from "./ProductCard";
import Pagination from "@mui/material/Pagination";
import { Product } from "../Model/Product";
import { Box } from "@mui/material";
import { useProductStore } from "../Store/useProductStore";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  products: Product[];
}

const ProductList = ({ currentPage, products, setCurrentPage }: Props) => {
  const { totalPages } = useProductStore();

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </div>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_e, page) => setCurrentPage(page)}
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          "& .MuiPaginationItem-root": {
            color: "green", // màu chữ của item
            borderColor: "green", // viền
          },
          "& .Mui-selected": {
            backgroundColor: "green", // nền item được chọn
            color: "white", // chữ trắng
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#a5d6a7", // xanh nhạt khi hover
          },
        }}
      />
    </Box>
  );
};

export default ProductList;
