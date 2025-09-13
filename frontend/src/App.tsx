import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import LoadingProvider from "./context/loading/LoadingProvider";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <LoadingProvider>
        <AuthProvider>

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
          
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
