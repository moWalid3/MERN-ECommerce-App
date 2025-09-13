import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/auth/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Container maxWidth="xl" sx={{ py: 5 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
