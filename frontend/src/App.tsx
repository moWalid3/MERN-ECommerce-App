import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Container from '@mui/material/Container';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
