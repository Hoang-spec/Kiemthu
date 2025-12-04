const Product = require('../models/Product');

// [A] LẤY TẤT CẢ SẢN PHẨM (Phù hợp cho trang chủ và tìm kiếm)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error: error.message });
    }
};

// [B] LẤY CHI TIẾT SẢN PHẨM (Phù hợp cho trang chi tiết)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        // Lỗi thường là do ID không hợp lệ (Cast Error)
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết sản phẩm', error: error.message });
    }
};

// [C] TẠO SẢN PHẨM (Dành cho Admin)
exports.createProduct = async (req, res) => {
    const { name, description, price, category, countInStock, imageUrl } = req.body;

    try {
        const product = new Product({
            name, description, price, category, countInStock, imageUrl,
            // Giả định User ID (req.user.id) sẽ được lấy từ Middleware xác thực Admin
            user: req.user ? req.user.id : '60c72b2f9f1e4c0015b67890', // Placeholder ID cho dev test
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Tạo sản phẩm thất bại', error: error.message });
    }
};

// ... Các hàm updateProduct và deleteProduct có logic tương tự ...