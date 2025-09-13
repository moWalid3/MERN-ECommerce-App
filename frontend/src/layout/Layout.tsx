import Container from "@mui/material/Container";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useLoading } from "../context/loading/LoadingContext";
import { LinearProgress } from "@mui/material";

const Layout = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <Navbar />
      {isLoading && <LinearProgress color="inherit" />}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
