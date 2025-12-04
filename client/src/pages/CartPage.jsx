import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlide';
import './CartPage.css'; // 👉 IMPORT CSS RIÊNG

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleQuantityChange = (id, newQty, countInStock) => {
        const qty = Number(newQty);
        if (qty > 0 && qty <= countInStock) {
            dispatch(updateQuantity({ id, qty }));
        } else if (qty > countInStock) {
            alert(`Chỉ còn ${countInStock} sản phẩm`);
        }
    };

    const handleRemove = (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            dispatch(removeFromCart(id));
        }
    };

    const handleCheckout = () => navigate('/checkout');

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <h2>🛒 Giỏ hàng trống</h2>
                <p>
                    Hãy <Link to="/">quay lại trang chủ</Link> để thêm sản phẩm.
                </p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>🛒 Giỏ hàng ({cartItems.length})</h2>

            <div className="cart-content">

                {/* LIST */}
                <div className="cart-list">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-info">
                                <h4>{item.name}</h4>
                                <p className="price">Giá: {item.price.toLocaleString('vi-VN')}₫</p>
                                <p className="total">Tổng: {(item.price * item.qty).toLocaleString('vi-VN')}₫</p>
                            </div>

                            <div className="cart-item-qty">
                                <label>SL:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={item.countInStock}
                                    value={item.qty}
                                    onChange={(e) =>
                                        handleQuantityChange(item.id, e.target.value, item.countInStock)
                                    }
                                />
                                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SUMMARY */}
                <div className="cart-summary">
                    <h3>Tóm tắt đơn hàng</h3>

                    <div className="summary-row">
                        <span>Tạm tính:</span>
                        <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                    </div>

                    <button className="checkout-btn" onClick={handleCheckout}>
                        Tiến hành thanh toán
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CartPage;
