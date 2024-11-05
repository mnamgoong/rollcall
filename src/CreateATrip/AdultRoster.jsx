import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export const AdultRoster = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box display="flex" width="1728px" height="1117px">
        <Box
          width="290px"
          height="1117px"
          position="absolute"
          top={0}
          left={0}
          bgcolor="white"
        >
          <Box
            position="absolute"
            width="258px"
            height="55px"
            top="1047px"
            left="17px"
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<ExitToAppIcon />}
              sx={{ width: "100%", height: "100%", borderRadius: "9px" }}
            >
              Log Out
            </Button>
          </Box>

          <Box
            position="absolute"
            width="228px"
            height="55px"
            top="31px"
            left="42px"
          >
            <Typography variant="h4" fontWeight="bold">
              RollCall
            </Typography>
            <IconButton>
              <HomeIcon fontSize="large" />
            </IconButton>
          </Box>

          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button selected>
              <ListItemIcon>
                <DirectionsBusIcon />
              </ListItemIcon>
              <ListItemText primary="Create a Trip" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="My Trips" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </List>
        </Box>

        <Box
          width="1438px"
          height="1117px"
          position="absolute"
          top={0}
          left="290px"
        >
          <Box width="1438px" height="89px" bgcolor="#1f4571" />
          <Box position="absolute" top="6px" left="35px">
            <Typography variant="h4" color="white">
              Hi, Mr. Peabody!
            </Typography>
          </Box>
          <Box position="absolute" top="23px" left="1248px">
            <IconButton>
              <NotificationsOutlined />
            </IconButton>
          </Box>
          <Box position="absolute" top="23px" left="1333px">
            <IconButton>
              <PersonIcon />
            </IconButton>
          </Box>

          <Box
            width="1438px"
            height="1028px"
            position="absolute"
            top="89px"
            left={0}
            overflow="auto"
          >
            <Container>
              <Typography variant="h4" fontWeight="bold" mt={2}>
                Create a Trip
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="h6">Basic Information</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Transportation</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Student Roster</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="primary">
                    Adult Roster
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Funding</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Documents</Typography>
                </Grid>
              </Grid>
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
