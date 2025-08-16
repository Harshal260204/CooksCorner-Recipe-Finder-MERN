import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
  List as ListIcon,
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Dashboard as DashboardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  Box
} from '@mui/material';

export default function Sidebar({ setSelectedOption }) {
  const { darkMode } = useTheme();
  const location = useLocation();
  
  const [openRecipes, setOpenRecipes] = React.useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);

  const handleRecipesClick = () => {
    setOpenRecipes(!openRecipes);
  };

  const handleUsersClick = () => {
    setOpenUsers(!openUsers);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  // Check current path to set active state
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          backgroundColor: darkMode ? '#1a1a1a' : '#212529',
          color: 'white',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: darkMode ? 'primary.main' : '#626F47'
          }}
        >
          Admin Dashboard
        </Typography>
      </Box>
      
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/admin" 
            onClick={() => handleSelectOption('dashboard')}
            sx={{
              backgroundColor: isActive('/admin') && !isActive('recipes') && !isActive('users') && !isActive('messages') 
                ? (darkMode ? 'primary.main' : '#626F47') : 'transparent',
              color: isActive('/admin') && !isActive('recipes') && !isActive('users') && !isActive('messages') 
                ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: darkMode ? 'action.hover' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: isActive('/admin') && !isActive('recipes') && !isActive('users') && !isActive('messages') 
                ? 'white' : 'inherit' 
            }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleRecipesClick}
            sx={{
              backgroundColor: isActive('recipes') ? (darkMode ? 'primary.main' : '#626F47') : 'transparent',
              color: isActive('recipes') ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: darkMode ? 'action.hover' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemIcon sx={{ color: isActive('recipes') ? 'white' : 'inherit' }}>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Recipes" />
            {openRecipes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        
        <Collapse in={openRecipes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/admin/all-recipes" 
                onClick={() => handleSelectOption('all-Recipes')}
                sx={{
                  pl: 4,
                  backgroundColor: isActive('all-recipes') ? (darkMode ? 'primary.main' : '#626F47') : 'transparent',
                  color: isActive('all-recipes') ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: darkMode ? 'action.hover' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActive('all-recipes') ? 'white' : 'inherit' }}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="All Recipes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/admin/create-recipe" 
                onClick={() => handleSelectOption('createRecipe')}
                sx={{
                  pl: 4,
                  backgroundColor: isActive('create-recipe') ? (darkMode ? 'primary.main' : '#626F47') : 'transparent',
                  color: isActive('create-recipe') ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: darkMode ? 'action.hover' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActive('create-recipe') ? 'white' : 'inherit' }}>
                  <RestaurantIcon />
                </ListItemIcon>
                <ListItemText primary="Create Recipe" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleUsersClick}
            sx={{
              backgroundColor: isActive('users') ? (darkMode ? 'primary.main' : '#626F47') : 'transparent',
              color: isActive('users') ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: darkMode ? 'action.hover' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemIcon sx={{ color: isActive('users') ? 'white' : 'inherit' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {openUsers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/admin/users" 
                onClick={() => handleSelectOption('users')}
                sx={{
                  pl: 4,
                  backgroundColor: isActive('users') && !isActive('messages') ? (darkMode ? 'primary.main' : '#626F47') : 'transparent',
                  color: isActive('users') && !isActive('messages') ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: darkMode ? 'action.hover' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActive('users') && !isActive('messages') ? 'white' : 'inherit' }}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="All Users" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/admin/messages" 
            onClick={() => handleSelectOption('messages')}
            sx={{
              backgroundColor: isActive('messages') ? (darkMode ? 'primary.main' : '#626F47') : 'transparent',
              color: isActive('messages') ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: darkMode ? 'action.hover' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemIcon sx={{ color: isActive('messages') ? 'white' : 'inherit' }}>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
