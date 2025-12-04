const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
// const { protect, admin } = require('../middleware/authMiddleware'); // Sẽ cần cho Admin routes sau

const router = express.Router();

// Public Routes (Không cần đăng nhập)
router.get('/', getProducts); // GET /api/products
router.get('/:id', getProductById); // GET /api/products/:id

// Admin Routes (Tạm thời mở cho Test, nhưng sau này cần Middleware bảo vệ)
router.post('/', createProduct); // POST /api/products (Chỉ Admin)

module.exports = router;