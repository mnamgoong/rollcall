import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const Funding = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="body1" fontWeight="bold" mb={2}>
          What is the source of funding for the trip?
        </Typography>
        <Select fullWidth defaultValue="">
          <MenuItem value="">- Select -</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold" mb={2}>
            What is the estimated cost per student?
          </Typography>
          <TextField fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold" mb={2}>
            What is the total estimated cost?
          </Typography>
          <TextField fullWidth variant="outlined" />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Funding;