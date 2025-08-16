import React from 'react';
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/cartSlice';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box
} from '@mui/material';
import {
  AddShoppingCart as AddShoppingCartIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

const cookbooks = [
  {
    id: 1,
    img: assets.andhracookbook,
    name: "Essential Andhra Cookbook",
    description: "A collection of nutritious and delicious recipes.",
    price: "₹1,299"
  },
  {
    id: 2,
    img: assets.parsicookbook,
    name: "Parsi Kitchen: A Memoir of Food and Family",
    description: "Simple and tasty meals for busy schedules.",
    price: "₹999"
  },
  {
    id: 3,
    img: assets.desertcookbook,
    name: "Desserts for Every Mood",
    description: "Sweet and savory baked delights for every occasion.",
    price: "₹1,499"
  },
  {
    id: 4,
    img: assets.masalalabcookbook,
    name: "Masala Lab: The Science of Indian Cooking",
    description: "A variety of plant-based recipes to enjoy.",
    price: "₹1,199"
  },
  {
    id: 5,
    img: assets.liquidcookbook,
    name: "Liquid Intelligence",
    description: "A journey through aromatic spices and flavors.",
    price: "₹1,399"
  },
  {
    id: 6,
    img: assets.tiffincookbook,
    name: "The Tiffin",
    description: "Healthy and tasty Mediterranean-inspired dishes.",
    price: "₹1,599"
  }
];

const CookbookCard = () => {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
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
        Premium Cookbooks
      </Typography>
      
      <Typography 
        variant="h6" 
        align="center" 
        sx={{ 
          mb: 6,
          color: 'text.secondary'
        }}
      >
        Discover our collection of premium cookbooks to enhance your culinary skills
      </Typography>
      
      <Grid container spacing={4}>
        {cookbooks.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: darkMode ? 'background.paper' : '#DDEB9D',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={book.img}
                alt={book.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent 
                sx={{ 
                  flexGrow: 1,
                  backgroundColor: darkMode ? 'background.paper' : '#DDEB9D',
                  color: darkMode ? 'text.primary' : '#2b2d42',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography 
                  gutterBottom 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    textAlign: 'center',
                    fontWeight: 600,
                    color: darkMode ? 'primary.main' : '#626F47',
                    mb: 1
                  }}
                >
                  {book.name}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textAlign: 'center',
                    color: darkMode ? 'text.primary' : '#2b2d42',
                    mb: 2,
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {book.description}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: darkMode ? 'text.primary' : '#000',
                    mb: 2
                  }}
                >
                  {book.price}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ 
                justifyContent: 'space-between', 
                backgroundColor: darkMode ? 'background.paper' : '#DDEB9D',
                px: 2,
                pb: 2
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart(book)}
                  sx={{ 
                    backgroundColor: darkMode ? 'primary.main' : '#626F47',
                    color: 'white',
                    borderRadius: '25px',
                    padding: '6px 12px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: darkMode ? 'primary.dark' : '#4a5a35'
                    }
                  }}
                >
                  Add to Cart
                </Button>
                
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  sx={{ 
                    borderRadius: '25px',
                    padding: '6px 12px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    color: darkMode ? 'primary.main' : '#626F47',
                    borderColor: darkMode ? 'primary.main' : '#626F47',
                    '&:hover': {
                      backgroundColor: darkMode ? 'primary.main' : '#626F47',
                      color: 'white',
                      borderColor: darkMode ? 'primary.main' : '#626F47'
                    }
                  }}
                >
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Items in your cart: {cartItems.length}
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          href="/cart"
          sx={{ 
            backgroundColor: darkMode ? 'secondary.main' : '#f97316',
            '&:hover': {
              backgroundColor: darkMode ? 'secondary.dark' : '#ea580c'
            }
          }}
        >
          View Cart
        </Button>
      </Box>
    </Container>
  );
};

export default CookbookCard;
