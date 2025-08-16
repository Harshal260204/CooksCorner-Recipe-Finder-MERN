import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Alert,
  AlertTitle,
  Box,
  IconButton
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Fastfood as FastfoodIcon
} from '@mui/icons-material';

const AllRecipes = () => {
    const { darkMode } = useTheme();
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/recipes/');
                setRecipes(response.data.recipes);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Failed to fetch recipes');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await axios.delete(`http://localhost:3000/recipes/${id}`);
                setRecipes(recipes.filter(recipe => recipe._id !== id));
            } catch (error) {
                console.error('Error deleting recipe:', error);
                setError('Failed to delete recipe');
            }
        }
    };

    const handleEditClick = (recipe) => {
        setEditingRecipe(recipe._id);
        setEditFormData({ name: recipe.name, description: recipe.description });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/recipes/${id}`, editFormData);
            setRecipes(recipes.map(recipe => recipe._id === id ? response.data.recipe : recipe));
            setEditingRecipe(null);
        } catch (error) {
            console.error('Error updating recipe:', error);
            setError('Failed to update recipe');
        }
    };

    const handleCancelEdit = () => {
        setEditingRecipe(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress size={60} sx={{ color: darkMode ? 'primary.main' : '#626F47' }} />
            </Box>
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
                All Recipes
            </Typography>
            
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}
            
            {recipes.length === 0 ? (
                <Alert severity="info" sx={{ justifyContent: 'center' }}>
                    No recipes found.
                </Alert>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="recipes table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: darkMode ? 'primary.main' : '#626F47' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipes.map((recipe, index) => (
                                <TableRow 
                                    key={recipe._id} 
                                    sx={{ 
                                        '&:nth-of-type(odd)': {
                                            backgroundColor: darkMode ? 'background.default' : '#f8f9fa',
                                        },
                                        '&:hover': {
                                            backgroundColor: darkMode ? 'action.hover' : '#e9ecef'
                                        }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {editingRecipe === recipe._id ? (
                                            <TextField
                                                name="name"
                                                value={editFormData.name}
                                                onChange={handleEditChange}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                            />
                                        ) : (
                                            recipe.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingRecipe === recipe._id ? (
                                            <TextField
                                                name="description"
                                                value={editFormData.description}
                                                onChange={handleEditChange}
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                            />
                                        ) : (
                                            recipe.description
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingRecipe === recipe._id ? (
                                            <>
                                                <IconButton 
                                                    color="primary" 
                                                    onClick={() => handleEditSubmit(recipe._id)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton 
                                                    color="secondary" 
                                                    onClick={handleCancelEdit}
                                                >
                                                    <CancelIcon />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton 
                                                    color="primary" 
                                                    onClick={() => handleEditClick(recipe)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton 
                                                    color="error" 
                                                    onClick={() => handleDelete(recipe._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default AllRecipes;
