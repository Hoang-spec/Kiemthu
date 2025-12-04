import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";  // IMPORT CSS

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !email || !password) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        try {
            await register({ username, email, password });
            navigate("/");
        } catch (err) {
            setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">

                <h2 className="register-title">Đăng Ký</h2>
                <p className="register-sub">Tạo tài khoản mới ngay hôm nay 🚀</p>

                {error && (
                    <p className="error-msg" data-testid="register-error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} data-testid="register-form">
                    
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                        />
                    </div>

                    <button type="submit" className="register-btn" data-testid="register-button">
                        Đăng Ký
                    </button>
                </form>

                <div className="register-link">
                    Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
