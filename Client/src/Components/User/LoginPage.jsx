import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../Styles/Forms.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
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
  Paper
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';

function LoginForm() {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    // Clear API error when user starts typing
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/user-login", formData);
      
      if (response.data) {
        // Store the token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        setToken(response.data.token);
        setUser(response.data);
        
        setFormData({ email: '', password: '' });
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
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
          Login
        </Typography>
        
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {apiError}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, my: 0.5 }} />,
            }}
            sx={{ mb: 2 }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              backgroundColor: darkMode ? 'primary.main' : '#626F47',
              '&:hover': {
                backgroundColor: darkMode ? 'primary.dark' : '#4a5a35'
              }
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Don't have an account?{' '}
              <Link to="/register-page" style={{ 
                textDecoration: 'none', 
                color: darkMode ? '#93c5fd' : '#007bff',
                fontWeight: 'bold'
              }}>
                Register
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link to="/forgot-password" style={{ 
                textDecoration: 'none', 
                color: darkMode ? '#93c5fd' : '#007bff',
                fontWeight: 'bold'
              }}>
                Forgot Password?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginForm;
