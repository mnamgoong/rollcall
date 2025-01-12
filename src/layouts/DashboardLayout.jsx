// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const DashboardLayout = ({ children, userName, onSignOut, selectedPage, onPageSelect }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex">
        <Sidebar 
          onSelectPage={onPageSelect}
          onSignOut={onSignOut}
          selectedPage={selectedPage}
        />
        <Box ml="20vw" width="80vw">
          <Header userName={userName} />
          <Container sx={{ mt: "10vh" }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayout;