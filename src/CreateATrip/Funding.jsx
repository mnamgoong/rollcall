import DirectionsBusOutlined from "@mui/icons-material/DirectionsBusOutlined";
import HelpOutline from "@mui/icons-material/HelpOutline";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Logout from "@mui/icons-material/Logout";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import PeopleOutline from "@mui/icons-material/PeopleOutline";
import PersonOutline from "@mui/icons-material/PersonOutline";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const Funding = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <CssBaseline />
      <Box width="1728px" height="1117px" display="flex">
        <Box width="290px" height="1117px" bgcolor="white">
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <img
              src="https://c.animaapp.com/Kxd7R2GQ/img/image-1@2x.png"
              alt="Logo"
              style={{ width: 50, height: 50 }}
            />
            <Typography variant="h4" fontWeight="bold">
              RollCall
            </Typography>
          </Box>
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button selected>
              <ListItemIcon>
                <DirectionsBusOutlined />
              </ListItemIcon>
              <ListItemText primary="Create a Trip" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleOutline />
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
          <Box position="absolute" bottom={16} left={16} width="258px">
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
        <Box flex={1} display="flex" flexDirection="column">
          <Box
            height="89px"
            bgcolor="#1f4571"
            display="flex"
            alignItems="center"
            px={4}
          >
            <Typography variant="h4" color="white" flexGrow={1}>
              Hi, Mr. Peabody!
            </Typography>
            <Box display="flex" alignItems="center">
              <NotificationsOutlined
                style={{ color: "#4a73a1", marginRight: 16 }}
              />
              <PersonOutline style={{ color: "#4a73a1" }} />
            </Box>
          </Box>
          <Container>
            <Typography variant="h5" mt={4} mb={2}>
              Create a Trip
            </Typography>
            <Box display="flex" mb={2}>
              <Typography variant="body1" color="textSecondary" mr={4}>
                Basic Information
              </Typography>
              <Typography variant="body1" color="textSecondary" mr={4}>
                Transportation
              </Typography>
              <Typography variant="body1" color="textSecondary" mr={4}>
                Student Roster
              </Typography>
              <Typography variant="body1" color="textSecondary" mr={4}>
                Adult Roster
              </Typography>
              <Typography variant="body1" color="primary" mr={4}>
                Funding
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Documents
              </Typography>
            </Box>
            <Divider />
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
        </Box>
      </Box>
    </Box>
  );
};