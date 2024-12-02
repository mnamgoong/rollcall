// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from '../Components/Sidebar';

const DashboardLayout = ({ children, selectedPage, setSelectedPage }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: 240, flexShrink: 0 }}>
        <Sidebar 
          selectedPage={selectedPage} 
          setSelectedPage={setSelectedPage}
        />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;