import { 
    AccountCircle as AccountCircleIcon, 
    ExitToApp as ExitToAppIcon, 
    FileUpload as FileUploadIcon, 
    HelpOutline as HelpOutlineIcon, 
    Home as HomeIcon, 
    Notifications as NotificationsIcon, 
    Person as PersonIcon, } 
from "@mui/icons-material"; 
import { 
    AppBar, 
    Avatar, 
    Box, 
    Button,
    Container, 
    Divider, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Paper, 
    Tab, 
    Tabs, 
    Toolbar, 
    Typography, } 
from "@mui/material"; 
import React from "react"; 

export const Documents = () => { 
    return ( 
        <Box display="flex" justifyContent="center" width="100%"> 
            <Box width="1728px" height="1117px" position="relative" bgcolor="white"> 
                <Box width="290px" height="1117px" position="absolute" top={0} left={0} bgcolor="white" > 
                    <Box width="258px" height="55px" position="absolute" top="1047px" left="17px" > 
                        <Button 
                            variant="contained" 
                            color="error" 
                            startIcon={<ExitToAppIcon />} 
                            sx={{ width: "100%", 
                                height: "100%", 
                                borderRadius: "9px", 
                                bgcolor: "#ffefef", 
                                color: "#f83333", 
                                fontFamily: "Inter-Medium, Helvetica", 
                                fontWeight: "medium", 
                                fontSize: "16px", 
                            }} > Log Out </Button> 
                    </Box> 
                    <Box 
                        width="228px" 
                        height="55px" 
                        position="absolute" 
                        top="31px" 
                        left="42px" 
                        display="flex" 
                        alignItems="center" > 
                        <img src="https://via.placeholder.com/50" alt="Logo" style={{ width: "50px", height: "50px" }} /> 
                        <Typography variant="h4" fontWeight="bold" fontFamily="Teachers-Bold, Helvetica" ml={2} > RollCall </Typography>
                    </Box> 
                    <List component="nav" sx={{ mt: 4 }}> 
                        <ListItem button> <ListItemIcon> <HomeIcon /> </ListItemIcon> <ListItemText primary="Dashboard" /> </ListItem> 
                        <ListItem button selected> <ListItemIcon> <PersonIcon /> </ListItemIcon> <ListItemText primary="Create a Trip" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <PersonIcon /> </ListItemIcon> <ListItemText primary="My Trips" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <HelpOutlineIcon /> </ListItemIcon> <ListItemText primary="Help" /> </ListItem> 
                    </List> 
                </Box> 
                <Box width="1438px" height="1117px" position="absolute" top={0} left="290px" > 
                    <AppBar position="static" sx={{ bgcolor: "#1f4571" }}> 
                        <Toolbar> 
                            <Typography variant="h6" sx={{ flexGrow: 1 }}> Hi, Mr. Peabody! </Typography> 
                            <IconButton color="inherit"> <NotificationsIcon /> </IconButton> 
                            <Avatar sx={{ bgcolor: "#4a73a1", ml: 2 }}> <AccountCircleIcon /> </Avatar> 
                        </Toolbar> 
                    </AppBar>
                    <Box width="1438px" height="1028px" position="absolute" top="89px" left={0} overflow="auto" bgcolor="white" > 
                        <Container> 
                            <Typography variant="h4" fontWeight="bold" mt={4}> Create a Trip </Typography>
                            <Divider sx={{ my: 2 }} /> 
                            <Tabs value={4} indicatorColor="primary" textColor="primary"> 
                                <Tab label="Basic Information" />
                                <Tab label="Transportation" />
                                <Tab label="Student Roster" />
                                <Tab label="Adult Roster" />
                                <Tab label="Funding" />
                                <Tab label="Documents" />
                            </Tabs>
                            <Paper variant="outlined" sx={{ mt: 4, p: 4, borderStyle: "dashed", borderColor: "#6f6f6f", }} > 
                                <Typography variant="h5" fontWeight="bold" mb={2}> Documents </Typography> 
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="364px" > 
                                    <FileUploadIcon sx={{ fontSize: 75, color: "#6f6f6f" }} /> 
                                    <Typography variant="body1" color="textSecondary" mt={2}> Drag your files here or </Typography> 
                                    <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{ mt: 2 }} > UPLOAD FROM FILES </Button> 
                                </Box> 
                            </Paper> 
                            <Button variant="contained" color="error" sx={{ mt: 4, alignSelf: "center" }} > Submit </Button> 
                        </Container> 
                    </Box> 
                </Box>
            </Box> 
        </Box> 
    ); 
};