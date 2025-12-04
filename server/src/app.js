const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// require router
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./connectDB')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')


// tai bien moi truong tu dotenv
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// middllerware co ban
app.use(cors());
app.use(express.json());
// route cua authen
app.use('/api/auth', authRoutes);
// route cua product
app.use('/api/products', productRoutes)
// route cua checkout
app.use('/api/orders', orderRoutes);
// ket noi voi database
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("🚀 Server listening on port 5000");
  });
});

// goi ham ket noi database
connectDB();


// --- ROUTE VÍ DỤ ---
app.get('/', (req, res) => {
    res.send('Welcome to E-commerce Testing API!');
});

// ROUTE DÙNG ĐỂ KIỂM THỬ TRẠNG THÁI SERVER
app.get('/api/status', (req, res) => {
    res.json({ 
        message: 'Server is running', 
        database: mongoose.STATES[mongoose.connection.readyState] 
    });
});

// --- Khởi động Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
