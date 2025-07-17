const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    
    console.log("🚀 ~ connectDB ~ process.env.MONGO_URI:", process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
