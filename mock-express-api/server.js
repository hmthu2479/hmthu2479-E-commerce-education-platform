const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const cartRoutes = require("./routes/cart");
const favouriteRoutes = require("./routes/favourite");
const productsRoutes = require("./routes/products");
const ratingRoutes = require("./routes/rating");
const suggestionRoutes = require("./routes/suggestion");
const historyRoutes = require("./routes/history");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// Root route
app.get("/", (req, res) => {
  res.send("Mock API is running ✅");
});
// Route riêng biệt
app.use("/api/cart", cartRoutes);
app.use("/api/favourite", favouriteRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/suggestion", suggestionRoutes);
app.use("/api/history", historyRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
