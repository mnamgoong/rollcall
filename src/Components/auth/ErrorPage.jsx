import React from 'react';
import { Box, Typography } from '@mui/material';

const ErrorPage = ({ error }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h6" color="error">Encountering error: {error.message}</Typography>
    </Box>
  );
};

export default ErrorPage;