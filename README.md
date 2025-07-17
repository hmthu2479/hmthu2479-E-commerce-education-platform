# 🛒 Ecommerce EDU - React + Vite + TypeScript + ExpressJS + MongoDB

Ứng dụng thương mại điện tử mẫu dùng React, TypeScript, MUI, TailwindCSS, Zustand, React Router, và ExpressJS + MongoDB cho backend mock API.

---

## ✅ Cách chạy

### 1. Khởi tạo frontend với Vite + React + TypeScript

```bash
npm create vite@6.0.0 ecommerce-edu -- --template react-ts
cd ecommerce-edu
npm install
npm run dev
```

---

### 2. Cài đặt UI Frameworks và thư viện hỗ trợ

```bash
# MUI và Emotion
npm install @mui/material @emotion/react @emotion/styled

# Icon MUI
npm install @mui/icons-material

# TailwindCSS
npm install tailwindcss

# Router, HTTP client, state management
npm install react-router-dom axios zustand
```

---

### 3. Tạo backend mock API với ExpressJS + MongoDB

```bash
# Di chuyển ra ngoài thư mục frontend
cd ..
mkdir mock-express-api
cd mock-express-api

# Khởi tạo NodeJS project
npm init -y

# Cài đặt Express, MongoDB và middleware
npm install express mongoose cors body-parser

# Cài nodemon cho dev
npm install --save-dev nodemon
```

---

### 4. Cấu hình MongoDB

* Tạo file `.env`:

```env
MONGO_URI=mongodb+srv://...
PORT=3000
```

* Tạo file `db.js`:

```js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

### 5. Tạo file `server.js`

```js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");

const productRoutes = require("./routes/products");
const ratingRoutes = require("./routes/rating");
const favoriteRoutes = require("./routes/favourite");
const historyRoutes = require("./routes/history");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/favourite", favoriteRoutes);
app.use("/api/history", historyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Mock API running at http://localhost:${PORT}`);
});
```

---

### 6. Thêm script vào `package.json`

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 🧱 MongoDB Models

* `/models/product.js`
* `/models/rating.js`
* `/models/favorite.js`
* `/models/cart.js`
* `/models/suggestion.js`
* `/models/history.js`

Mỗi file sử dụng `mongoose.Schema`, ví dụ:

```js
// models/rating.js
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: String,
  avatar: String,
  content: String,
  stars: { type: Number, min: 1, max: 5 },
  date: String,
  productId: Number,
});

module.exports = mongoose.model("Rating", ratingSchema);
```

---

## 🏃‍♂️ Chạy dự án

### 1. Chạy frontend (React)

```bash
cd ecommerce-edu
npm run dev
```

Truy cập: [http://localhost:5173](http://localhost:5173)

---

### 2. Chạy backend (Express + MongoDB)

```bash
cd ../mock-express-api
npm run dev
```

Truy cập: [http://localhost:3000/api/products](http://localhost:3000/api/products)

> Đảm bảo MongoDB đang chạy ở `mongodb+srv....`

---

## 📁 Cấu trúc thư mục

```
project-root/
├── ecommerce-edu/         # Frontend app (React + Vite)
└── mock-express-api/      # Backend API (ExpressJS + MongoDB)
```

---

## 📌 Ghi chú

* Cần cài đặt MongoDB (local hoặc MongoDB Atlas).
* Có thể sử dụng [MongoDB Compass](https://www.mongodb.com/products/compass) để kiểm tra dữ liệu.
* Đảm bảo `.env` chứa `MONGO_URI` đúng địa chỉ DB.

