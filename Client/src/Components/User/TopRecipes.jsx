import React from "react";
import { assets } from "../../assets/assets";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

export default function TopRecipes() {
  const { darkMode } = useTheme();

  const topRecipes = [
    {
      id: 1,
      name: "Chicken Tikka Biryani",
      description: "A fragrant, spiced biryani with marinated chicken tikka pieces, layered with basmati rice.",
      img: assets.chickenBiryani,
      type: "Non-Veg",
      averageRating: 4.5,
      ratingsCount: 120
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      description: "A creamy and flavorful curry made with marinated paneer pieces cooked in a spiced tomato-based sauce.",
      img: assets.paneerTikkaMasala,
      type: "Veg",
      averageRating: 4.2,
      ratingsCount: 95
    },
    {
      id: 3,
      name: "Chicken White Sauce Pasta",
      description: "A creamy, rich pasta dish with grilled chicken, cooked in a garlic-flavored white sauce.",
      img: assets.chickenPasta,
      type: "Non-Veg",
      averageRating: 4.0,
      ratingsCount: 87
    },
    {
      id: 4,
      name: "Shahi Paneer",
      description: "A royal and creamy paneer curry made with rich ingredients like cream, cashews, and aromatic spices.",
      img: assets.shahiPaneer,
      type: "Veg",
      averageRating: 4.7,
      ratingsCount: 142
    }
  ];

  return (
    <Grid container spacing={3}>
      {topRecipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={3} key={recipe.id}>
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
              image={recipe.img}
              alt={recipe.name}
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
                {recipe.name}
              </Typography>
              
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  textAlign: 'center',
                  color: darkMode ? 'primary.main' : '#626F47',
                  mb: 2
                }}
              >
                {recipe.type}
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
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {recipe.description}
              </Typography>
              
              {/* Rating Display */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Rating 
                  value={recipe.averageRating || 0} 
                  precision={0.5} 
                  readOnly 
                  sx={{ color: '#fbbf24' }} // amber-400
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({recipe.ratingsCount || 0})
                </Typography>
              </Box>
              
              <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ 
                    backgroundColor: darkMode ? 'primary.main' : '#626F47',
                    color: 'white',
                    borderRadius: '25px',
                    padding: '8px 16px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: darkMode ? 'primary.dark' : '#4a5a35'
                    }
                  }}
                >
                  View Recipe
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
