import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";

export const AdultRoster = () => {
  return (
    <Container>
      {/* Form Content */}
      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold">
          Staff
        </Typography>
        <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <Typography>Add staff members</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold">
          Chaperones
        </Typography>
        <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <Typography>Add chaperones</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Button variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default AdultRoster;