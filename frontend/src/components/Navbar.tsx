import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

function Navbar() {
  const { token, logout } = useAuth();

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
              <Button color='inherit' sx={{color: 'white'}}>Home</Button>
            </Link>
            <Button color='inherit' sx={{color: 'white'}}>Products</Button>
            <Button color='inherit' sx={{color: 'white'}}>Cart</Button>

            <Box sx={{flexGrow: 1, display: "flex", justifyContent: "flex-end"}}>
              {
                token ?
                <>
                  <Link to="/cart">
                    <IconButton color='inherit' sx={{color: 'white', mr: 2}}>
                      <AddShoppingCartIcon />
                      <CartBadge badgeContent={2} color='info' overlap="circular" />
                    </IconButton>
                  </Link>
                  <Link onClick={logout} to="/login">
                    <Button color='inherit' sx={{color: 'white'}}>Logout</Button> 
                  </Link>
                </> :
                <>
                  <Link to="/login">
                    <Button color='inherit' sx={{color: 'white'}}>Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button color='inherit' sx={{color: 'white'}}>Register</Button>
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
