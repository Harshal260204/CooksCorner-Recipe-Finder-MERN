import Sidebar from '../../Components/Admin/Sidebar';
import AllRecipes from '../../Components/Admin/AllRecipes';
import CreateRecipeForm from '../../Components/Admin/CreateRecipeForm';
import Users from '../../Components/Admin/AllUsers';
import Messages from '../../Components/Admin/userMessages';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Box } from '@mui/material';

export default function AdminDashboard() {
  const { darkMode } = useTheme();
  const [selectedOption, setSelectedOption] = useState('createRecipe');

  const renderContent = () => {
    switch (selectedOption) {
      case 'all-Recipes':
        return <AllRecipes />;
      case 'createRecipe':
        return <CreateRecipeForm />;
      case 'users':
        return <Users />;
      case 'messages':
        return <Messages />;
      default:
        return <AllRecipes />;
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: darkMode ? 'background.default' : '#f8f9fa'
      }}
    >
      <Sidebar setSelectedOption={setSelectedOption} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          p: 3,
          backgroundColor: darkMode ? 'background.default' : '#f8f9fa'
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}
