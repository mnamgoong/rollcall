import Dashboard from "@mui/icons-material/Dashboard";
import HelpOutline from "@mui/icons-material/HelpOutline";
import LocationOn from "@mui/icons-material/LocationOn";
import Logout from "@mui/icons-material/Logout";
import Notifications from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import TripOrigin from "@mui/icons-material/TripOrigin";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Container,
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
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

export const BasicInformation = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box width="1728px" height="1117px" display="flex">
        <Box width="290px" height="1117px" bgcolor="white">
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <Box display="flex" alignItems="center" mb={4}>
              <img
                src="https://c.animaapp.com/EyZmrxhy/img/image-1@2x.png"
                alt="Logo"
                style={{ width: 50, height: 50 }}
              />
              <Typography variant="h4" fontWeight="bold" ml={2}>
                RollCall
              </Typography>
            </Box>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button selected>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary="Create a Trip" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <TripOrigin />
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
            <Button
              variant="contained"
              color="error"
              startIcon={<Logout />}
              style={{ marginTop: "auto" }}
            >
              Log Out
            </Button>
          </Box>
        </Box>
        <Box flexGrow={1} height="1117px" display="flex" flexDirection="column">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" flexGrow={1}>
                Hi, Mr. Peabody!
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={1} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <Avatar>
                <Person />
              </Avatar>
            </Toolbar>
          </AppBar>
          <Container>
            <Typography variant="h4" mt={4} mb={2}>
              Create a Trip
            </Typography>
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab label="Basic Information" />
              <Tab label="Transportation" />
              <Tab label="Student Roster" />
              <Tab label="Adult Roster" />
              <Tab label="Funding" />
              <Tab label="Documents" />
            </Tabs>
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
        </Box>
      </Box>
    </Box>
  );
};
