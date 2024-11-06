import DirectionsBus from "@mui/icons-material/DirectionsBus";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import DirectionsTransit from "@mui/icons-material/DirectionsTransit";
import DirectionsWalk from "@mui/icons-material/DirectionsWalk";
import Flight from "@mui/icons-material/Flight";
import Search from "@mui/icons-material/Search";
import Train from "@mui/icons-material/Train";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const Transportation = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" fontWeight="bold">
          What is the mode(s) of transportation for the trip?
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="Walking" icon={<DirectionsWalk />} />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="Car" icon={<DirectionsCar />} />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="Bus" icon={<DirectionsBus />} />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="Charter Bus" icon={<DirectionsTransit />} />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="Train" icon={<Train />} />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="Plane" icon={<Flight />} />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="Other" icon={<Search />} />
            <TextField variant="outlined" size="small" />
          </Grid>
        </Grid>
        <Typography variant="body1" fontWeight="bold" sx={{ mt: 3 }}>
          Please list any necessary travel accommodations (e.g. wheelchair accessibility, special education).
        </Typography>
        <TextField variant="outlined" fullWidth multiline rows={4} sx={{ mt: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Transportation;
