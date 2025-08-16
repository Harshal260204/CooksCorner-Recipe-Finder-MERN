import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  Paper,
  Grid
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

function UserProfile() {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    number: user?.number || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear API messages when user starts typing
    if (apiError) setApiError('');
    if (apiSuccess) setApiSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    setApiSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3000/users/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsEditing(false);
        setApiSuccess('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Failed to update profile. Please try again.');
      }
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
          User Profile
        </Typography>
        
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {apiError}
          </Alert>
        )}
        
        {apiSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>Success</AlertTitle>
            {apiSuccess}
          </Alert>
        )}
        
        {!isEditing ? (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Name:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1">
                  {user?.name}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Email:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1">
                  {user?.email}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Phone:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1">
                  {user?.number}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Role:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1">
                  {user?.isAdmin ? 'Admin' : 'User'}
                </Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{ 
                  backgroundColor: darkMode ? 'primary.main' : '#626F47',
                  '&:hover': {
                    backgroundColor: darkMode ? 'primary.dark' : '#4a5a35'
                  }
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1, my: 0.5 }} />,
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, my: 0.5 }} />,
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="number"
              label="Phone Number"
              name="number"
              autoComplete="tel"
              value={formData.number}
              onChange={handleChange}
              InputProps={{
                startAdornment: <PhoneIcon sx={{ mr: 1, my: 0.5 }} />,
              }}
              sx={{ mb: 2 }}
            />
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <SaveIcon />}
                disabled={loading}
                sx={{ 
                  backgroundColor: darkMode ? 'primary.main' : '#626F47',
                  '&:hover': {
                    backgroundColor: darkMode ? 'primary.dark' : '#4a5a35'
                  }
                }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    number: user?.number || '',
                  });
                  setApiError('');
                  setApiSuccess('');
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default UserProfile;
