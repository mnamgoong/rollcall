import { 
    Create, 
    Dashboard, 
    HelpOutline, 
    Logout, 
    Notifications, 
    TripOrigin, 
} from "@mui/icons-material"; 
import { 
    Avatar, 
    Box, 
    Button, 
    Divider, 
    Grid, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Tab, 
    Tabs, 
    TextField, 
    Typography, 
} from "@mui/material"; 
import React from "react"; 

export default function BasicInformation() { 
    return ( 
        <Box display="flex" justifyContent="center" width="100%"> 
            <Box width="1728px" height="1117px" position="relative" bgcolor="white"> 
                <Box width="290px" height="1117px" position="absolute" top={0} left={0} bgcolor="white" > 
                    <Box width="258px" height="55px" position="absolute" top="1047px" left="17px" > 
                        <Button 
                            variant="contained" 
                            color="error" 
                            startIcon={<Logout />} 
                            sx={{ 
                                width: "100%", 
                                height: "100%", 
                                borderRadius: "9px", 
                                backgroundColor: "#ffefef", 
                                color: "#f83333", 
                                fontFamily: "Inter-Medium, Helvetica", 
                                fontWeight: "medium", 
                                fontSize: "16px", 
                            }} > Log Out 
                        </Button> 
                    </Box> 
                    <Box width="228px" height="55px" position="absolute" top="31px" left="42px" display="flex" alignItems="center" > 
                        <Avatar src="https://via.placeholder.com/50" alt="Logo" sx={{ width: 50, height: 50 }} /> 
                        <Typography variant="h4" fontWeight="bold" fontFamily="Teachers-Bold, Helvetica" ml={2} > RollCall </Typography>
                    </Box>
                    <List> 
                        <ListItem button> 
                            <ListItemIcon> <Dashboard /> </ListItemIcon> <ListItemText primary="Dashboard" /> 
                        </ListItem> 
                        <ListItem button> 
                            <ListItemIcon> <Create /> </ListItemIcon> <ListItemText primary="Create a Trip" /> 
                        </ListItem> 
                        <ListItem button selected> 
                            <ListItemIcon> <TripOrigin /> </ListItemIcon> <ListItemText primary="My Trips" />
                        </ListItem> 
                        <ListItem button> 
                            <ListItemIcon> <HelpOutline /> </ListItemIcon> <ListItemText primary="Help" /> 
                        </ListItem> 
                    </List> 
                </Box> 
                <Box width="1438px" height="1117px" position="absolute" top={0} left="290px" > 
                    <Box width="1438px" height="89px" bgcolor="#1f4571" position="absolute" top={0} left={0} /> 
                    <Box height="39px" position="absolute" top="6px" left="35px" display="flex" alignItems="center" > 
                        <Typography variant="h4" fontWeight="bold" color="white" fontFamily="Inter-SemiBold, Helvetica" > Hi, Mr. Peabody! </Typography> 
                    </Box> 
                    <Box width="43px" height="43px" bgcolor="#4a73a1" borderRadius="50%" position="absolute" top="23px" left="1248px" /> 
                    <Notifications sx={{ 
                        position: "absolute", 
                        top: "8px", 
                        left: "1258px", 
                        color: "white", 
                    }} /> 
                    <Box width="7px" height="7px" bgcolor="white" borderRadius="50%" position="absolute" top="31px" left="1272px" /> 
                    <Box width="1438px" height="1028px" position="absolute" top="89px" left={0} overflow="hidden" overflowY="scroll" > 
                        <Box width="1438px" height="1330px" bgcolor="white" overflowY="scroll" position="relative" > 
                            <Typography variant="h5" fontWeight="bold" fontFamily="Inter-SemiBold, Helvetica" color="#3c3c3c" position="absolute" top="57px" left="55px" > My Trip #1579 </Typography> 
                            <Divider sx={{ position: "absolute", top: "181px", left: 0, width: "1438px", }} /> 
                            <Tabs value={0} indicatorColor="primary" textColor="primary" sx={{ position: "absolute", top: "137px", left: "55px", }} > 
                                <Tab label="Basic Information" /> 
                                <Tab label="Transportation" /> 
                                <Tab label="Student Roster" /> 
                                <Tab label="Adult Roster" /> 
                                <Tab label="Funding" /> 
                                <Tab label="Documents" />
                            </Tabs> 
                            <Grid container spacing={2} sx={{ position: "absolute", top: "241px", left: "55px" }} > 
                                <Grid item xs={12}> 
                                    <TextField fullWidth label="What is the name of your trip?" defaultValue="Georgia Tech Campus Tour" variant="outlined" InputProps={{ readOnly: true, }} /> 
                                </Grid> 
                                <Grid item xs={12}> 
                                    <TextField fullWidth label="What is the main destination?" defaultValue="Klaus Advanced Computing Building" variant="outlined" InputProps={{ readOnly: true, }} /> 
                                </Grid> 
                                <Grid item xs={12}> 
                                    <TextField fullWidth label="What are the tentative date(s) for the trip?" defaultValue="1/7/23" variant="outlined" InputProps={{ readOnly: true, }} /> 
                                </Grid> 
                                <Grid item xs={12}> 
                                    <TextField fullWidth label="What subject area does it cover?" defaultValue="AP Computer Science" variant="outlined" InputProps={{ readOnly: true, }} /> 
                                </Grid> 
                                <Grid item xs={12}> 
                                    <TextField fullWidth label="Describe the activity or event." defaultValue="Students will participate in a Georgia Tech Campus Tour, focusing on the Klaus Advanced Computing building." variant="outlined" multiline rows={4} InputProps={{ readOnly: true, }} /> 
                                </Grid> 
                                <Grid item xs={12}> 
                                    <TextField fullWidth label="How does the trip relate to the curriculum?" defaultValue="Students will gain insights into cutting-edge technology and innovative practices in the field of computer science." variant="outlined" multiline rows={4} InputProps={{ readOnly: true, }} /> 
                                </Grid> 
                                <Grid item xs={12}> 
                                    <TextField fullWidth label="What arrangements have been made for those students not attending the trip?" defaultValue="Students not attending the trip can participate in Mr. Gate’s Computer Fundamentals class during regular class hours." variant="outlined" multiline rows={4} InputProps={{ readOnly: true, }} /> 
                                </Grid> 
                                <Grid item xs={12}> 
                                    <TextField fullWidth label="What is the eligibility criteria to receive an invitation to participate in the trip?" defaultValue="Students must be taking AP Computer Science. Ideally, seniors interested in applying to Georgia Tech would join." variant="outlined" multiline rows={4} InputProps={{ readOnly: true, }} /> 
                                </Grid> 
                            </Grid> 
                            <Box width="118px" height="54px" position="absolute" top="1213px" left="661px" > 
                                <Button variant="contained" color="primary" sx={{ width: "100%", height: "100%", borderRadius: "5px", backgroundColor: "#4a73a1", color: "white", fontFamily: "Inter-SemiBold, Helvetica", fontWeight: "bold", fontSize: "21px", }} > Next </Button> 
                            </Box> 
                        </Box> 
                    </Box> 
                </Box> 
            </Box> 
        </Box> 
    ); 
}