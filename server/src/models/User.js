const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <--- Import bcrypt vào đây

const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'User Name la bat buoc'], unique: true, trim: true, minlength: 3 },
    email: { type: String, required: [true, ' Email la bat buoc'], unique: true, lowercase: true, match: [/.+@.+\..+/, 'Vui lòng nhập email hợp lệ'] },
    password: {
        type: String,
        required: [true, 'Mật khẩu là bắt buộc'],
        minlength: [8, 'Mật khẩu phải có ít nhất 8 ký tự'], // Sửa lại minlength để trả về lỗi rõ ràng hơn
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

// --- THÊM PRE-SAVE HOOK ĐỂ HASH MẬT KHẨU ---
UserSchema.pre('save', async function (next) {
    // Nếu password KHÔNG bị thay đổi, bỏ qua hàm hash
    if (!this.isModified('password')) {
        next();
    }

    // Băm mật khẩu
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// ---------------------------------------------

module.exports = mongoose.model('User', UserSchema);