import { createSlice } from '@reduxjs/toolkit';

// 1. Khởi tạo trạng thái ban đầu (Initial State)
const initialState = {
    // cartItems: Mảng chứa các đối tượng sản phẩm trong giỏ
    // Mỗi item sẽ có: id, name, price, qty (số lượng), countInStock
    cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems')) 
        : [],
    // Các thông tin khác về giỏ hàng
    shippingAddress: localStorage.getItem('shippingAddress') 
        ? JSON.parse(localStorage.getItem('shippingAddress')) 
        : {},
    paymentMethod: localStorage.getItem('paymentMethod') 
        ? localStorage.getItem('paymentMethod') 
        : '',
};

// 2. Tạo Cart Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // [A] THÊM SẢN PHẨM VÀO GIỎ
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);

            if (existItem) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng (qty)
                state.cartItems = state.cartItems.map((x) =>
                    x.id === existItem.id ? item : x
                );
            } else {
                // Nếu chưa tồn tại, thêm mới vào mảng
                state.cartItems.push(item);
            }
            
            // Lưu trạng thái mới vào Local Storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // [B] XÓA SẢN PHẨM KHỎI GIỎ
        removeFromCart: (state, action) => {
            const idToRemove = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.id !== idToRemove);
            
            // Cập nhật Local Storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // [C] CẬP NHẬT SỐ LƯỢNG (Dùng khi người dùng thay đổi số lượng trong CartPage)
        updateQuantity: (state, action) => {
            const { id, qty } = action.payload;
            const itemToUpdate = state.cartItems.find((x) => x.id === id);

            if (itemToUpdate) {
                itemToUpdate.qty = qty;
            }
            
            // Cập nhật Local Storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        
        // [D] LƯU ĐỊA CHỈ GIAO HÀNG (Sẽ dùng trong bước Checkout)
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
        },
        
        // [E] LƯU PHƯƠNG THỨC THANH TOÁN (Sẽ dùng trong bước Checkout)
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('paymentMethod', action.payload);
        },

        // [F] XÓA TOÀN BỘ GIỎ HÀNG SAU KHI ĐẶT HÀNG THÀNH CÔNG
        clearCart: (state) => {
            state.cartItems = [];
            // Giữ lại địa chỉ và phương thức thanh toán để tiện cho lần mua sau (Tùy chọn)
            localStorage.removeItem('cartItems');
        }
    },
});

// Xuất các action để sử dụng trong các component React
export const { 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    saveShippingAddress,
    savePaymentMethod,
    clearCart,
} = cartSlice.actions;

// Xuất reducer để thêm vào store
export default cartSlice.reducer;