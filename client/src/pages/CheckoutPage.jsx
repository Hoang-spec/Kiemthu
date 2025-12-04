import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../features/cart/cartSlide';
import { useAuth } from '../context/AuthContext';
import './CheckoutPage.css'; // 👉 CSS RIÊNG

const API_URL = 'http://localhost:5000/api/orders';

const CheckoutPage = () => {
    const { user, token } = useAuth();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'Việt Nam',
    });

    const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng (COD)');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 500000 ? 0 : 30000;
    const totalPrice = itemsPrice + shippingPrice;

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (cartItems.length === 0) {
            alert('Giỏ hàng trống!');
            setLoading(false);
            return;
        }

        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    imageUrl: "placeholder.jpg",
                    price: item.price,
                    product: item.id,
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post(API_URL, orderData, config);

            dispatch(clearCart());
            alert(`Đặt hàng thành công! Mã đơn: ${data._id}`);
            navigate(`/order/${data._id}`);

        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi đặt hàng. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Thanh toán (Checkout)</h2>

            <form className="checkout-form" onSubmit={placeOrderHandler}>

                {/* Shipping */}
                <div className="checkout-section">
                    <h3>1. Địa chỉ Giao hàng</h3>

                    {Object.keys(shippingAddress).map((key) => (
                        <div key={key} className="input-group">
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="text"
                                value={shippingAddress[key]}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, [key]: e.target.value })
                                }
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Payment */}
                <div className="checkout-section">
                    <h3>2. Phương thức Thanh toán</h3>

                    <div className="input-group">
                        <label className="payment-radio">
                            <input
                                type="radio"
                                value="Thanh toán khi nhận hàng (COD)"
                                checked={paymentMethod === 'Thanh toán khi nhận hàng (COD)'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Thanh toán khi nhận hàng (COD)
                        </label>
                    </div>
                </div>

                {/* Summary */}
                <div className="summary-box">
                    <h3>3. Xác nhận Đơn hàng</h3>

                    {cartItems.map(item => (
                        <div key={item.id} className="summary-item">
                            <span>{item.name} x {item.qty}</span>
                            <span>{(item.price * item.qty).toLocaleString('vi-VN')} VND</span>
                        </div>
                    ))}

                    <div className="summary-line">
                        <span>Tạm tính:</span>
                        <span>{itemsPrice.toLocaleString('vi-VN')} VND</span>
                    </div>

                    <div className="summary-line">
                        <span>Phí vận chuyển:</span>
                        <span>{shippingPrice.toLocaleString('vi-VN')} VND</span>
                    </div>

                    <div className="summary-total">
                        <span>Tổng cộng:</span>
                        <span>{totalPrice.toLocaleString('vi-VN')} VND</span>
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <button
                        type="submit"
                        className="place-order-btn"
                        disabled={loading || cartItems.length === 0}
                    >
                        {loading ? 'Đang xử lý...' : 'HOÀN TẤT ĐẶT HÀNG'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CheckoutPage;
