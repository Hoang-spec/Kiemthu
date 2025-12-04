const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Mô tả là bắt buộc'],
    },
    price: {
        type: Number,
        required: [true, 'Giá là bắt buộc'],
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: [true, 'Số lượng trong kho là bắt buộc'],
        default: 0,
    },
    imageUrl: {
        type: String,
        default: 'placeholder.jpg',
    },
    // Trường tham chiếu đến User đã tạo sản phẩm (Tùy chọn cho Admin)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);