import React, { useState } from "react";
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  Paper,
  Grid,
  InputAdornment
} from '@mui/material';
import {
  Fastfood as FastfoodIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  Restaurant as RestaurantIcon,
  List as ListIcon,
  Assignment as AssignmentIcon,
  AccessTime as AccessTimeIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const CreateRecipeForm = () => {
  const { darkMode } = useTheme();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    category: "",
    type: "Veg",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    image: null
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setRecipe({ ...recipe, image: files[0] });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
    
    // Clear messages when user starts typing
    if (success) setSuccess(false);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    
    // Basic validation
    if (!recipe.name || !recipe.description || !recipe.category || 
        !recipe.ingredients || !recipe.instructions || !recipe.cookingTime) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('description', recipe.description);
    formData.append('category', recipe.category);
    formData.append('type', recipe.type);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    formData.append('cookingTime', recipe.cookingTime);
    if (recipe.image) {
      formData.append('image', recipe.image);
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:3000/admin/recipes", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log(response);
      setSuccess(true);
      
      // Reset form
      setRecipe({
        name: "",
        description: "",
        category: "",
        type: "Veg",
        ingredients: "",
        instructions: "",
        cookingTime: "",
        image: null
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
      setError("Error creating recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          borderRadius: 4,
          backgroundColor: darkMode ? 'background.paper' : 'white'
        }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          align="center" 
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            color: darkMode ? 'primary.main' : '#626F47'
          }}
        >
          Create New Recipe
        </Typography>
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>Success</AlertTitle>
            Recipe created successfully!
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Recipe Name"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FastfoodIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                multiline
                rows={3}
                value={recipe.description}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="category"
                label="Category"
                name="category"
                value={recipe.category}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={recipe.type}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <RestaurantIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="Veg">Veg</MenuItem>
                  <MenuItem value="Non-Veg">Non-Veg</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ingredients"
                label="Ingredients (comma-separated)"
                name="ingredients"
                value={recipe.ingredients}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ListIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="instructions"
                label="Instructions"
                name="instructions"
                multiline
                rows={4}
                value={recipe.instructions}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cookingTime"
                label="Cooking Time (minutes)"
                name="cookingTime"
                type="number"
                value={recipe.cookingTime}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ 
                  height: '56px',
                  borderColor: darkMode ? 'primary.main' : '#626F47',
                  color: darkMode ? 'primary.main' : '#626F47',
                  '&:hover': {
                    borderColor: darkMode ? 'primary.dark' : '#4a5a35',
                    backgroundColor: darkMode ? 'primary.main' : '#626F47',
                    color: 'white'
                  }
                }}
                startIcon={<CloudUploadIcon />}
              >
                Upload Recipe Image
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  hidden
                />
              </Button>
              {recipe.image && (
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  Selected: {recipe.image.name}
                </Typography>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{ 
                  py: 1.5,
                  backgroundColor: darkMode ? 'primary.main' : '#626F47',
                  '&:hover': {
                    backgroundColor: darkMode ? 'primary.dark' : '#4a5a35'
                  }
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Recipe'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateRecipeForm;
