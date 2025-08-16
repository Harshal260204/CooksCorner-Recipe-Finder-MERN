import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../Store/cartSlice';
import { useTheme } from '../../context/ThemeContext';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material';
import {
  Delete as DeleteIcon
} from '@mui/icons-material';

const CartCard = ({ data }) => {
  const { id, img, name, price } = data;
  const dispatch = useDispatch();
  const { darkMode } = useTheme();

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <Card 
      sx={{ 
        display: 'flex',
        mb: 2,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: darkMode ? 'background.paper' : 'white'
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, objectFit: 'cover' }}
        image={img}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="h5" variant="h6" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fresh and delicious, perfect for your appetite.
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, color: 'success.main' }}>
            {price}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 1, pr: 2 }}>
          <IconButton 
            onClick={handleRemove} 
            color="error"
            sx={{ 
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.05)'
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default CartCard;