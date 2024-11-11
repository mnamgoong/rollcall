import React, { useState, useEffect } from "react"; 
import { 
    CalendarMonth as CalendarMonthIcon,
    LocationOn as LocationOnIcon 
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
import TripDetails from "./TripDetails";

const getStatusColor = (status) => {
    switch (status) {
        case "PENDING":
            return { bgcolor: "#fff8d3", textColor: "#bba215" };
        case "APPROVED":
            return { bgcolor: "#ecffee", textColor: "#60aa75" };
        case "DRAFT":
            return { bgcolor: "#ffecec", textColor: "#f85151" };
        default:
            return { bgcolor: "#e0e0e0", textColor: "#000000" };
    }
};

const Overview = () => {
    const [selectedTripId, setSelectedTripId] = useState(null);
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await fetch(
                    `https://lbeaduxwcl.execute-api.us-east-1.amazonaws.com/default/getTripByID/trip/id?id=TRIP_1731296552869`
                );
                const data = await response.json();
                setTrips([data]);
            } catch (error) {
                console.error('Error fetching trip:', error);
                setTrips([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrip();
    }, []);

    const handleViewDetails = (tripId) => {
        setSelectedTripId(tripId);
    };

    const handleBackToOverview = () => {
        setSelectedTripId(null);
    };

    if (selectedTripId) {
        return <TripDetails tripId={selectedTripId} onBack={handleBackToOverview} />;
    }

    return (
        <Box display="flex" flexGrow={1} justifyContent="center" width="100%">
            <Container>
                <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>My Trips</Typography>
                <Divider />
                <Grid container spacing={4} mt={2}>
                    {trips.map((trip) => {
                        const { bgcolor, textColor } = getStatusColor(trip.status);

                        return (
                            <Grid item xs={12} sm={6} md={4} key={trip.id}>
                                <Paper elevation={3} sx={{ p: 2, bgcolor }}>
                                    <Typography variant="h6" fontWeight="bold">{trip.tripName}</Typography>
                                    <Box display="flex" alignItems="center" mt={2}>
                                        <LocationOnIcon />
                                        <Typography variant="body2" ml={1}>{trip.mainDestination}</Typography>
                                        <CalendarMonthIcon sx={{ ml: 2 }}/>
                                        <Typography variant="body2" ml={1}>{trip.tripDates}</Typography>
                                    </Box>
                                    <Box mt={2} p={1} bgcolor={bgcolor} borderRadius={1}>
                                        <Typography variant="body2" color={textColor}>
                                            <strong>Status:</strong> {trip.status}
                                        </Typography>
                                    </Box>
                                    <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#141414" }} onClick={() => handleViewDetails(trip.id)}>
                                        View Details
                                    </Button>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Box>
    );
};

export default Overview;
