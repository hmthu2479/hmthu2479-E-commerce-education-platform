# 🛒 Ecommerce EDU - React + Vite + TypeScript + ExpressJS

Dự án mẫu ứng dụng thương mại điện tử sử dụng React, Vite, TypeScript, MUI, TailwindCSS, Zustand, React Router và ExpressJS cho mock API.

---

## ✅ Cách chạy

### 1. Khởi tạo frontend với Vite + React + TypeScript

```bash
npm create vite@6.0.0 ecommerce-edu -- --template react-ts
cd ecommerce-edu
npm install
npm run dev
```

### 2. Cài đặt UI Frameworks và thư viện hỗ trợ

```bash
# MUI và Emotion
npm install @mui/material @emotion/react @emotion/styled

# Icon MUI
npm install @mui/icons-material

# MUI Joy UI (tuỳ chọn)
npm install @mui/joy @emotion/react @emotion/styled

# TailwindCSS
npm install tailwindcss

# Router, HTTP client, state management
npm install react-router-dom axios zustand
```

---

### 3. Khởi tạo mock API với ExpressJS

```bash
# Di chuyển ra ngoài thư mục ecommerce-edu
cd ..
mkdir mock-express-api
cd mock-express-api

# Khởi tạo NodeJS project
npm init -y

# Cài đặt Express và các middleware
npm install express body-parser cors

# Cài đặt nodemon để tự động reload server
npm install --save-dev nodemon
```

Tạo file `server.js`:

```js
// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      title: "IELTS Chiến Lược 6 Tuần",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      price: 899000,
      discountPercent: 20,
      image:
        "https://img.freepik.com/premium-vector/cute-book-herbarium-journal-literature-world-book-day-vector-illustration-flat-style_254685-2882.jpg?semt=ais_hybrid&w=740",
      author: "Giáo viên A",
      description:
        "Khóa học luyện thi IELTS trong 6 tuần, phù hợp cho người có nền tảng cơ bản muốn đạt 6.5+ nhanh chóng. Bao gồm bài giảng, đề luyện tập, và hỗ trợ chấm bài viết hàng tuần.",
      category: ["khóa học", "IELTS"],
      isFavorite: false,
      isSeen: false,
      ratingIds: [101, 102],
    },
    {
      id: 2,
      title: "Bộ Đề TOEIC Tối Đa 990",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      price: 199000,
      discountPercent: 30,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_G4i8eBx4KVheUN4u8eeb0bmZS1NnFQY0dg&s",
      author: "Tác giả B",
      description:
        "Tài liệu luyện thi TOEIC chuyên sâu giúp đạt điểm tối đa. Gồm 10 đề thi thử, mẹo làm bài, và từ vựng chuyên biệt theo từng chủ đề thường gặp trong đề thi.",
      category: ["sách", "TOEIC"],
      isFavorite: false,
      isSeen: false,
      ratingIds: [103, 104],
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
```

Thêm script vào `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 🏃‍♂️ Chạy dự án

### Chạy frontend (React + Vite)

```bash
cd ecommerce-edu
npm run dev
```

Truy cập: [http://localhost:5173](http://localhost:5173)

### Chạy backend mock API (ExpressJS)

```bash
cd ../mock-express-api
npm run dev
```

Truy cập: [http://localhost:3001/api/products](http://localhost:3001/api/products)

---

## 📁 Cấu trúc thư mục

```
project-root/
├── ecommerce-edu/         # Frontend app (React + Vite)
└── mock-express-api/      # Backend mock API (ExpressJS)
```

---

## 📌 Ghi chú

- Đảm bảo đã cài đặt Node.js và npm.
# hmthu2479-E-commerce-education-platform
