import DirectionsBus from "@mui/icons-material/DirectionsBus";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import DirectionsTransit from "@mui/icons-material/DirectionsTransit";
import DirectionsWalk from "@mui/icons-material/DirectionsWalk";
import Flight from "@mui/icons-material/Flight";
import HelpOutline from "@mui/icons-material/HelpOutline";
import Logout from "@mui/icons-material/Logout";
import Notifications from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
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
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const Transportation = () => {
  return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ width: 290, bgcolor: "background.paper" }}>
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <img
            src="https://c.animaapp.com/jDPFqqpW/img/image-1@2x.png"
            alt="Logo"
            style={{ width: 50, height: 50 }}
          />
          <Typography variant="h4" fontWeight="bold" sx={{ ml: 2 }}>
            RollCall
          </Typography>
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon>
              <img
                src="https://c.animaapp.com/jDPFqqpW/img/image@2x.png"
                alt="Dashboard"
                style={{ width: 22, height: 22 }}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button selected>
            <ListItemIcon>
              <img
                src="https://c.animaapp.com/jDPFqqpW/img/image-2@2x.png"
                alt="Create a Trip"
                style={{ width: 22, height: 22 }}
              />
            </ListItemIcon>
            <ListItemText primary="Create a Trip" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <img
                src="https://c.animaapp.com/jDPFqqpW/img/image-7@2x.png"
                alt="My Trips"
                style={{ width: 22, height: 22 }}
              />
            </ListItemIcon>
            <ListItemText primary="My Trips" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
        <Box sx={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            fullWidth
          >
            Log Out
          </Button>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Hi, Mr. Peabody!</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <IconButton color="inherit">
              <Person />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Create a Trip
          </Typography>
          <Tabs value={1} sx={{ mt: 2 }}>
            <Tab label="Basic Information" />
            <Tab label="Transportation" />
            <Tab label="Student Roster" />
            <Tab label="Adult Roster" />
            <Tab label="Funding" />
            <Tab label="Documents" />
          </Tabs>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" fontWeight="bold">
            What is the mode(s) of transportation for the trip?
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label="Walking"
                icon={<DirectionsWalk />}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label="Car"
                icon={<DirectionsCar />}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label="Bus"
                icon={<DirectionsBus />}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label="Charter Bus"
                icon={<DirectionsTransit />}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label="Train"
                icon={<Train />}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label="Plane"
                icon={<Flight />}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox />}
                label="Other"
                icon={<Search />}
              />
              <TextField variant="outlined" size="small" />
            </Grid>
          </Grid>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 3 }}>
            Please list any necessary travel accommodations (e.g. wheelchair
            accessibility, special education).
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
