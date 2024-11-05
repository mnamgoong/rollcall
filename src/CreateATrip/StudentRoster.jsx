import AccountCircle from "@mui/icons-material/AccountCircle";
import DirectionsBusOutlined from "@mui/icons-material/DirectionsBusOutlined";
import HelpOutline from "@mui/icons-material/HelpOutline";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Logout from "@mui/icons-material/Logout";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import PersonOutline from "@mui/icons-material/PersonOutline";
import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

export const StudentRoster = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box display="flex" width="1728px" height="1117px">
        <Box width="290px" height="1117px" bgcolor="white">
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <img
              src="https://c.animaapp.com/boRUb0eb/img/image-1@2x.png"
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
                <PersonOutline />
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
        <Box flexGrow={1}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Hi, Mr. Peabody!
              </Typography>
              <IconButton color="inherit">
                <NotificationsOutlined />
              </IconButton>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Create a Trip
            </Typography>
            <Divider />
            <Box display="flex" mt={2} mb={2}>
              <Typography variant="h6" color="textSecondary" mr={3}>
                Basic Information
              </Typography>
              <Typography variant="h6" color="textSecondary" mr={3}>
                Transportation
              </Typography>
              <Typography variant="h6" color="primary" mr={3}>
                Student Roster
              </Typography>
              <Typography variant="h6" color="textSecondary" mr={3}>
                Adult Roster
              </Typography>
              <Typography variant="h6" color="textSecondary" mr={3}>
                Funding
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Documents
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              Which class are you taking on the trip?
            </Typography>
            <FormControl fullWidth variant="outlined">
              <InputLabel>- Select -</InputLabel>
              <Select native label="- Select -">
                <option aria-label="None" value="" />
                <option value={10}>Class 1</option>
                <option value={20}>Class 2</option>
                <option value={30}>Class 3</option>
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="center" mt={4}>
              <Button variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
