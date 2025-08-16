import React, { useState } from 'react';
import { assets } from '../../assets/assets'
import TopRecipes from '../../Components/User/TopRecipes'
import { Link } from 'react-router-dom';
import desertImg from '../../assets/desert.jpg'
import breakfastImg from '../../assets/breakfast.jpg'
import mainCourseImg from '../../assets/mainCourse.jpg'
import drinksImg from '../../assets/drinks.jpg'
import snacksImg from '../../assets/snacks.jpg'
import soupImg from '../../assets/soupssandwiches.jpg'
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      const response = await axios.get(`http://localhost:3000/recipes/search?query=${searchQuery}`);
      setSearchResults(response.data.recipes);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    setSearchResults([]);
  };

  const categoryItems = [
    { name: 'Desert', image: desertImg, path: '/desert' },
    { name: 'Breakfast', image: breakfastImg, path: '/breakfast' },
    { name: 'Main Course', image: mainCourseImg, path: '/main-course' },
    { name: 'Drinks', image: drinksImg, path: '/drinks' },
    { name: 'Snacks', image: snacksImg, path: '/snacks' },
    { name: 'Sandwiches', image: soupImg, path: '/soups-sandwiches' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Box sx={{ position: 'relative', height: { xs: '300px', sm: '400px', md: '500px' }, mb: 4 }}>
        <img 
          src={assets.car1} 
          alt="Hero" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '0 0 20px 20px'
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            textAlign: 'center',
            color: 'white',
            width: '100%'
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 2
            }}
          >
            Discover Amazing Recipes
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            From quick meals to gourmet dishes, find your next favorite recipe
          </Typography>
        </Box>
      </Box>

      {/* Search Section */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
        
        {/* Search Results */}
        {showResults && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">
                Search Results for "{searchQuery}"
              </Typography>
              <IconButton onClick={clearSearch} color="secondary">
                <ClearIcon />
              </IconButton>
            </Box>
            
            {searchResults.length > 0 ? (
              <Grid container spacing={3}>
                {searchResults.map((recipe) => (
                  <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={recipe.imageUrl ? `http://localhost:3000${recipe.imageUrl}` : assets.car1}
                        alt={recipe.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="h3">
                          {recipe.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {recipe.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Category: {recipe.category}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View Recipe
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                No recipes found matching your search.
              </Typography>
            )}
          </Box>
        )}
      </Container>

      {/* CATEGORIES SECTION */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            mb: 4,
            color: 'primary.main'
          }}
        >
          What Will You Cook Next?
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {categoryItems.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Card 
                component={Link} 
                to={category.path}
                sx={{ 
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent 
                  sx={{ 
                    backgroundColor: 'primary.main', 
                    textAlign: 'center',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 'bold'
                    }}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Top Recipes */}
      <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              textAlign: 'center', 
              fontWeight: 'bold', 
              mb: 4,
              color: 'primary.main'
            }}
          >
            TOP RECIPES
          </Typography>
          <TopRecipes />
        </Container>
      </Box>
    </div>
  );
}

export default Homepage;