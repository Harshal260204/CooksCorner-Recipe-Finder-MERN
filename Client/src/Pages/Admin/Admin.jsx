import React from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext';
import { Box, Typography } from '@mui/material';
import { AdminPanelSettings as AdminPanelSettingsIcon } from '@mui/icons-material';

const Admin = () => {
  const { darkMode } = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: darkMode ? 'background.default' : '#f8f9fa',
      p: 3
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        pb: 2,
        borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <AdminPanelSettingsIcon 
          sx={{ 
            fontSize: 40, 
            color: darkMode ? 'primary.main' : '#626F47',
            mr: 2
          }} 
        />
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            color: darkMode ? 'primary.main' : '#626F47'
          }}
        >
          Admin Panel
        </Typography>
      </Box>
      <Box>
        <Outlet /> {/* This will render nested components */}
      </Box>
    </Box>
  )
}

export default Admin
