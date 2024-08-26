import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductFormPage from './pages/ProductFormPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import CreateOrdersPage from './pages/CreateOrdersPage';
import { CartProvider } from './context/CartContext';
import NotFoundPage from './pages/NotFoundPage';
import { CustomerProvider } from './context/CustomerContext';
import OrdersPage from './pages/OrdersPage';
import ViewOrderDetails from './pages/ViewOrderDetails';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CustomerProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter>
                <main className="container mx-auto px-10">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />

                    <Route element={<ProtectedRoute />}>
                      <Route
                        path="/create-orders"
                        element={<CreateOrdersPage />}
                      />
                      <Route
                        path="/orders/:id"
                        element={<ViewOrderDetails />}
                      />
                      <Route
                        path="/add-product"
                        element={<ProductFormPage />}
                      />
                      <Route
                        path="/products/:id"
                        element={<ProductFormPage />}
                      />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </CustomerProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
