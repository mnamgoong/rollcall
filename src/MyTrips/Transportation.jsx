import { 
    AccountCircle, 
    Dashboard, 
    DirectionsBus, 
    HelpOutline, 
    Logout, 
    Notifications, 
} from "@mui/icons-material"; 
import { 
    AppBar, 
    Avatar, 
    Badge, 
    Box, 
    Button, 
    Checkbox, 
    FormControlLabel, 
    Grid, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon,
    ListItemText, 
    Paper, 
    Tab, 
    Tabs, 
    TextField, 
    Toolbar, 
    Typography, 
} from "@mui/material"; 
import React from "react"; 

const MyTrips = () => { 
    return ( 
        <Box display="flex" justifyContent="center" width="100%"> 
            <Box width="1728px" height="1117px" position="relative" bgcolor="white"> 
                <Box width="290px" height="1117px" position="absolute" top={0} left={0} bgcolor="white" > 
                    <Box position="absolute" width="258px" height="55px" top="1047px" left="17px" > 
                        <Button 
                            variant="contained" 
                            color="error" 
                            startIcon={<Logout />} 
                            sx={{ 
                                width: "100%", 
                                height: "100%", 
                                borderRadius: "9px" 
                            }} > 
                            Log Out 
                        </Button> 
                    </Box> 
                    <Box position="absolute" width="228px" height="55px" top="31px" left="42px" > 
                        <Typography variant="h4" fontWeight="bold"> RollCall </Typography> 
                        <Avatar src="https://via.placeholder.com/50" alt="Logo" /> 
                    </Box> 
                    <List> 
                        <ListItem button> <ListItemIcon> <Dashboard /> </ListItemIcon> <ListItemText primary="Dashboard" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <DirectionsBus /> </ListItemIcon> <ListItemText primary="Create a Trip" /> </ListItem> 
                        <ListItem button selected> <ListItemIcon> <DirectionsBus /> </ListItemIcon> <ListItemText primary="My Trips" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <HelpOutline /> </ListItemIcon> <ListItemText primary="Help" /> </ListItem> 
                    </List> 
                </Box> 
                <Box position="absolute" width="1438px" height="1117px" top={0} left="290px" > 
                    <AppBar position="static" color="primary"> 
                        <Toolbar> 
                            <Typography variant="h6" sx={{ flexGrow: 1 }}> Hi, Mr. Peabody! </Typography> 
                            <IconButton color="inherit"> 
                                <Badge badgeContent={1} color="error"> 
                                    <Notifications /> 
                                </Badge> 
                            </IconButton> 
                            <IconButton color="inherit"> <AccountCircle /> </IconButton> 
                        </Toolbar> 
                    </AppBar> 
                    <Box padding={2}> 
                        <Typography variant="h5" gutterBottom> My Trip #1579 </Typography> 
                        <Box display="flex" alignItems="center" mb={2}> 
                            <Typography variant="body1" color="textSecondary"> Status: </Typography> 
                            <Box ml={1} px={2} py={0.5} bgcolor="success.light" borderRadius="5px" > 
                                <Typography variant="body1" color="success.main"> Next Week </Typography>
                            </Box> 
                        </Box> 
                        <Tabs value={1} indicatorColor="primary" textColor="primary"> 
                            <Tab label="Basic Information" /> 
                            <Tab label="Transportation" /> 
                            <Tab label="Student Roster" /> 
                            <Tab label="Adult Roster" /> 
                            <Tab label="Funding" /> 
                            <Tab label="Documents" /> 
                        </Tabs> 
                        <Box mt={2}> 
                            <Typography variant="body1" color="textSecondary"> What is the mode(s) of transportation for the trip? </Typography> 
                            <Box display="flex" alignItems="center" mt={1}> 
                                <FormControlLabel control={<Checkbox />} label="Walking" /> 
                                <FormControlLabel control={<Checkbox />} label="Car" /> 
                                <FormControlLabel control={<Checkbox checked />} label="Bus" /> 
                                <FormControlLabel control={<Checkbox />} label="Charter Bus" /> 
                                <FormControlLabel control={<Checkbox />} label="Train" /> 
                                <FormControlLabel control={<Checkbox />} label="Plane" /> 
                                <FormControlLabel control={<Checkbox />} label="Other" /> 
                                <TextField variant="outlined" size="small" /> 
                            </Box> 
                        </Box> 
                        <Box mt={2}> 
                            <Typography variant="body1" color="textSecondary"> Please list any necessary travel accommodations (e.g. wheelchair accessibility, special education). </Typography> 
                            <TextField variant="outlined" fullWidth size="small" placeholder="Special Education" sx={{ mt: 1 }} /> 
                        </Box> 
                        <Typography variant="h6" mt={4}> Transportation Needs </Typography> 
                        <Grid container spacing={2} mt={2}> 
                            <Grid item xs={2}> 
                                <Paper elevation={1} sx={{ padding: 2, textAlign: "center" }}> 
                                    <Typography variant="body1" color="textSecondary"> Total People Attending </Typography> 
                                    <Typography variant="h4">26</Typography> 
                                </Paper> 
                            </Grid> 
                            <Grid item xs={2}> 
                                <Paper elevation={1} sx={{ padding: 2, textAlign: "center" }}> 
                                    <Typography variant="body1" color="textSecondary"> Total Students </Typography> 
                                    <Typography variant="h4">20</Typography> 
                                </Paper> 
                            </Grid> 
                            <Grid item xs={2}> 
                                <Paper elevation={1} sx={{ padding: 2, textAlign: "center" }}> 
                                    <Typography variant="body1" color="textSecondary"> Total Adults </Typography> 
                                    <Typography variant="h4">26</Typography> 
                                </Paper> 
                            </Grid> 
                            <Grid item xs={2}> 
                                <Paper elevation={1} sx={{ padding: 2, textAlign: "center" }}> 
                                    <Typography variant="body1" color="textSecondary"> Regular Education </Typography> 
                                    <Typography variant="h4">18</Typography> 
                                </Paper> 
                            </Grid> 
                            <Grid item xs={2}> 
                                <Paper elevation={1} sx={{ padding: 2, textAlign: "center" }}> 
                                    <Typography variant="body1" color="textSecondary"> Special Education </Typography> 
                                    <Typography variant="h4">2</Typography> 
                                </Paper> 
                            </Grid> 
                        </Grid> 
                        <Box mt={4}>
                            <Typography variant="body1" color="textSecondary"> Mode </Typography> 
                            <Grid container spacing={2} mt={1}> 
                                <Grid item xs={3}> 
                                    <Typography variant="body1">Bus</Typography> 
                                </Grid> 
                                <Grid item xs={3}> 
                                    <Typography variant="body1">1</Typography> 
                                </Grid> 
                                <Grid item xs={3}> 
                                    <Typography variant="body1">1</Typography>
                                </Grid> 
                                <Grid item xs={3}> 
                                    <Typography variant="body1">0</Typography> 
                                </Grid> 
                                <Grid item xs={3}> 
                                    <Typography variant="body1">Special Education Bus</Typography> 
                                </Grid> 
                                <Grid item xs={3}> 
                                    <Typography variant="body1">1</Typography> 
                                </Grid> 
                                <Grid item xs={3}> 
                                    <Typography variant="body1">1</Typography> 
                                </Grid> 
                                <Grid item xs={3}> 
                                    <Typography variant="body1">0</Typography> 
                                </Grid> 
                            </Grid> 
                        </Box> 
                        <Box mt={4} textAlign="center"> 
                            <Button variant="contained" color="primary"> Next </Button> 
                        </Box> 
                    </Box> 
                </Box> 
            </Box> 
        </Box> 
    ); 
}; 

export default MyTrips;