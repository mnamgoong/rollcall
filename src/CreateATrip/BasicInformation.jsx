import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

const BasicInformation = () => {
  return (
    <Container>
      {/* Form Content */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="What is the name of your trip?"
            variant="outlined"
            helperText="50 remaining characters"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="What city/state/province is the main destination located in?"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="What is the main destination?"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="What are the tentative date(s) for the trip?"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Overnight Trip"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Out of State Trip"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="International Trip"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="What subject area does it cover?"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Describe the activity or event."
            variant="outlined"
            multiline
            rows={4}
            helperText="250 remaining characters"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="How does the trip relate to the curriculum?"
            variant="outlined"
            multiline
            rows={4}
            helperText="250 remaining characters"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="What arrangements have been made for those students not attending the trip?"
            variant="outlined"
            multiline
            rows={4}
            helperText="250 remaining characters"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="What is the eligibility criteria to receive an invitation to participate in the trip?"
            variant="outlined"
            multiline
            rows={4}
            helperText="250 remaining characters"
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BasicInformation;