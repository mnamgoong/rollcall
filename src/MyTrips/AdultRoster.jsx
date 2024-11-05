import { 
    AccountCircle, 
    Add, 
    Dashboard,
    HelpOutline, 
    Logout, 
    Notifications, 
    Person, 
} from "@mui/icons-material"; 
import { 
    AppBar, 
    Avatar, 
    Box, 
    Button, 
    Container, 
    Grid, 
    IconButton,
    Link, 
    List, 
    ListItem,
    ListItemIcon, 
    ListItemText, 
    Paper, 
    Tab, 
    Tabs, 
    Toolbar,
    Typography, 
} from "@mui/material"; 
import React from "react"; 

const AdultRoster = () => { 
    return ( 
        <Box display="flex" justifyContent="center" width="100%"> 
            <Box width="1728px" height="1117px" position="relative"> 
                <Box width="290px" height="1117px" position="absolute" top={0} left={0} bgcolor="white" > 
                    <Box width="258px" height="55px" position="absolute" top="1047px" left="17px" > 
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
                    <Box width="228px" height="55px" position="absolute" top="31px" left="42px" display="flex" alignItems="center" > 
                        <img src="https://via.placeholder.com/50" alt="Logo" style={{ width: "50px", height: "50px" }} /> 
                        <Typography variant="h4" fontWeight="bold" ml={2}> RollCall </Typography> 
                    </Box>
                    <List> 
                        <ListItem button> <ListItemIcon> <Dashboard /> </ListItemIcon> <ListItemText primary="Dashboard" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <Add /> </ListItemIcon> <ListItemText primary="Create a Trip" /> </ListItem> 
                        <ListItem button selected> <ListItemIcon> <Person /> </ListItemIcon> <ListItemText primary="My Trips" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <HelpOutline /> </ListItemIcon> <ListItemText primary="Help" /> </ListItem> 
                    </List> 
                </Box> 
                <Box width="1438px" height="1117px" position="absolute" top={0} left="290px" > 
                    <AppBar position="static" color="primary"> 
                        <Toolbar> 
                            <Typography variant="h4" sx={{ flexGrow: 1 }}> Hi, Mr. Peabody! </Typography> 
                            <IconButton color="inherit"> <Notifications /> </IconButton> 
                            <Avatar sx={{ bgcolor: "#4a73a1", ml: 2 }}> <AccountCircle /> </Avatar> 
                        </Toolbar> 
                    </AppBar>
                    <Container> 
                        <Box mt={2}> 
                            <Typography variant="h5" fontWeight="bold"> My Trip #1579 </Typography> 
                            <Box display="inline-block" bgcolor="#cff9da" borderRadius="5px" px={1} ml={2} > 
                                <Typography variant="body1" color="#60aa75"> <strong>Status:</strong> Next Week </Typography> 
                            </Box> 
                        </Box> 
                        <Tabs value={3} indicatorColor="primary" textColor="primary"> 
                            <Tab label="Basic Information" /> 
                            <Tab label="Transportation" /> 
                            <Tab label="Student Roster" /> 
                            <Tab label="Adult Roster" /> 
                            <Tab label="Funding" /> 
                            <Tab label="Documents" /> 
                        </Tabs> 
                        <Box mt={2}> 
                            <Typography variant="h6" fontWeight="bold"> Staff </Typography> 
                            <Paper variant="outlined" sx={{ mt: 1, p: 2 }}> 
                                <Grid container spacing={2}> 
                                    <Grid item xs={3}> 
                                        <Typography variant="body1" color="textSecondary"> Name </Typography> 
                                        <Typography variant="body2">Mr. Peabody</Typography> 
                                        <Typography variant="body2">Ms. Sylvester</Typography> 
                                        <Box display="flex" alignItems="center" mt={1}> 
                                            <Add fontSize="small" /> 
                                            <Typography variant="body2" ml={1}> Add staff members </Typography> 
                                        </Box> 
                                    </Grid> 
                                    <Grid item xs={3}> 
                                        <Typography variant="body1" color="textSecondary"> Position </Typography> 
                                        <Typography variant="body2">High School Teacher</Typography> 
                                        <Typography variant="body2">High School Teacher</Typography> 
                                    </Grid> 
                                    <Grid item xs={3}> 
                                        <Typography variant="body1" color="textSecondary"> Phone </Typography> 
                                        <Typography variant="body2">(404) 519 - 2189</Typography> 
                                        <Typography variant="body2">(678) 127 - 1716</Typography> 
                                    </Grid> 
                                    <Grid item xs={3}> 
                                        <Typography variant="body1" color="textSecondary"> Email </Typography> 
                                        <Link href="mailto:peabody@school.edu" variant="body2"> peabody@school.edu </Link> 
                                        <Link href="mailto:sylvester@school.edu" variant="body2"> sylvester@school.edu </Link>
                                    </Grid> 
                                </Grid> 
                            </Paper> 
                        </Box> 
                        <Box mt={4}> 
                            <Typography variant="h6" fontWeight="bold"> Chaperones </Typography> 
                            <Paper variant="outlined" sx={{ mt: 1, p: 2 }}> 
                                <Grid container spacing={2}> 
                                    <Grid item xs={3}> 
                                        <Typography variant="body1" color="textSecondary"> Name </Typography> 
                                        <Typography variant="body2">Bob Ross</Typography> 
                                        <Typography variant="body2">Leslie Knope</Typography> 
                                        <Typography variant="body2">Michael Scott</Typography> 
                                        <Typography variant="body2">Rachel Green</Typography> 
                                        <Box display="flex" alignItems="center" mt={1}> 
                                            <Add fontSize="small" /> 
                                            <Typography variant="body2" ml={1}> Add chaperones </Typography> 
                                        </Box> 
                                    </Grid> 
                                    <Grid item xs={3}> 
                                        <Typography variant="body1" color="textSecondary"> Child </Typography> 
                                        <Typography variant="body2">John Ross</Typography> 
                                        <Typography variant="body2">Olivia Knope</Typography> 
                                        <Typography variant="body2">Sarah Scott</Typography> 
                                        <Typography variant="body2">Ted Green</Typography> 
                                    </Grid> 
                                    <Grid item xs={3}> 
                                        <Typography variant="body1" color="textSecondary"> Phone </Typography> 
                                        <Typography variant="body2">(404) 565 - 4533</Typography>
                                        <Typography variant="body2">(404) 565 - 4533</Typography> 
                                        <Typography variant="body2">(404) 565 - 4533</Typography> 
                                        <Typography variant="body2">(404) 565 - 4533</Typography> 
                                    </Grid> 
                                    <Grid item xs={3}> 
                                        <Typography variant="body1" color="textSecondary"> Email </Typography> 
                                        <Link href="mailto:bross@gmail.com" variant="body2"> bross@gmail.com </Link>
                                        <Link href="mailto:lknope@gmail.com" variant="body2"> lknope@gmail.com </Link> 
                                        <Link href="mailto:mscott@gmail.com" variant="body2"> mscott@gmail.com </Link> 
                                        <Link href="mailto:rgreen@gmail.com" variant="body2"> rgreen@gmail.com </Link>
                                    </Grid> 
                                </Grid> 
                            </Paper> 
                        </Box> 
                        <Box display="flex" justifyContent="center" mt={4}> 
                            <Button variant="contained" color="primary"> Next </Button> 
                        </Box> 
                    </Container> 
                </Box> 
            </Box> 
        </Box> 
    ); 
}; 

export default AdultRoster;