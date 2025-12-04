import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlide";
import { useAuth } from "../context/AuthContext"; // Import hook kiểm tra đăng nhập
import "./HomePage.css"; // Giả định file CSS của bạn

const API_URL = "http://localhost:5000/api/products";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { user } = useAuth(); // Lấy thông tin user (nếu đã đăng nhập)

  // --- Logic Fetch Sản phẩm ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải sản phẩm: Vui lòng kiểm tra Server Backend.");
        setLoading(false);
        console.error("Fetch Products Error:", err);
      }
    };
    fetchProducts();
  }, []);

  // --- Logic Thêm vào Giỏ hàng (BỊ CHẶN nếu chưa Đăng nhập) ---
  const handleAddToCart = (product) => {
    // 1. KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP
    if (!user) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        // Chuyển hướng người dùng đến trang đăng nhập
        navigate("/login"); 
        return; 
    }

    // 2. NẾU ĐÃ ĐĂNG NHẬP, TIẾN HÀNH THÊM VÀO GIỎ
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      qty: 1, 
      countInStock: product.countInStock,
      userId: user.id // Gắn User ID vào item (Tùy chọn)
    };

    dispatch(addToCart(cartItem));
    alert(`Đã thêm ${product.name} vào giỏ hàng của bạn!`);
  };

  return (
    <div className="page-container">
      {/* HERO BANNER */}
      <section className="hero-full">
        <div className="hero-overlay">
          <h1 className="hero-title">Mua Sắm Đẳng Cấp</h1>
          <p className="hero-sub">Thời trang – Phụ kiện – Sản phẩm hot mỗi ngày</p>
          <button className="hero-button">Khám phá ngay</button>
        </div>
      </section>

      {/* PRODUCTS */}
      <div className="content">
        <h2 className="section-title">🛍️ Sản phẩm nổi bật</h2>

        {loading && <div className="loading">Đang tải danh sách sản phẩm...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <p className="empty">Kho hàng trống. Vui lòng thêm sản phẩm bằng Postman.</p>
            ) : (
              <div className="product-grid-5">
                {products.map((product) => (
                  <div key={product._id} className="product-card-full" data-testid={`product-card-${product._id}`}>
                    <div className="img-wrap">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <h3>{product.name}</h3>
                    <p className="price">{product.price.toLocaleString("vi-VN")} VND</p>
                    
                    {/* NÚT THÊM VÀO GIỎ HÀNG */}
                    <button 
                        className="buy-btn"
                        onClick={() => handleAddToCart(product)} 
                        disabled={product.countInStock === 0} 
                        data-testid={`add-to-cart-btn-${product._id}`}
                    >
                        {product.countInStock > 0 ? 'Thêm vào Giỏ hàng' : 'Hết hàng'}
                    </button>
                    <button 
                        className="buy-btn"
                        // Thay đổi hành động: Thay vì AddToCart (nếu chưa đăng nhập), chúng ta điều hướng
                        onClick={() => navigate(`/product/${product._id}`)} 
                    >
                        Xem Chi Tiết
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>LuxuryShop</h3>
            <p>Mang đến trải nghiệm mua sắm đẳng cấp và sang trọng.</p>
          </div>
          <div>
            <h3>Liên hệ</h3>
            <p>Email: support@luxuryshop.com</p>
            <p>Hotline: 0123 456 789</p>
          </div>
          <div>
            <h3>Theo dõi chúng tôi</h3>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Zalo</p>
          </div>
        </div>
        <div className="footer-bottom">© 2025 LuxuryShop. All rights reserved.</div>
      </footer>
    </div>
  );
}