import React, { useState, useEffect } from "react"; 
import { 
    CalendarMonth as CalendarMonthIcon,
    LocationOn as LocationOnIcon 
} from "@mui/icons-material"; 
import { 
    Box, 
    Button,
    CircularProgress,
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
            return { 
                bgcolor: "#fce990", 
                textColor: "#fbfbdd",
                pillColor: "#deaf1c" 
            };
        case "APPROVED":
            return { 
                bgcolor: "#9dc19d", 
                textColor: "#c9dac9",
                pillColor: "#2c7c34" 
            };
        case "DENIED":
            return { 
                bgcolor: "#e37b78", 
                textColor: "#f5bcB6",
                pillColor: "#d2302e" 
            };
        default:
            return { 
                bgcolor: "#bfbfbf", 
                textColor: "#dedede",
                pillColor: "#6f6f6f" 
            };
    }
};

const Overview = () => {
    const [selectedTripId, setSelectedTripId] = useState(null);
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch('https://olt95t35ea.execute-api.us-east-1.amazonaws.com/dev/gettrips');
                const data = await response.json();
                setTrips(data.data || []);
            } catch (error) {
                console.error('Error fetching trips:', error);
                setTrips([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrips();
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


    if (isLoading) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="80vh"
            >
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Box display="flex" flexGrow={1} justifyContent="center" width="100%">
            <Container>
                <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>My Trips</Typography>
                <Divider />
                <Grid container spacing={4} mt={2} mb={6}>
                    {trips.map((trip) => {
                        const { bgcolor, textColor, pillColor } = getStatusColor(trip.status);
                        return (
                            <Grid item xs={12} sm={6} md={4} key={trip.id}>
                                <Paper elevation={3} sx={{ p: 2, bgcolor }}>
                                    <Typography variant="h6" fontWeight="bold">{trip.tripName || "Untitled Trip"}</Typography>
                                    <Box display="flex" flexDirection="column" gap={1} mt={2}>
                                        <Box display="flex" alignItems="center">
                                            <LocationOnIcon />
                                            <Typography variant="body2" ml={1}>{trip.mainDestination || "Unknown Destination"}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <CalendarMonthIcon />
                                            <Typography variant="body2" ml={1}>{trip.startDate || "Unknown Date"}</Typography>
                                        </Box>
                                    </Box>
                                    <Box 
                                        mt={2} 
                                        display="inline-block"
                                        px={2}
                                        py={0.5}
                                        bgcolor={pillColor} 
                                        borderRadius="50px"
                                    >
                                        <Typography variant="body2" color={textColor}>
                                            <strong>Status:</strong> {trip.status}
                                        </Typography>
                                    </Box>
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        sx={{ mt: 2, bgcolor: "#141414" }} 
                                        onClick={() => handleViewDetails(trip.id)}
                                    >
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
