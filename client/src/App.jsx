import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';

// ---------------------------------------------------
// 1. ĐỊNH NGHĨA PROTECTED ROUTE
// Component này kiểm tra xem người dùng đã đăng nhập chưa (dùng user từ context)
// ---------------------------------------------------
const ProtectedRoute = ({ element: Element }) => {
    const { user, loading } = useAuth();
    
    // Tùy chọn: Hiển thị loading khi kiểm tra Local Storage
    if (loading) return <div>Đang kiểm tra trạng thái...</div>; 
    
    // Nếu có user (đã đăng nhập), hiển thị component chính
    // Nếu không, chuyển hướng về trang Đăng nhập
    return user ? <Element /> : <Navigate to="/login" replace />;
};

function App() {
   const { user, logout } = useAuth();
   return (
     <Router>
         <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <Link to="/" style={{ margin: '0 10px' }}>Trang Chủ</Link>
            <Link to="/cart" style={{ margin: '0 10px' }} data-testid="nav-cart">Giỏ Hàng</Link>

           {user ? (
 // Nếu đã đăng nhập
            <span style={{ marginLeft: 'auto', display: 'inline-block' }}>
              Chào mừng, <strong data-testid="nav-username">{user.username}</strong>!
              <button onClick={logout} style={{ marginLeft: '10px' }} data-testid="logout-button">Đăng Xuất</button>
            </span>
           ) : (
             // Nếu chưa đăng nhập
           <>
            <Link to="/login" style={{ margin: '0 10px' }} data-testid="nav-login">Đăng Nhập</Link>
            <Link to="/register" style={{ margin: '0 10px' }} data-testid="nav-register">Đăng Kí</Link>
           </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        
        {/* SỬ DỤNG PROTECTED ROUTE CHO CHECKOUT */}
        <Route path="/checkout" element={<ProtectedRoute element={CheckoutPage} />} />
      </Routes>
      </Router>
 );
}

export default App;