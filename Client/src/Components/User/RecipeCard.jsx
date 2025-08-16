import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating
} from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

const RecipeCard = ({ recipe }) => {
  const { darkMode } = useTheme();
  
  // Determine image source - use uploaded image if available, otherwise use default
  const imageSrc = recipe.imageUrl ? `http://localhost:3000${recipe.imageUrl}` : recipe.img;

  return (
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
        image={imageSrc}
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
            ({recipe.ratings ? recipe.ratings.length : 0})
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
  );
};

export default RecipeCard;
