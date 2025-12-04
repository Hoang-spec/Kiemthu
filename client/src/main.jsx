import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // <--- Import AuthProvider
import { Provider } from 'react-redux';
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* <--- Bọc ứng dụng bằng AuthProvider */}
      <Provider store={store}>
        <App />
      </Provider>

    </AuthProvider>
  </React.StrictMode>,
);