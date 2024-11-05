import { 
    AddLocation, 
    Dashboard, 
    Description, 
    Folder, 
    HelpOutline, 
    Logout, 
    Notifications, 
    Person, 
    UploadFile, 
} from "@mui/icons-material"; 
import { 
    Avatar, 
    Box, 
    Button, 
    Divider, 
    IconButton, 
    Link, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Paper, 
    Typography, 
} from "@mui/material"; 
import React from "react"; 

export const Documents = () => { 
    return ( 
        <Box display="flex" justifyContent="center" width="100%" bgcolor="white"> 
            <Box width="1728px" height="1117px" position="relative" bgcolor="white"> 
                <Box width="290px" height="1117px" position="absolute" top={0} left={0} bgcolor="white" > 
                    <Box width="258px" height="55px" position="absolute" top="1047px" left="17px" > 
                        <Button variant="contained" color="error" startIcon={<Logout />} sx={{ width: "100%", height: "100%", borderRadius: "9px", bgcolor: "#ffefef", color: "#f83333", fontFamily: "Inter-Medium, Helvetica", fontWeight: "medium", }} > Log Out </Button> 
                    </Box> 
                    <Box width="228px" height="55px" position="absolute" top="31px" left="42px" display="flex" alignItems="center" > 
                        <Avatar src="https://via.placeholder.com/50" alt="Logo" sx={{ width: 50, height: 50 }} /> 
                        <Typography variant="h4" fontWeight="bold" fontFamily="Teachers-Bold, Helvetica" ml={2} > RollCall </Typography> 
                    </Box> 
                    <List> 
                        <ListItem button> <ListItemIcon> <Dashboard /> </ListItemIcon> <ListItemText primary="Dashboard" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <AddLocation /> </ListItemIcon> <ListItemText primary="Create a Trip" /> </ListItem> 
                        <ListItem button selected> <ListItemIcon> <Folder /> </ListItemIcon> <ListItemText primary="My Trips" /> </ListItem> 
                        <ListItem button> <ListItemIcon> <HelpOutline /> </ListItemIcon> <ListItemText primary="Help" /> </ListItem> 
                    </List> 
                </Box> 
                <Box width="1438px" height="1117px" position="absolute" top={0} left="290px" > 
                    <Box width="1438px" height="89px" bgcolor="#1f4571" /> 
                    <Box height="39px" position="absolute" top="6px" left="35px" color="white" fontFamily="Inter-SemiBold, Helvetica" fontWeight="bold" fontSize="32px" > Hi, Mr. Peabody! </Box> 
                    <IconButton sx={{ position: "absolute", top: "23px", left: "1248px", bgcolor: "#4a73a1", borderRadius: "50%", width: "43px", height: "43px", }} > 
                        <Notifications sx={{ color: "white" }} /> 
                    </IconButton> 
                    <Avatar sx={{ position: "absolute", top: "23px", left: "1333px", width: "43px", height: "43px", }} > <Person /> </Avatar> 
                    <Box width="1438px" height="1028px" position="absolute" top="89px" left={0} bgcolor="white" >
                        <Divider /> 
                        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1} borderBottom="1px solid #6f6f6f" > 
                            <Typography variant="h6" color="#6f6f6f"> Basic Information </Typography> 
                            <Typography variant="h6" color="#6f6f6f"> Transportation </Typography> 
                            <Typography variant="h6" color="#6f6f6f"> Student Roster </Typography> 
                            <Typography variant="h6" color="#6f6f6f"> Adult Roster </Typography> 
                            <Typography variant="h6" color="#6f6f6f"> Funding </Typography> 
                            <Typography variant="h6" color="#4a73a1" fontWeight="bold"> Documents </Typography> 
                        </Box> 
                        <Box width="1331px" height="364px" mx="auto" mt={4} bgcolor="white" border="1px dashed #6f6f6f" borderRadius="5px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" > 
                            <Description sx={{ fontSize: 75, color: "#6f6f6f" }} /> 
                            <Typography variant="h6" color="#6f6f6f" mt={2}> Drag your files here or </Typography> 
                            <Box display="flex" mt={2}> 
                                <Button variant="contained" color="primary" startIcon={<UploadFile />} sx={{ mr: 2 }} > UPLOAD FROM FILES </Button> 
                                <Button variant="contained" sx={{ bgcolor: "#4a73a1", color: "white" }} > DocuSign </Button> 
                            </Box> 
                        </Box> 
                        <Typography variant="h5" fontWeight="bold" color="#424242" mt={4} ml={2} > Documents </Typography> 
                        <Paper elevation={1} sx={{ width: "1331px", height: "114px", mx: "auto", mt: 4, borderRadius: "5px", border: "1px solid #6f6f6f", }} > 
                            <Box height="52px" bgcolor="#efefef" borderRadius="5px 5px 0 0" borderBottom="1px solid #6f6f6f" display="flex" alignItems="center" px={2} > 
                                <Typography variant="h6" color="#6f6f6f"> Name </Typography> 
                                <Typography variant="h6" color="#6f6f6f" ml={8}> Visibility </Typography> 
                                <Typography variant="h6" color="#6f6f6f" ml={8}> Link </Typography> 
                            </Box> 
                            <Box display="flex" alignItems="center" px={2} py={1}> 
                                <Typography variant="body1" color="#424242"> Permission Slip </Typography>
                                <Typography variant="body1" color="#424242" ml={8}> Everyone </Typography> 
                                <Link href="#" underline="hover" color="#4a73a1" ml={8}> DocuSign Form </Link> 
                            </Box>
                        </Paper> 
                    </Box> 
                    <Box display="flex" alignItems="center" mt={2} ml={2} height="33px"> 
                        <Typography variant="h5" fontWeight="bold" color="#3c3c3c"> My Trip #1579 </Typography> 
                        <Box ml={2} px={1} bgcolor="#cff9da" borderRadius="5px" display="flex" alignItems="center" > 
                            <Typography variant="body1" color="#60aa75"> <strong>Status:</strong> Next Week </Typography> 
                        </Box> 
                    </Box> 
                </Box> 
            </Box> 
        </Box> 
    ); 
};

export default Documents;