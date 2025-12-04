import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Khai báo Base URL của Backend API
const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
    // Khởi tạo state: Thử lấy token/user từ LocalStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    
    // Tùy chọn: Dùng loading để quản lý ProtectedRoute không bị nhảy khi chưa check Local Storage
    const [loading, setLoading] = useState(true);

    // --- EFFECT 1: Cấu hình Axios và Khôi phục User ---
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            // Khôi phục trạng thái (Nếu chưa được khởi tạo ở useState)
            if (!token) setToken(storedToken);
            if (!user) setUser(JSON.parse(storedUser));
            
            // Cấu hình Axios Header cho các API calls
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } else if (token) {
             // Đảm bảo token được thiết lập ngay cả khi nó vừa được set
             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Xóa header nếu không có token
            delete axios.defaults.headers.common['Authorization'];
        }
        
        // Hoàn tất quá trình kiểm tra Local Storage
        setLoading(false); 

    }, [token, user]); // Phản ứng khi token hoặc user thay đổi

    // [A] Hàm Đăng kí (Giữ nguyên logic tự động đăng nhập)
    const register = async (userData) => {
        try {
            const res = await axios.post(`${API_URL}/register`, userData);
            await login({ email: userData.email, password: userData.password });
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error("Lỗi kết nối mạng");
        }
    };

    // [B] Hàm Đăng nhập (ĐÃ SỬA LỖI: Lưu cả User Object)
    const login = async (credentials) => {
        try {
            const res = await axios.post(`${API_URL}/login`, credentials);
            const { user: userData, token: userToken } = res.data;

            // Lưu trạng thái vào React State
            setUser(userData);
            setToken(userToken);
            
            // LƯU TRẠNG THÁI VÀO LOCAL STORAGE (Fix lỗi Refresh)
            localStorage.setItem('token', userToken);
            localStorage.setItem('user', JSON.stringify(userData)); // <-- LƯU USER OBJECT

            return userData;
        } catch (error) {
            throw error.response ? error.response.data : new Error("Lỗi kết nối mạng");
        }
    };

    // [C] Hàm Đăng xuất (ĐÃ SỬA LỖI: Xóa cả User Object)
    const logout = () => {
        setUser(null);
        setToken(null);
        
        // XÓA ĐỒNG BỘ CẢ TOKEN VÀ USER
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        
        // Xóa Header Axios
        delete axios.defaults.headers.common['Authorization'];
        
        window.location.href = '/login'; // Chuyển hướng về trang đăng nhập
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook để sử dụng Auth Context
export const useAuth = () => useContext(AuthContext);