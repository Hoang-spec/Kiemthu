const express = require('express');
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/orders (Tạo đơn hàng - Bắt buộc có Token)
router.post('/', protect, addOrderItems);
// GET /api/orders/myorders (Lịch sử đơn hàng)
router.get('/myorders', protect, getMyOrders);

module.exports = router;