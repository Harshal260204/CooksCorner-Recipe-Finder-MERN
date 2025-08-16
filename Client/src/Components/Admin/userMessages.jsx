import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I love your recipes! The butter chicken recipe was amazing.',
    date: '2023-05-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'Do you have any vegan dessert recipes?',
    date: '2023-05-10'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    message: 'The breakfast recipes are fantastic. Keep up the good work!',
    date: '2023-05-05'
  }
];

const UserMessages = () => {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Simulate fetching messages
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(message => message.id !== id));
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMessage(null);
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
        User Messages
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      
      {messages.length === 0 ? (
        <Alert severity="info" sx={{ justifyContent: 'center' }}>
          No messages found.
        </Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="messages table">
            <TableHead>
              <TableRow sx={{ backgroundColor: darkMode ? 'primary.main' : '#626F47' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  <EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Email
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  <MessageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Message Preview
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((message, index) => (
                <TableRow 
                  key={message.id} 
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
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>
                    {message.message.length > 50 
                      ? `${message.message.substring(0, 50)}...` 
                      : message.message}
                  </TableCell>
                  <TableCell>{message.date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={() => handleViewMessage(message)}
                      sx={{ mr: 1, mb: 1 }}
                    >
                      View
                    </Button>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(message.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: darkMode ? '#1a1a1a' : 'white',
            color: darkMode ? 'white' : 'black'
          }
        }}
      >
        <DialogTitle>
          Message Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: darkMode ? 'white' : 'black',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedMessage && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                From: {selectedMessage.name} ({selectedMessage.email})
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Date: {selectedMessage.date}
              </Typography>
              <Typography variant="body1">
                {selectedMessage.message}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog} 
            variant="contained"
            sx={{ 
              backgroundColor: darkMode ? 'primary.main' : '#626F47',
              '&:hover': {
                backgroundColor: darkMode ? 'primary.dark' : '#4a5a35'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserMessages;