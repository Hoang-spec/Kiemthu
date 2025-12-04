import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";  // THÊM DÒNG NÀY

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h2 className="login-title">Đăng Nhập</h2>
                <p className="login-sub">Chào mừng bạn quay lại ❤️</p>

                {error && (
                    <p className="error-msg" data-testid="login-error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} data-testid="login-form">
                    
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            data-testid="login-email-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            data-testid="login-password-input"
                        />
                    </div>

                    <button type="submit" className="login-btn" data-testid="login-button">
                        Đăng Nhập
                    </button>
                </form>

                <div className="login-link">
                    Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
