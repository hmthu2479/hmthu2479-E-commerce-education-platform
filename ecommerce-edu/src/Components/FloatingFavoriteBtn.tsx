import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const FloatingFavoriteButton = () => {
  const navigate = useNavigate();
  return (
    <div className="group fixed bottom-[30px] z-[999] right-[30px] flex justify-center items-center text-sm font-bold">
      <div
        className="shadow-md flex items-center group-hover:gap-2 bg-red-400 hover:bg-red-400 text-white p-3 rounded-full cursor-pointer duration-300"
        onClick={() => navigate("/favorite")}
      >
        <FavoriteIcon />
        <span className="text-[0px] group-hover:text-sm duration-300">
          Danh sách yêu thích
        </span>
      </div>
    </div>
  );
};

export default FloatingFavoriteButton;
