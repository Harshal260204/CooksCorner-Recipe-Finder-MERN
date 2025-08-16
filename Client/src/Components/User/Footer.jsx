import React from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact-us' }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: '#' },
    { icon: <InstagramIcon />, url: '#' },
    { icon: <TwitterIcon />, url: '#' },
    { icon: <YouTubeIcon />, url: '#' }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'primary.dark',
        color: 'white',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              CooksCorner
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Discover, create, and share delicious recipes from around the world.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  style={{ 
                    color: 'inherit', 
                    textDecoration: 'none', 
                    margin: '0 8px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {socialLinks.map((social, index) => (
                <IconButton 
                  key={index}
                  href={social.url}
                  sx={{ 
                    color: 'white',
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} CooksCorner. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
