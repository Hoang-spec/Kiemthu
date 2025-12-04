const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {

    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Kết nối không thành công:", error.message);
    process.exit(1); // thoát app nếu kết nối thất bại
  }
};

module.exports = connectDB;
