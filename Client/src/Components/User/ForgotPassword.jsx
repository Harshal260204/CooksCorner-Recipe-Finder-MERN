import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Paper
} from '@mui/material';
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const ForgotPassword = () => {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Update the API endpoint to match your backend
      const response = await axios.post('http://localhost:3000/users/request-password-reset', { email });
      setMessage(response.data.message);
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
      setIsSuccess(false);
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
          Forgot Password
        </Typography>
        
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mb: 3,
            color: 'text.secondary'
          }}
        >
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        
        {message && (
          <Alert severity={isSuccess ? "success" : "error"} sx={{ mb: 2 }}>
            <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
            {message}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, my: 0.5 }} />,
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
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Reset Link'}
          </Button>
        </Box>
        
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            onClick={() => navigate('/login-page')}
            startIcon={<ArrowBackIcon />}
            sx={{ 
              color: darkMode ? 'primary.main' : '#626F47',
              fontWeight: 'bold'
            }}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;