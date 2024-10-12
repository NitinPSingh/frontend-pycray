import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {  Box, Paper, InputBase, IconButton, Avatar, Typography } from '@mui/material';
import Sidebar from './components/SideBar';
import Dashboard from './components//Dashboard';
import { PropertyProvider } from './context/PropertyContext';
import Topbar from './components/Topbar';
import { GlobalStyles } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#161E54',
      secondary: 'rgba(0, 0, 0, 0.25)',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      fontSize: '32px',
      color: '#000000',
      fontWeight: 'bold',
    },
    body2: {
      fontSize: '16px',
      color: '#161E54',
    },
    caption: {
      fontSize: '14px',
      color: 'rgba(0, 0, 0, 0.25)',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          cursor: 'default',
        },
      },
    },
  },
});



const Placeholder = ({ text }) => (
  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e', mb: 3 }}>
    {text}
  </Typography>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PropertyProvider>
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white',padding:'26px 26px 26px 0px' }}>
          <Sidebar />
          <Box sx={{borderRadius:'10px',backgroundColor:'background.default',width:'100%'}}>
            <Topbar />
            <Routes >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-portfolio" element={<Placeholder text="Still building Create Portfolio..." />} />
              <Route path="/property-list" element={<Placeholder text="Still building Property List..." />} />
              <Route path="/support" element={<Placeholder text="Still building Support..." />} />
              <Route path="/settings" element={<Placeholder text="Still building Settings..." />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
            </Box>
          </Box>
      </Router>
      </PropertyProvider>
    </ThemeProvider>
  );
}

export default App;
