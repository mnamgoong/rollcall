import { 
    CheckBox as CheckBoxIcon, 
    Create as CreateIcon, 
    Dashboard as DashboardIcon, 
    Event as EventIcon, 
    HelpOutline as HelpOutlineIcon, 
    Logout as LogoutIcon, 
    Notifications as NotificationsIcon, 
    Person as PersonIcon, 
} from "@mui/icons-material"; 
import { 
    Avatar, 
    Box, 
    Button, 
    Divider, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    MenuItem, 
    Paper, 
    Select, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography, 
} from "@mui/material"; 
import React from "react"; 

export const StudentRoster = () => { 
    return ( 
        <Box display="flex" justifyContent="center" width="100%" bgcolor="white"> 
            <Box width="1728px" height="1117px" position="relative" bgcolor="white"> 
                <Box width="290px" height="1117px" position="absolute" top={0} left={0} bgcolor="white" > 
                    <Box width="258px" height="55px" position="absolute" top="1047px" left="17px" > 
                        <Button 
                            variant="contained" 
                            color="error" 
                            startIcon={<LogoutIcon />} 
                            sx={{ 
                                width: "100%", 
                                height: "100%", 
                                borderRadius: "9px", 
                                backgroundColor: "#ffefef", 
                                color: "#f83333", 
                                fontFamily: "Inter-Medium, Helvetica", 
                                fontWeight: "medium", 
                                fontSize: "16px", 
                            }} > 
                            Log Out 
                        </Button> 
                    </Box> 
                    <Box width="228px" height="55px" position="absolute" top="31px" left="42px" display="flex" alignItems="center" > 
                        <Avatar src="https://via.placeholder.com/50" alt="Logo" sx={{ width: 50, height: 50 }} /> 
                        <Typography variant="h4" fontWeight="bold" fontFamily="Teachers-Bold, Helvetica" ml={2} > RollCall </Typography> 
                    </Box> 
                    <List> 
                        <ListItem button> <ListItemIcon> <DashboardIcon /> </ListItemIcon> <ListItemText primary="Dashboard" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <CreateIcon /> </ListItemIcon> <ListItemText primary="Create a Trip" /> </ListItem> 
                        <ListItem button selected> <ListItemIcon> <EventIcon /> </ListItemIcon> <ListItemText primary="My Trips" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <HelpOutlineIcon /> </ListItemIcon> <ListItemText primary="Help" /> </ListItem> 
                    </List> 
                </Box> 
                <Box width="1438px" height="1117px" position="absolute" top={0} left="290px" > 
                    <Box width="1438px" height="89px" position="absolute" top={0} left={0} bgcolor="#1f4571" /> 
                    <Typography variant="h4" color="white" position="absolute" top="6px" left="35px" fontWeight="600" > Hi, Mr. Peabody! </Typography> 
                    <Box width="43px" height="43px" position="absolute" top="23px" left="1248px" bgcolor="#4a73a1" borderRadius="50%" /> 
                    <NotificationsIcon sx={{ position: "absolute", top: "8px", left: "1258px", color: "white", }} /> 
                    <Box width="7px" height="7px" position="absolute" top="31px" left="1272px" bgcolor="white" borderRadius="50%" /> 
                    <Avatar sx={{ position: "absolute", top: "23px", left: "1333px", width: "43px", height: "43px", }} > <PersonIcon /> </Avatar> 
                    <Box width="1438px" height="1028px" position="absolute" top="89px" left={0} overflow="hidden" overflowY="scroll" > 
                        <Box width="1438px" height="1607px" bgcolor="white" position="relative" > 
                            <Divider sx={{ position: "absolute", top: "181px", left: 0 }} /> 
                            <Typography variant="h6" color="#6f6f6f" position="absolute" top="137px" left="55px" > Basic Information </Typography> 
                            <Typography variant="h6" color="#6f6f6f" position="absolute" top="137px" left="282px" > Transportation </Typography> 
                            <Typography variant="h6" color="#4a73a1" fontWeight="600" position="absolute" top="137px" left="479px" > Student Roster </Typography> 
                            <Typography variant="h6" color="#6f6f6f" position="absolute" top="137px" left="679px" > Adult Roster </Typography> 
                            <Typography variant="h6" color="#6f6f6f" position="absolute" top="137px" left="854px" > Funding </Typography> 
                            <Typography variant="h6" color="#6f6f6f" position="absolute" top="137px" left="988px" > Documents </Typography> 
                            <Typography variant="body1" fontWeight="600" color="#424242" position="absolute" top="213px" left="53px" > Which class are you taking on the trip? </Typography> 
                            <Box width="1330px" height="42px" position="absolute" top="241px" left="55px" bgcolor="white" >
                                <Select fullWidth variant="outlined" defaultValue="Period 3" sx={{ bgcolor: "#efefef", borderRadius: "5px", borderColor: "#6f6f6f", }} > 
                                    <MenuItem value="Period 3">Period 3</MenuItem> 
                                </Select> 
                            </Box> 
                            <Typography variant="h5" fontWeight="600" color="#424242" position="absolute" top="315px" left="55px" > Participation </Typography> 
                            <TableContainer component={Paper} sx={{ width: "1331px", height: "1082px", position: "absolute", top: "358px", left: "55px", borderRadius: "5px", borderColor: "#6f6f6f", }} > 
                                <Table> 
                                    <TableHead> 
                                        <TableRow> 
                                            <TableCell>Name</TableCell> 
                                            <TableCell>Permission Slip Received?</TableCell> 
                                            <TableCell>Payment Received?</TableCell> 
                                            <TableCell>Health Conditions?</TableCell> 
                                        </TableRow> 
                                    </TableHead> 
                                    <TableBody> 
                                        {[ 
                                            { name: "Alice Brown", health: "N/A" }, 
                                            { name: "Benjamin Carter", health: "Asthma" }, 
                                            { name: "Charlotte Davis", health: "N/A" }, 
                                            { name: "Dave Evans", health: "N/A" }, 
                                            { name: "Emma Foster", health: "N/A" }, 
                                            { name: "George Hall", health: "N/A" }, 
                                            { name: "Hannah Johnson", health: "N/A" }, 
                                            { name: "Isabella Kim", health: "Diabetes" }, 
                                            { name: "John Ross", health: "N/A" }, 
                                            { name: "Lily Martinez", health: "N/A" }, 
                                            { name: "Mia Nelson", health: "N/A" }, 
                                            { name: "Noah Owens", health: "N/A" }, 
                                            { name: "Olivia Knope", health: "Peanut Allergy" }, 
                                            { name: "Peter Robinson", health: "N/A" }, 
                                            { name: "Quinn Smith", health: "N/A" }, 
                                            { name: "Rachel Taylor", health: "Peanut Allergy" },
                                            { name: "Sarah Scott", health: "N/A" }, 
                                            { name: "Ted Green", health: "N/A" }, 
                                            { name: "Victor White", health: "N/A" }, 
                                            { name: "Zoe Young", health: "N/A" }, 
                                        ].map((student, index) => ( 
                                            <TableRow key={index}> 
                                                <TableCell>{student.name}</TableCell> 
                                                <TableCell> 
                                                    <IconButton> 
                                                        <CheckBoxIcon /> 
                                                    </IconButton> 
                                                </TableCell> 
                                                <TableCell> 
                                                    <IconButton> 
                                                        <CheckBoxIcon /> 
                                                    </IconButton> 
                                                </TableCell> 
                                                <TableCell>{student.health}</TableCell> 
                                            </TableRow> 
                                        ))} 
                                    </TableBody> 
                                </Table> 
                            </TableContainer> 
                            <Button 
                                variant="contained" 
                                color="primary" 
                                sx={{ 
                                    position: "absolute", 
                                    top: "1495px", 
                                    left: "661px", 
                                    width: "118px", 
                                    height: "54px", 
                                    borderRadius: "5px", 
                                }} > 
                                Next 
                            </Button> 
                            <Box width="357px" height="33px" position="absolute" top="14px" left="55px" > 
                                <Typography variant="h5" fontWeight="600" color="#3c3c3c" position="absolute" top="0.5px" left={0} > My Trip #1579 </Typography>
                                <Box width="158px" height="33px" position="absolute" top={0} left="195px" bgcolor="#cff9da" borderRadius="5px" display="flex" alignItems="center" justifyContent="center" > 
                                    <Typography variant="body1" fontWeight="600" color="#60aa75" position="absolute" top="7px" left="9px" > Status: Next Week </Typography> 
                                </Box> 
                            </Box> 
                        </Box> 
                    </Box> 
                </Box> 
            </Box> 
        </Box> 
    ); 
};

export default StudentRoster;