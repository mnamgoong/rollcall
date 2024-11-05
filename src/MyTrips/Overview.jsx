import { 
    AccessTime as AccessTimeIcon, 
    Add as AddIcon, 
    CalendarToday as CalendarTodayIcon, 
    Dashboard as DashboardIcon, 
    HelpOutline as HelpOutlineIcon, 
    Logout as LogoutIcon, 
    Notifications as NotificationsIcon, 
    Person as PersonIcon, 
    TripOrigin as TripOriginIcon, 
} from "@mui/icons-material"; 
import { 
    Avatar, 
    Box, 
    Button, 
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

export const Overview = () => {
    return ( 
        <Box display="flex" justifyContent="center" width="100%"> 
            <Box display="flex" width="1728px" height="1117px"> 
                <Box width="290px" height="1117px" bgcolor="white"> 
                    <Box display="flex" flexDirection="column" alignItems="center" p={2}> 
                        <Box display="flex" alignItems="center" mb={4}> 
                            <Avatar src="/path/to/image1.png" alt="Logo" sx={{ width: 50, height: 50 }} /> 
                            <Typography variant="h4" fontWeight="bold" ml={2}> RollCall </Typography> 
                        </Box> 
                        <List> 
                            <ListItem button> <ListItemIcon> <DashboardIcon /> </ListItemIcon> <ListItemText primary="Dashboard" /> </ListItem> 
                            <ListItem button> <ListItemIcon> <AddIcon /> </ListItemIcon> <ListItemText primary="Create a Trip" /> </ListItem> 
                            <ListItem button selected> <ListItemIcon> <TripOriginIcon /> </ListItemIcon> <ListItemText primary="My Trips" /> </ListItem> 
                            <ListItem button> <ListItemIcon> <HelpOutlineIcon /> </ListItemIcon> <ListItemText primary="Help" /> </ListItem> 
                        </List> 
                        <Box mt="auto" mb={2}> 
                            <Button 
                                variant="contained" 
                                color="error" 
                                startIcon={<LogoutIcon />} 
                                sx={{ 
                                    bgcolor: "#ffefef", 
                                    color: "#f83333" 
                                }} > Log Out 
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box flexGrow={1} height="1117px"> 
                    <Box bgcolor="#1f4571" height="89px" display="flex" alignItems="center" px={4} > 
                        <Typography variant="h4" color="white" flexGrow={1}> Hi, Mr. Peabody! </Typography> 
                        <IconButton color="inherit"> <NotificationsIcon /> </IconButton> 
                        <Avatar sx={{ bgcolor: "#4a73a1", ml: 2 }}> <PersonIcon /> </Avatar> 
                    </Box> 
                    <Box p={4} overflow="auto" height="calc(100% - 89px)"> 
                        <Typography variant="h5" mb={2}> My Trips </Typography> 
                        <Divider /> 
                        <Grid container spacing={4} mt={2}> 
                            <Grid item xs={4}> 
                                <Paper elevation={3} sx={{ p: 2, bgcolor: "#ffecec" }}> 
                                    <Typography variant="h6" fontWeight="bold"> Wildlife Reserve </Typography> 
                                    <Box display="flex" alignItems="center" mt={2}> 
                                        <AccessTimeIcon /> 
                                        <Typography variant="body2" ml={1}> 12:40 PM </Typography> 
                                        <CalendarTodayIcon sx={{ ml: 2 }} /> 
                                        <Typography variant="body2" ml={1}> 01 Jan 2023 </Typography> 
                                    </Box> 
                                    <Box mt={2} p={1} bgcolor="#ffdddd" borderRadius={1}> 
                                        <Typography variant="body2" color="#f85151"> <strong>Status:</strong> 1 Day Away </Typography> 
                                    </Box> 
                                    <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#141414" }} > View Details </Button> 
                                </Paper> 
                            </Grid> 
                            <Grid item xs={4}> 
                                <Paper elevation={3} sx={{ p: 2, bgcolor: "#ecffee" }}> 
                                    <Typography variant="h6" fontWeight="bold"> Georgia Tech Campus Tour </Typography> 
                                    <Box display="flex" alignItems="center" mt={2}> 
                                        <AccessTimeIcon /> 
                                        <Typography variant="body2" ml={1}> 1:30 PM </Typography> 
                                        <CalendarTodayIcon sx={{ ml: 2 }} /> 
                                        <Typography variant="body2" ml={1}> 07 Jan 2023 </Typography> 
                                    </Box> 
                                    <Box mt={2} p={1} bgcolor="#cff9da" borderRadius={1}> 
                                        <Typography variant="body2" color="#60aa75"> <strong>Status:</strong> Next Week </Typography> 
                                    </Box> 
                                    <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#141414" }} > View Details </Button> 
                                </Paper> </Grid> <Grid item xs={4}> 
                                <Paper elevation={3} sx={{ p: 2, bgcolor: "#fff8d3" }}> 
                                    <Typography variant="h6" fontWeight="bold"> 3-Day Trip to NYC </Typography> 
                                    <Box display="flex" alignItems="center" mt={2}> 
                                        <AccessTimeIcon /> 
                                        <Typography variant="body2" ml={1}> 7:10 AM </Typography> 
                                        <CalendarTodayIcon sx={{ ml: 2 }} /> 
                                        <Typography variant="body2" ml={1}> 21 March 2023 </Typography> 
                                    </Box> 
                                    <Box mt={2} p={1} bgcolor="#f8e67e" borderRadius={1}> 
                                        <Typography variant="body2" color="#bba215"> <strong>Status:</strong> Waiting for Approval </Typography> 
                                    </Box> 
                                    <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#141414" }} > View Details </Button> 
                                </Paper> 
                            </Grid> 
                        </Grid> 
                    </Box>
                </Box> 
            </Box>
        </Box>
    ); 
}; 

export default Overview;