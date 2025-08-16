import React, { useState } from "react";
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  Paper,
  Grid,
  Box
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Message as MessageIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const ContactUs = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    // Clear submit messages when user starts typing
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    
    // Simulate form submission (in a real app, you would send this to your backend)
    try {
      // This is where you would make an API call to submit the form
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
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
        Contact Us
      </Typography>
      
      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <AlertTitle>Success</AlertTitle>
          Thank you for your message! We'll get back to you soon.
        </Alert>
      )}
      
      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Error</AlertTitle>
          {submitError}
        </Alert>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={6} 
            sx={{ 
              p: 4, 
              borderRadius: 4,
              backgroundColor: darkMode ? 'background.paper' : 'white'
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                mb: 3,
                fontWeight: 'bold',
                color: darkMode ? 'primary.main' : '#626F47'
              }}
            >
              Send us a Message
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
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
                error={!!errors.name}
                helperText={errors.name}
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
                name="message"
                label="Your Message"
                type="text"
                id="message"
                multiline
                rows={6}
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                InputProps={{
                  startAdornment: (
                    <MessageIcon 
                      sx={{ 
                        mr: 1, 
                        my: 0.5,
                        verticalAlign: 'top'
                      }} 
                    />
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{ 
                  mt: 3, 
                  py: 1.5,
                  backgroundColor: darkMode ? 'primary.main' : '#626F47',
                  '&:hover': {
                    backgroundColor: darkMode ? 'primary.dark' : '#4a5a35'
                  }
                }}
              >
                {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Message'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={6} 
            sx={{ 
              p: 4, 
              borderRadius: 4,
              backgroundColor: darkMode ? 'background.paper' : 'white',
              height: '100%'
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                mb: 3,
                fontWeight: 'bold',
                color: darkMode ? 'primary.main' : '#626F47'
              }}
            >
              Get in Touch
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: darkMode ? 'primary.main' : '#626F47' }} />
                <Typography variant="body1">
                  support@cookscorner.com
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: darkMode ? 'primary.main' : '#626F47' }} />
                <Typography variant="body1">
                  +91 9876543210
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon sx={{ mr: 2, color: darkMode ? 'primary.main' : '#626F47' }} />
                <Typography variant="body1">
                  123 Recipe Street, Foodville, India
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
              We're here to help you with any questions about our recipes or services.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
