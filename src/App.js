import React from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { useAuth } from 'react-oidc-context';

function App() {
  const auth = useAuth();

  const signoutRedireOut = () => {
    const clientId = "6ihgv04tth5if17o08l7liq1co"; 
    const logoutUri = "<logout uri>";  // Provide your logout URI
    const cognitoDomain = "https://us-east-1mpeeh4bud.auth.us-east-1.amazoncognito.com/login?client_id=6ihgv04tth5if17o08l7liq1co&redirect_uri=https://final.d1gco6deqlx7f6.amplifyapp.com&response_type=code&scope=email+openid+phone";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" mt={2}>Loading...</Typography>
      </Box>
    );
  }

  if (auth.error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">Encountering error: {auth.error.message}</Typography>
      </Box>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Typography 
          variant="h4" 
          sx={{
            background: 'linear-gradient(to right, #00c6ff, #0072ff)', 
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
            marginBottom: 3,
          }}
        >
          Welcome, {auth.user?.profile.email}
        </Typography>

        {/* Centered Sign Out Button */}
        <Box display="flex" justifyContent="center" width="100%">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => auth.removeUser()} 
            sx={{
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
            Sign out
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Typography 
        variant="h3" 
        sx={{
          background: 'linear-gradient(to right, #00c6ff, #0072ff)', // Ombre blue effect
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
          onClick={() => auth.signinRedirect()} 
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
}

export default App;