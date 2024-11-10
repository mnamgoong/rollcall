import React from "react"; 
import { 
    AccessTime as AccessTimeIcon, 
    CalendarMonth as CalendarMonthIcon
} from "@mui/icons-material"; 
import { 
    Box, 
    Button, 
    Container,
    Divider, 
    Grid, 
    Paper, 
    Typography, 
} from "@mui/material"; 

const Overview = () => {
    return ( 
        <Box display="flex" flexGrow={1} justifyContent="center" width="100%"> 
            <Container>
                <Typography variant="h5" fontWeight={"bold"} mt={4} mb={2}> My Trips </Typography> 
                <Divider /> 

                {/* need to make dynamic once backend is connected */}
                <Grid container spacing={4} mt={2}> 
                    <Grid item xs={12} sm={6} md={4}> 
                        <Paper elevation={3} sx={{ p: 2, bgcolor: "#ffecec" }}> 
                            <Typography variant="h6" fontWeight="bold"> Wildlife Reserve </Typography> 
                            <Box display="flex" alignItems="center" mt={2}> 
                                <AccessTimeIcon /> 
                                <Typography variant="body2" ml={1}> 12:40 PM </Typography> 
                                <CalendarMonthIcon sx={{ ml: 2 }} /> 
                                <Typography variant="body2" ml={1}> 01 Jan 2023 </Typography> 
                            </Box> 
                            <Box mt={2} p={1} bgcolor="#ffdddd" borderRadius={1}> 
                                <Typography variant="body2" color="#f85151"> <strong>Status:</strong> 1 Day Away </Typography> 
                            </Box> 
                            <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#141414" }} > View Details </Button> 
                        </Paper> 
                    </Grid> 
                    
                    <Grid item xs={12} sm={6} md={4}> 
                        <Paper elevation={3} sx={{ p: 2, bgcolor: "#ecffee" }}> 
                            <Typography variant="h6" fontWeight="bold"> Georgia Tech Campus Tour </Typography> 
                            <Box display="flex" alignItems="center" mt={2}> 
                                <AccessTimeIcon /> 
                                <Typography variant="body2" ml={1}> 1:30 PM </Typography> 
                                <CalendarMonthIcon sx={{ ml: 2 }} /> 
                                <Typography variant="body2" ml={1}> 07 Jan 2023 </Typography> 
                            </Box> 
                            <Box mt={2} p={1} bgcolor="#cff9da" borderRadius={1}> 
                                <Typography variant="body2" color="#60aa75"> <strong>Status:</strong> Next Week </Typography> 
                            </Box> 
                            <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#141414" }} > View Details </Button> 
                        </Paper> 
                    </Grid> 

                    <Grid item xs={12} sm={6} md={4}> 
                        <Paper elevation={3} sx={{ p: 2, bgcolor: "#fff8d3" }}> 
                            <Typography variant="h6" fontWeight="bold"> 3-Day Trip to NYC </Typography> 
                            <Box display="flex" alignItems="center" mt={2}> 
                                <AccessTimeIcon /> 
                                <Typography variant="body2" ml={1}> 7:10 AM </Typography> 
                                <CalendarMonthIcon sx={{ ml: 2 }} /> 
                                <Typography variant="body2" ml={1}> 21 March 2023 </Typography> 
                            </Box> 
                            <Box mt={2} p={1} bgcolor="#f8e67e" borderRadius={1}> 
                                <Typography variant="body2" color="#bba215"> <strong>Status:</strong> Waiting for Approval </Typography> 
                            </Box> 
                            <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#141414" }} > View Details </Button> 
                        </Paper> 
                    </Grid> 
                </Grid> 
            </Container>
        </Box>
    ); 
}; 

export default Overview;
