import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, InputBase, IconButton, Checkbox } from '@mui/material';

import DashboardCardContainer from './DashboardCardContainer';
import PropertyOccupancyOvervew from './PropertyOccupancyOvervew';
import FinancialOverview from './FinancialOverview';



function Dashboard() {
  return (

        <Box component="main" sx={{ flexGrow: 1, px: 3,overflowY:'auto' }}>
          <Typography gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', pb: 2, fontSize: '24px' }}>
            Dashboard
          </Typography>
          <DashboardCardContainer />
          <PropertyOccupancyOvervew />
          <FinancialOverview />
        </Box>

  );
}

export default Dashboard;