import { get } from '@aws-amplify/api';
import { Container, Typography, CircularProgress, Box, Card, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';

export const TripList = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrips = async () => {
        console.log('Attempting to fetch trips...');
        setLoading(true);
        try {
            const response = await get('sendFormData', '/gettrips');
            
            console.log('Raw API Response:', response);
            
            if (!response || response.error) {
                throw new Error(response?.error || 'Failed to fetch trips');
            }
            
            setTrips(response.data || []);
            setError(null);
        } catch (error) {
            console.error('API Error:', {
                message: error.message,
                name: error.name,
                code: error.code,
                response: error.response
            });
            setError('Failed to fetch trips: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('TripList component mounted');
        fetchTrips();
    }, []);

    return (
        <Container maxWidth="md">
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Submitted Trips
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : trips.length > 0 ? (
                    <Card sx={{ p: 2 }}>
                        {trips.map((trip) => (
                            <CardContent 
                                key={trip.id} 
                                elevation={2} 
                                sx={{ 
                                    mb: 2, 
                                    p: 2,
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                            >
                                <Typography variant="h6">
                                    {trip.title}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body1">
                                        Location: {trip.location}
                                    </Typography>
                                    <Typography variant="body1">
                                        Dates: {trip.startDate} - {trip.endDate}
                                    </Typography>
                                    <Typography variant="body1" 
                                        sx={{ 
                                            color: trip.status === 'PENDING' ? 'orange' : 
                                                   trip.status === 'APPROVED' ? 'green' : 
                                                   'inherit'
                                        }}
                                    >
                                        Status: {trip.status}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Total Cost: ${trip.totalCost}
                                    </Typography>
                                </Box>
                            </CardContent>
                        ))}
                    </Card>
                ) : (
                    <Typography>No trips found</Typography>
                )}
            </Box>
        </Container>
    );
};

export default TripList;