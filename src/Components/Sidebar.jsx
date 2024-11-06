import React from 'react';
import Dashboard from "@mui/icons-material/Dashboard";
import HelpOutline from "@mui/icons-material/HelpOutline";
import LocationOn from "@mui/icons-material/LocationOn";
import Logout from "@mui/icons-material/Logout";
import TripOrigin from "@mui/icons-material/TripOrigin";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <Box width="290px" height="100vh" bgcolor="white">
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
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button selected>
            <ListItemIcon><LocationOn /></ListItemIcon>
            <ListItemText primary="Create a Trip" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><TripOrigin /></ListItemIcon>
            <ListItemText primary="My Trips" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><HelpOutline /></ListItemIcon>
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
  );
};

export default Sidebar;
