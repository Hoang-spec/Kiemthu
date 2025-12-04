const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Tham chiếu sản phẩm
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Tham chiếu người dùng
    orderItems: [orderItemSchema], 
    shippingAddress: { address: { type: String, required: true }, city: { type: String, required: true }, postalCode: { type: String, required: true }, country: { type: String, required: true } },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true, default: 0.0 }, 
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);