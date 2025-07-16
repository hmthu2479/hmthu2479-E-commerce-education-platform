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
          <ProductCard
            key={product.id}
            {...product}
            index={index}
          />
        ))}
      </div>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_e, page) => setCurrentPage(page)}
        color="success"
        sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px",color:"" }}
      />
    </Box>
  );
};

export default ProductList;
