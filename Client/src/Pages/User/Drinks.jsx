import React, { useState, useEffect } from 'react';
import RecipeCard from '../../Components/User/RecipeCard';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  AlertTitle,
  Box
} from '@mui/material';

const Drinks = () => {
  const { darkMode } = useTheme();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinksRecipes = async () => {
      try {
        // Fetch recipes by category
        const response = await axios.get("http://localhost:3000/recipes/category/Drinks");
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch drinks recipes");
        setLoading(false);
        console.error("Error fetching drinks recipes:", err);
      }
    };

    fetchDrinksRecipes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} sx={{ color: darkMode ? 'primary.main' : '#626F47' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Container>
    );
  }

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
        Drinks Recipes
      </Typography>
      
      {recipes.length === 0 ? (
        <Alert severity="info" sx={{ justifyContent: 'center' }}>
          No drinks recipes found.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Drinks;