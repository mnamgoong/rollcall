import {
    Box,
    Button,
    Container,
    Typography,
    Paper,
} from "@mui/material";
import React, { useState } from "react";
import { post } from 'aws-amplify/api';
import tripTemplate from '../data/tripTemplate.json';

export const Documents = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Ensure the trip data matches your expected format
            const tripData = {
                trips: tripTemplate.trips.map(trip => ({
                    id: `TRIP_${Date.now()}`,
                    title: trip.title || "Default Title",
                    description: trip.description || "Default Description",
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                    location: trip.location,
                    transportMode: trip.transportMode,
                    participants: trip.participants || [],
                    organizers: trip.organizers || [],
                    chaperones: trip.chaperones || [],
                    fundSource: trip.fundSource,
                    costPerStudent: trip.costPerStudent,
                    totalCost: trip.totalCost,
                    status: trip.status || "PENDING",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }))
            };

            const response = await post({
                apiName: 'sendFormData',
                path: '/items',
                options: {
                    body: tripData
                }
            });
            
            console.log('Success:', response);
            alert('Trip submitted successfully!');
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting trip: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ p: 3 }}>
                <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            width: "100%",
                            textAlign: "center",
                            borderStyle: "dashed",
                            borderColor: "#6f6f6f",
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Upload Required Documents
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Upload Documents
                        </Button>
                    </Paper>
                </Box>
                <Box mt={4} display="flex" justifyContent="center">
                    <Button 
                        variant="contained" 
                        color="error"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Documents;
