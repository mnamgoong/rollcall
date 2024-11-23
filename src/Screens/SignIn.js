import * as Amplify from 'aws-amplify';
import React, { useState } from 'react';
import { Box, Button, Typography, Container, TextField, Alert } from '@mui/material';
import { Auth } from 'aws-amplify';
import GoogleIcon from '@mui/icons-material/Google';

function SignIn({ onSignIn }) {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For Sign-Up validation
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // For Sign-Up success feedback

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await Auth.federatedSignIn({ provider: 'Google' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  // Handle Username/Password Sign-In
  const handleSignIn = async () => {
    try {
      setError(null); // Clear previous errors
      await Auth.signIn(username, password);
      if (onSignIn) onSignIn(); // Callback to update authentication state
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  // Handle New Account Creation
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      setError(null); // Clear previous errors
      await Auth.signUp({
        username,
        password,
      });
      setSuccessMessage('Account created successfully! You can now sign in.');
      setIsSignUp(false); // Redirect to Sign-In
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography component="h1" variant="h3">
          {isSignUp ? 'Create Account' : 'Welcome to RollCall'}
        </Typography>

        {/* Display Error Message */}
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}

        {/* Display Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        )}

        {/* Sign In or Sign Up Form */}
        <Box sx={{ width: '100%' }}>
          <TextField
            label="Username or Email"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          {isSignUp && (
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          )}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={isSignUp ? handleSignUp : handleSignIn}
            sx={{ textTransform: 'none', padding: '12px', marginBottom: 2 }}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </Box>

        {!isSignUp && (
          <Button
            variant="contained"
            size="large"
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: '#fff',
              color: '#757575',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
              padding: '12px 24px',
              textTransform: 'none',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            Sign in with Google
          </Button>
        )}

        <Typography
          variant="body2"
          sx={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => {
            setError(null);
            setSuccessMessage(null);
            setIsSignUp(!isSignUp);
          }}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
        </Typography>
      </Box>
    </Container>
  );
}

export default SignIn;
