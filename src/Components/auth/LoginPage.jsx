import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const LoginPage = ({ onLogin }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Typography 
        variant="h3" 
        sx={{
          background: 'linear-gradient(to right, #00c6ff, #0072ff)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold',
          marginBottom: 3,
        }}
      >
        RollCall
      </Typography>

      <Box>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onLogin}
          sx={{
            display: 'block',
            marginBottom: 2,
            padding: '10px 20px',
            fontWeight: 'bold',
            borderRadius: '50px',
            boxShadow: 3,
            backgroundColor: '#0072ff',
            '&:hover': {
              backgroundColor: '#00c6ff',
            },
          }}
        >
          Sign in
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;