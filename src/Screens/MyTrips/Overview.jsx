import React, { useState, useEffect } from "react"; 
import { 
    CalendarMonth as CalendarMonthIcon,
    LocationOn as LocationOnIcon 
} from "@mui/icons-material"; 
import {
    Autocomplete, 
    Box, 
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider, 
    FormControl,
    Grid, 
    InputLabel,
    MenuItem,
    Paper, 
    Select,
    TextField,
    Typography,
} from "@mui/material"; 
import TripDetails from "./TripDetails";
import EditTrip from "../EditTrips/EditTrip";
import { useAuth } from 'react-oidc-context';

// helper function to determine status colors
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

const Overview = ({ setSelectedPage, setSelectedTripId }) => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTripId, setCurrentTripId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const auth = useAuth();

    // message popup states
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    const [messageData, setMessageData] = useState({
        to: [],
        documents: [],
        message: ""
    });
    const [availableDocuments, setAvailableDocuments] = useState([]);
    const [messageDialogTripId, setMessageDialogTripId] = useState(null);

    // fetch trips on component mount
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const userEmail = auth.user?.profile.email;
                const response = await fetch(
                    `https://olt95t35ea.execute-api.us-east-1.amazonaws.com/dev/gettrips?email=${encodeURIComponent(
                        userEmail
                    )}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTrips(data.data || []);
            } catch (error) {
                console.error("Error fetching trips:", error);
                setTrips([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrips();
    }, [auth.user]);

    // handler functions
    const handleEditTrip = (tripId) => {
        setSelectedTripId(tripId);
        setSelectedPage("Edit Trip"); 
    };

    const handleViewDetails = (tripId) => {
        setCurrentTripId(tripId);
    };

    const handleBackToOverview = () => {
        setCurrentTripId(null); 
    };

    // message popup functions
    const handleOpenMessageDialog = async (tripId) => {
        setMessageDialogTripId(tripId);
        try {
            const response = await fetch(
                `https://lbeaduxwcl.execute-api.us-east-1.amazonaws.com/default/getTripByID/trip/id?id=${tripId}`
            );
            const tripData = await response.json();
            
            // set available documents from the fetched trip data
            setAvailableDocuments(tripData?.uploadedFiles || []);
            setMessageDialogOpen(true);
        } catch (error) {
            console.error('Error fetching trip documents:', error);
            alert('Failed to load trip documents. Please try again.');
        }
    };

    const handleCloseMessageDialog = () => {
        setMessageDialogOpen(false);
        setMessageDialogTripId(null);
        setMessageData({
            to: [],
            documents: [],
            message: ""
        });
    };

    const handleSendMessage = async () => {
        try {
            const response = await fetch('https://nt0yfs8baf.execute-api.us-east-1.amazonaws.com/default/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tripId: messageDialogTripId,
                    recipients: messageData.to,
                    documents: messageData.documents,
                    message: messageData.message
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to send email. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Email sent successfully:', data);
            handleCloseMessageDialog();
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send emails. Please try again.');
        }
    };

    // loading state
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    // show trip details if a trip is selected
    if (currentTripId) {
        return isEditing ? (
            <EditTrip tripId={currentTripId} onBack={handleBackToOverview} />
        ) : (
            <TripDetails tripId={currentTripId} onBack={handleBackToOverview} />
        );
    }

    return (
        <Box display="flex" flexGrow={1} justifyContent="center" width="100%">
            <Container>
                <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>My Trips</Typography>
                <Divider />
                <Grid container spacing={4} mt={2} mb={6}>
                    {[...trips].sort((a, b) => a.tripName.localeCompare(b.tripName)).map((trip) => {
                        const { bgcolor, textColor, pillColor } = getStatusColor(trip.status);
                        return (
                            <Grid item xs={12} sm={6} md={4} key={trip.id}>
                                <Paper elevation={3} sx={{ p: 2, bgcolor }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {trip.tripName || "Untitled Trip"}
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={1} mt={2}>
                                        <Box display="flex" alignItems="center">
                                            <LocationOnIcon />
                                            <Typography variant="body2" ml={1}>
                                                {trip.mainDestination || "Unknown Destination"}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <CalendarMonthIcon />
                                            <Typography variant="body2" ml={1}>
                                                {trip.startDate || "Unknown Date"}
                                            </Typography>
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
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 2, bgcolor: "#007FFF" }}
                                        onClick={() => handleEditTrip(trip.id)}
                                    >
                                        Edit
                                    </Button>
                                    {trip.status === "APPROVED" && (
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{ mt: 2, bgcolor: "#007FFF" }}
                                            onClick={() => handleOpenMessageDialog(trip.id)}
                                        >
                                            Send Message
                                        </Button>
                                    )}
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            {/* message popup */}
            <Dialog 
                open={messageDialogOpen} 
                onClose={handleCloseMessageDialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Send Message</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }} display="flex" flexDirection="column" gap={2}>
                        <Autocomplete
                            multiple
                            freeSolo
                            options={["All Students", "All Parents"]}
                            value={messageData.to}
                            onChange={(event, newValue) => {
                                setMessageData(prev => ({ ...prev, to: newValue }));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="To"
                                    placeholder={messageData.to.length === 0 ? "Type email and press enter" : ""}
                                />
                            )}
                        />

                        <Autocomplete
                            multiple
                            options={availableDocuments.map(doc => doc.name)}
                            value={messageData.documents}
                            onChange={(event, newValue) => {
                                setMessageData(prev => ({ ...prev, documents: newValue }));
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Documents"
                                    placeholder={messageData.documents.length === 0 ? (availableDocuments.length > 0 ? "Select documents to attach" : "No documents to attach") : ""}
                                />
                            )}
                            disabled={availableDocuments.length === 0}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Message"
                            value={messageData.message}
                            onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseMessageDialog}
                        sx={{ margin: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSendMessage}
                        variant="contained"
                        color="primary"
                        disabled={!messageData.to.length || !messageData.message}
                        sx={{ margin: 2 }}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Overview;