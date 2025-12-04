import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { addToCart } from '../features/cart/cartSlide';

import './ProductDetailPage.css';  // ⚠️ IMPORT CSS

const API_URL = 'http://localhost:5000/api/products';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Không tìm thấy sản phẩm hoặc lỗi kết nối Server.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!user) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            navigate("/login");
            return;
        }

        if (product.countInStock < qty) {
            alert(`Chỉ còn ${product.countInStock} sản phẩm trong kho.`);
            return;
        }

        dispatch(addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            qty,
            countInStock: product.countInStock,
            userId: user.id
        }));

        alert(`Đã thêm ${qty} x ${product.name} vào giỏ hàng.`);
        navigate('/cart');
    };

    if (loading) return <div className="loading">Đang tải sản phẩm...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Quay lại
            </button>

            <div className="product-container">
                <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="product-details">
                    <h1>{product.name}</h1>
                    <p className="price">{product.price.toLocaleString('vi-VN')} VND</p>
                    <p><strong>Mô tả:</strong> {product.description}</p>
                    <p><strong>Danh mục:</strong> {product.category}</p>

                    <p>
                        <strong>Trạng thái:</strong>
                        {product.countInStock > 0 ? (
                            <span className="in-stock"> Còn hàng ({product.countInStock})</span>
                        ) : (
                            <span className="out-stock"> Hết hàng</span>
                        )}
                    </p>
                </div>

                <div className="product-action">
                    <h3>Mua hàng</h3>

                    <div className="qty-box">
                        <label>Số lượng</label>
                        <input
                            type="number"
                            min="1"
                            max={product.countInStock}
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                        />
                    </div>

                    <button 
                        className="btn-add"
                        disabled={product.countInStock === 0}
                        onClick={handleAddToCart}
                    >
                        {product.countInStock > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
                    </button>
                </div>
            </div>

            <footer className="footer">
                © 2025 - My Ecommerce Shop | All rights reserved.
            </footer>
        </div>
    );
};

export default ProductDetailPage;
