import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

function Navbar() {
  const { token } = useAuth();

  return (
    <AppBar position="static" color='secondary' sx={{background: "#37353E", boxShadow: "none"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" className='logo-link'>
            <ShoppingBagRoundedIcon sx={{ mr: 1, fontSize: 35 }} />
            <Typography variant="h6" noWrap sx={{ mr: 3, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem'}}>
              TECH
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: "flex"}}>
            <Link to="/">
              <Button color='inherit' sx={{ my: 2, color: 'white' }}>Home</Button>
            </Link>
            <Button color='inherit' sx={{ my: 2, color: 'white' }}>Products</Button>
            <Button color='inherit' sx={{ my: 2, color: 'white' }}>Cart</Button>

            <Box sx={{flexGrow: 1, display: "flex", justifyContent: "flex-end"}}>
              {
                token ? <Button color='inherit' sx={{ my: 2, color: 'white' }}>Logout</Button> 
                : <>
                  <Link to="/login">
                    <Button color='inherit' sx={{ my: 2, color: 'white' }}>Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button color='inherit' sx={{ my: 2, color: 'white' }}>Register</Button>
                  </Link>
                </>
              }
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
