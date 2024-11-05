import { 
    AccountCircle as AccountCircleIcon, 
    Create as CreateIcon, 
    Dashboard as DashboardIcon, 
    HelpOutline as HelpOutlineIcon, 
    Logout as LogoutIcon, 
    Notifications as NotificationsIcon, 
    TripOrigin as TripOriginIcon, 
} from "@mui/icons-material"; 
import { 
    AppBar, 
    Avatar, 
    Badge, 
    Box, 
    Button, 
    Divider, 
    Grid, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    MenuItem, 
    TextField, 
    Toolbar, 
    Typography, 
} from "@mui/material"; 
import React from "react"; 

export const Funding = () => { 
    return ( 
        <Box display="flex" justifyContent="center" width="100%"> 
            <Box width="1728px" height="1117px" position="relative"> 
                <Box width="290px" height="1117px" position="absolute" top={0} left={0} bgcolor="white" > 
                    <Box width="258px" height="55px" position="absolute" top="1047px" left="17px" > 
                        <Button variant="contained" color="error" startIcon={<LogoutIcon />} sx={{ width: "100%", height: "100%", borderRadius: "9px" }} > Log Out </Button> 
                    </Box> 
                    <Box width="228px" height="55px" position="absolute" top="31px" left="42px" > 
                        <Typography variant="h4" fontWeight="bold"> RollCall </Typography> 
                        <Avatar src="image1.png" sx={{ width: 50, height: 50, position: "absolute", top: 0.5, left: 0, }} /> 
                    </Box> 
                    <List> 
                        <ListItem button> <ListItemIcon> <DashboardIcon /> </ListItemIcon> <ListItemText primary="Dashboard" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <CreateIcon /> </ListItemIcon> <ListItemText primary="Create a Trip" /> </ListItem> 
                        <ListItem button selected> <ListItemIcon> <TripOriginIcon /> </ListItemIcon> <ListItemText primary="My Trips" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <HelpOutlineIcon /> </ListItemIcon> <ListItemText primary="Help" /> </ListItem> 
                    </List> 
                </Box> 
                <Box width="1438px" height="1117px" position="absolute" top={0} left="290px" > 
                    <AppBar position="static" sx={{ bgcolor: "#1f4571" }}> 
                        <Toolbar> 
                            <Typography variant="h4" sx={{ flexGrow: 1 }}> Hi, Mr. Peabody! </Typography> 
                            <IconButton color="inherit"> <Badge badgeContent={1} color="error"> <NotificationsIcon /> </Badge> </IconButton> 
                            <Avatar sx={{ bgcolor: "#4a73a1", marginLeft: 2 }}> <AccountCircleIcon /> </Avatar> 
                        </Toolbar> 
                    </AppBar> 
                    <Box padding={3}> 
                        <Typography variant="h5" fontWeight="bold"> My Trip #1579 </Typography> 
                        <Box display="inline-block" bgcolor="#cff9da" padding={1} borderRadius={1} ml={2} > 
                            <Typography variant="body1" color="#60aa75"> Status: Next Week </Typography> 
                        </Box> 
                        <Divider sx={{ my: 2 }} /> 
                        <Grid container spacing={2}> 
                            <Grid item> <Typography variant="h6" color="textSecondary"> Basic Information </Typography> </Grid> 
                            <Grid item> <Typography variant="h6" color="textSecondary"> Transportation </Typography> </Grid> 
                            <Grid item> <Typography variant="h6" color="textSecondary"> Student Roster </Typography> </Grid> 
                            <Grid item> <Typography variant="h6" color="textSecondary"> Adult Roster </Typography> </Grid> 
                            <Grid item> <Typography variant="h6" color="primary"> Funding </Typography> </Grid> 
                            <Grid item> <Typography variant="h6" color="textSecondary"> Documents </Typography> </Grid> 
                        </Grid> 
                        <Box mt={4}> 
                            <Typography variant="body1" fontWeight="bold"> What is the source of funding for the trip? </Typography> 
                            <TextField select fullWidth variant="outlined" defaultValue="Class Budget" sx={{ mt: 1, bgcolor: "#efefef" }} > 
                                <MenuItem value="Class Budget">Class Budget</MenuItem> 
                            </TextField>
                        </Box> 
                        <Grid container spacing={2} mt={4}> 
                            <Grid item xs={6}> 
                                <Typography variant="body1" fontWeight="bold"> What is the estimated cost per student? </Typography> 
                                <TextField fullWidth variant="outlined" defaultValue="20" sx={{ mt: 1, bgcolor: "#efefef" }} /> 
                            </Grid> 
                            <Grid item xs={6}> 
                                <Typography variant="body1" fontWeight="bold"> What is the total estimated cost? </Typography> 
                                <TextField fullWidth variant="outlined" defaultValue="400" sx={{ mt: 1, bgcolor: "#efefef" }} /> 
                            </Grid> 
                        </Grid> 
                        <Box display="flex" justifyContent="center" mt={4}> 
                            <Button variant="contained" color="primary"> Next </Button> 
                        </Box> 
                    </Box> 
                </Box> 
            </Box> 
        </Box> 
    ); 
};

export default Funding;