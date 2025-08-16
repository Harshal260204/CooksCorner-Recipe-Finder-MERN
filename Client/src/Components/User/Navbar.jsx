import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Switch,
  FormControlLabel,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccountCircle,
  Home,
  Restaurant,
  Book,
  ShoppingCart,
  AdminPanelSettings,
  ContactSupport,
  Login,
  PersonAdd,
  Person,
  Logout
} from '@mui/icons-material';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const navItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Recipes', icon: <Restaurant />, path: '/recipes' },
    ...(user ? [
      { text: 'CookBooks', icon: <Book />, path: '/premium-cookbooks' },
      { text: 'Cart', icon: <ShoppingCart />, path: '/cart' }
    ] : []),
    ...(user?.isAdmin ? [
      { text: 'Admin', icon: <AdminPanelSettings />, path: '/admin' }
    ] : []),
    { text: 'Contact Us', icon: <ContactSupport />, path: '/contact-us' }
  ];

  const authItems = user ? [
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Logout', icon: <Logout />, action: handleLogout }
  ] : [
    { text: 'Login', icon: <Login />, path: '/login-page' },
    { text: 'Register', icon: <PersonAdd />, path: '/register-page' }
  ];

  const desktopNav = (
    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
      <Typography 
        variant="h6" 
        component={Link} 
        to="/" 
        sx={{ 
          textDecoration: 'none', 
          color: 'inherit', 
          fontWeight: 'bold',
          mr: 3,
          fontSize: '1.5rem'
        }}
      >
        CooksCorner
      </Typography>
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {navItems.map((item) => (
          <Button
            key={item.text}
            component={Link}
            to={item.path}
            startIcon={item.icon}
            sx={{ 
              color: 'inherit', 
              mx: 1,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {item.text}
          </Button>
        ))}
      </Box>
      
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<DarkModeIcon />}
            checkedIcon={<LightModeIcon />}
          />
        }
        label={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        sx={{ mx: 2 }}
      />
      
      {user ? (
        <>
          <Button
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
            startIcon={<AccountCircle />}
          >
            Welcome, {user.name}
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              <Person sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button component={Link} to="/login-page" startIcon={<Login />} sx={{ mx: 1 }}>
            Login
          </Button>
          <Button component={Link} to="/register-page" variant="contained" color="primary" sx={{ mx: 1 }}>
            Register
          </Button>
        </>
      )}
    </Box>
  );

  const mobileNav = (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography 
        variant="h6" 
        component={Link} 
        to="/" 
        sx={{ 
          textDecoration: 'none', 
          color: 'inherit', 
          fontWeight: 'bold',
          flexGrow: 1
        }}
      >
        CooksCorner
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<DarkModeIcon />}
            checkedIcon={<LightModeIcon />}
          />
        }
        label=""
      />
    </>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        CooksCorner
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path}>
            {item.icon}
            <ListItemText primary={item.text} sx={{ ml: 2 }} />
          </ListItem>
        ))}
        <Divider />
        {authItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={item.path ? Link : 'button'}
            to={item.path}
            onClick={item.action}
          >
            {item.icon}
            <ListItemText primary={item.text} sx={{ ml: 2 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: darkMode ? 'primary.dark' : 'primary.main',
          mb: 2
        }}
      >
        <Toolbar>
          {isMobile ? mobileNav : desktopNav}
        </Toolbar>
      </AppBar>
      
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              backgroundColor: darkMode ? 'background.paper' : 'background.default'
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
}

export default Navbar;
