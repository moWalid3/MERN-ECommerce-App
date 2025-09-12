import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color='warning'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 35 }} />
          <Typography variant="h6" noWrap component="a"
            sx={{ mr: 3, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem'}}
          >
            TECH
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Products</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Cart</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Login</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Register</Typography>
              </MenuItem>

            </Menu>
          </Box>

          <ShoppingBagRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: 35 }} />
          <Typography variant="h5" noWrap component="a"
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none'}}
          >
            TECH
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white' }}>
              Home
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white' }}>
              Products
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white' }}>
              Cart
            </Button>

            <Box sx={{flexGrow: 1, display: "flex", justifyContent: "flex-end"}}>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white' }}>
                Login
              </Button>

              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white' }}>
                Register
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
