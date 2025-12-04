const User = require('../models/User')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hàm tạo JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token hết hạn sau 1 ngày
    });
};

// [A] CHỨC NĂNG ĐĂNG KÝ (ĐÃ SỬA LỖI VALIDATION)
// server/src/controllers/authController.js (Hàm register)
// ...
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Kiểm tra Email đã tồn tại chưa
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email đã được đăng ký.' });
        }
        
        // 2. Tạo User mới (Truyền mật khẩu rõ ràng)
        user = new User({ username, email, password });
        
        // 3. LƯU USER VÀO DB
        // Quá trình user.save() sẽ tự động kích hoạt PRE-SAVE HOOK để HASH MẬT KHẨU
        // và kiểm tra minlength trước khi hash.
        await user.save(); 

        // 4. Tạo JWT Token và gửi về
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'Đăng ký thành công!',
            user: { id: user._id, username: user.username, email: user.email, role: user.role },
            token,
        });

    } catch (err) {
        // Vẫn giữ logic xử lý lỗi Validation đã sửa trước đó
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }

        res.status(500).json({ message: 'Lỗi máy chủ khi đăng ký', error: err.message });
    }
};
// ...

// [B] CHỨC NĂNG ĐĂNG NHẬP (Giữ nguyên)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Tìm User qua Email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
        }

        // 2. So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
        }

        // 3. Tạo JWT Token
        const token = generateToken(user._id);

        res.json({
            message: 'Đăng nhập thành công!',
            user: { id: user._id, username: user.username, email: user.email, role: user.role },
            token,
        });

    } catch (err) {
        res.status(500).json({ message: 'Lỗi máy chủ khi đăng nhập', error: err.message });
    }
};