import React from 'react'
import CartCard from '../../Components/User/CartCard'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../Store/cartSlice'
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Box,
  Alert
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const CartPage = () => {
    const { darkMode } = useTheme();
    const cartItems = useSelector(state => state.cart)
    const dispatch = useDispatch()

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        // Extract numeric value from price string (e.g., "₹1,299" -> 1299)
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return total + (isNaN(price) ? 0 : price);
    }, 0);

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear the cart?')) {
            dispatch(clearCart());
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography 
                variant="h3" 
                component="h1" 
                align="center" 
                sx={{ 
                    mb: 6,
                    fontWeight: 'bold',
                    color: darkMode ? 'primary.main' : '#626F47'
                }}
            >
                Your Shopping Cart
            </Typography>
            
            {cartItems.length === 0 ? (
                <Alert severity="info" sx={{ justifyContent: 'center', py: 8 }}>
                    <Typography variant="h5" align="center">
                        Your cart is empty
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                        Add some delicious cookbooks to your cart!
                    </Typography>
                </Alert>
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        {cartItems.map((data, index) => {
                            return <CartCard key={index} data={data} />
                        })}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ 
                            borderRadius: 4,
                            backgroundColor: darkMode ? 'background.paper' : 'white'
                        }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                                    Order Summary
                                </Typography>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body1">Items ({cartItems.length})</Typography>
                                    <Typography variant="body1">₹{totalPrice.toFixed(2)}</Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body1">Shipping</Typography>
                                    <Typography variant="body1" sx={{ color: 'success.main' }}>Free</Typography>
                                </Box>
                                
                                <Divider sx={{ my: 2 }} />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                        ₹{totalPrice.toFixed(2)}
                                    </Typography>
                                </Box>
                                
                                <Button 
                                    variant="contained" 
                                    color="success" 
                                    fullWidth
                                    size="large"
                                    sx={{ 
                                        py: 1.5,
                                        mb: 2,
                                        backgroundColor: darkMode ? 'success.main' : '#22c55e',
                                        '&:hover': {
                                            backgroundColor: darkMode ? 'success.dark' : '#16a34a'
                                        }
                                    }}
                                >
                                    Proceed to Checkout
                                </Button>
                                
                                <Button 
                                    variant="outlined" 
                                    color="error" 
                                    fullWidth
                                    startIcon={<DeleteIcon />}
                                    onClick={handleClearCart}
                                    sx={{ py: 1.5 }}
                                >
                                    Clear Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    )
}

export default CartPage