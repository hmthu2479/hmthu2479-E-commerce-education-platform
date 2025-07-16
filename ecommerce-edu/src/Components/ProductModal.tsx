import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Avatar,
  Box,
  Divider,
  Stack,
  Rating,
} from "@mui/material";
import { Sheet, TabList, TabPanel, Tabs, Tab } from "@mui/joy";

import { useProductRatings } from "../hooks/useProductRating";
import type { ProductModal as ProductModalProps }  from "../hooks/useProductDetailModal";

const ProductModal = ({product,open,handleClose}:ProductModalProps) => {
  const { ratings, average, total } = useProductRatings(product.id);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
      className="modal-scroll"
    >
      <Fade in={open}>
        <Sheet className="modal-box bg-gradient-to-br from-white via-teal-50 to-white rounded-2xl p-6 max-w-2xl mx-auto my-6 shadow-lg">
          <img
            src={product.image}
            alt={product.title}
            className="modal-image rounded-2xl h-64 object-cover w-full mb-6 border-4 border-yellow-300"
          />
          <Tabs defaultValue={0} className="font-comic-neue">
            <TabList className="p-1">
              <Tab className="text-blue-800 font-bold hover:bg-yellow-300 rounded-lg px-4 py-2 transition-colors">
                Mô tả
              </Tab>
              <Tab className="text-blue-800 font-bold hover:bg-yellow-300 rounded-lg px-4 py-2 transition-colors">
                Về tác giả/giáo viên
              </Tab>
              <Tab className="text-blue-800 font-bold hover:bg-yellow-300 rounded-lg px-4 py-2 transition-colors">
                Đánh giá
              </Tab>
            </TabList>
            <TabPanel value={0}>
              <Typography
                variant="h6"
                className="text-green-600 font-bold mb-3"
              >
                Mô tả khóa học
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-700 font-comic-neue leading-relaxed"
              >
                {product.description}
              </Typography>
            </TabPanel>
            <TabPanel value={1}>
              <Typography variant="h6" className="text-blue-800 font-bold mb-3">
                Thông tin về {product.author}
              </Typography>
              <div className="flex items-center mt-2">
                <Avatar
                  src={product.avatar || "https://via.placeholder.com/40"}
                  alt={product.author}
                  className="w-12 h-12 mr-3 border-2 border-pink-300"
                />
                <Typography
                  variant="body1"
                  className="text-gray-700 font-comic-neue"
                >
                  {product.author} là một chuyên gia vui vẻ, yêu thích giúp các bạn nhỏ
                  học tập một cách thú vị!
                </Typography>
              </div>
            </TabPanel>
            <TabPanel value={2}>
              {!ratings ? (
                <Typography className="font-comic-neue text-gray-700">
                  Đang tải đánh giá...
                </Typography>
              ) : (
                <Box>
                  <Typography
                    variant="h6"
                    className="font-comic-neue text-yellow-600 mb-3"
                  >
                    {`⭐ ${average}/5 (${total} lượt đánh giá)`}
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: "#facc15" }} />
                  <Stack spacing={3}>
                    {ratings.map((rating) => (
                      <Box
                        key={rating.id}
                        display="flex"
                        gap={2}
                        className="bg-white p-2 rounded-lg shadow-md"
                      >
                        <Avatar
                          src={rating.avatar}
                          alt={rating.name}
                          className="w-10 h-10"
                        />
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            className="font-comic-neue text-blue-800"
                          >
                            {rating.name}
                          </Typography>
                          <Box display="flex" flexDirection="row" alignItems="center">
                            <Rating
                              value={rating.stars}
                              readOnly
                              precision={0.5}
                              size="small"
                              className="text-yellow-500"
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ ml: 2 }}
                              className="font-comic-neue text-gray-600"
                            >
                              {rating.date}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ mt: 1 }}
                            className="font-comic-neue text-gray-700"
                          >
                            {rating.content}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </TabPanel>
          </Tabs>
        </Sheet>
      </Fade>
    </Modal>
  );
};

export default ProductModal;
