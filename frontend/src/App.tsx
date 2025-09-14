import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import LoadingProvider from "./context/loading/LoadingProvider";
import Layout from "./layout/Layout";
import CartPage from "./pages/CartPage";
import CartProvider from "./context/cart/CartProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>

              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="cart" element={<CartPage />} />
                  </Route>
                </Route>
              </Routes>

            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
