const Order = require('../models/Order');

exports.addOrderItems = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'Không có sản phẩm trong giỏ hàng' });
    }

    try {
        const order = new Order({
            user: req.user._id, // Lấy ID người dùng từ Middleware PROTECT
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Tạo đơn hàng thất bại', error: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    // ... logic lấy đơn hàng đã được bảo vệ ...
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy lịch sử đơn hàng', error: error.message });
    }
};