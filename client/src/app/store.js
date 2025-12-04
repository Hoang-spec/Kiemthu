import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlide';

export const store = configureStore({
    reducer: {
        // Thêm Reducer (Slice) Giỏ hàng vào Store
        cart: cartReducer,
        // user: userReducer, // Nếu có User Slice
        // product: productReducer, // Nếu có Product Slice
    },
    // Middleware và DevTools được tự động thiết lập bởi Redux Toolkit
});