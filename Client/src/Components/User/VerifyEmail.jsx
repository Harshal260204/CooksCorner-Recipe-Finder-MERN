import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
  Paper
} from '@mui/material';
import {
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const VerifyEmail = () => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Update the API endpoint to match your backend
        const response = await axios.get(`http://localhost:3000/users/verify-email/${token}`);
        setMessage(response.data.message);
        setIsSuccess(true);
        setLoading(false);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login-page');
        }, 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Email verification failed');
        setIsSuccess(false);
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('Invalid verification token');
      setLoading(false);
    }
  }, [token, navigate]);

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          borderRadius: 4,
          backgroundColor: darkMode ? 'background.paper' : 'white',
          textAlign: 'center'
        }}
      >
        <EmailIcon 
          sx={{ 
            fontSize: 60, 
            color: darkMode ? 'primary.main' : '#626F47',
            mb: 2
          }} 
        />
        
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            color: darkMode ? 'primary.main' : '#626F47'
          }}
        >
          Email Verification
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={60} sx={{ color: darkMode ? 'primary.main' : '#626F47', mb: 2 }} />
            <Typography variant="h6">
              Verifying your email...
            </Typography>
          </Box>
        ) : (
          <Box>
            <Alert 
              severity={isSuccess ? "success" : "error"}
              sx={{ 
                mb: 2,
                '& .MuiAlert-icon': {
                  color: isSuccess ? 'success.main' : 'error.main'
                }
              }}
            >
              <AlertTitle>
                {isSuccess ? "Success" : "Error"}
              </AlertTitle>
              {message}
            </Alert>
            
            {isSuccess && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                You will be redirected to the login page shortly...
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default VerifyEmail;