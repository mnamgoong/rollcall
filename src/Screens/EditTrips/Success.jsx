import React from 'react';
import { 
    Box,
    Button, 
    Typography
} from '@mui/material';
import { get } from 'aws-amplify/api';
import { useAuth } from 'react-oidc-context';

const Success = ({ onViewTrips, onCreateAnother, fetchTrips }) => {
    const auth = useAuth();
    const handleViewTrips = async () => {
        onViewTrips();
        console.log('My Trips clicked');
        try {
            const userEmail = auth.user?.profile.email;
            console.log('Making API call to gettrips');
            const response = await get({
                apiName: 'sendFormData',
                path: '/gettrips',
                options: {
                    queryParams: {
                        email: userEmail
                    }
                }
            });
            console.log('API Response:', response);
        } catch (error) {
            console.error('API Error:', {
                message: error.message,
                name: error.name,
                code: error.code
            });
        }
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            gap={3} 
            py={4}
        >
            <Typography variant="h6" color="success.main" textAlign="center">
                Your trip request has been successfully submitted for review.
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
                You can view the status of your request in the My Trips section, 
                or create another trip request using the buttons below.
            </Typography>
            <Box display="flex" gap={2}>
                <Button 
                    variant="contained"
                    onClick={handleViewTrips}
                >
                    View My Trips
                </Button>
                <Button 
                    variant="outlined"
                    onClick={onCreateAnother}
                >
                    Create Another Trip
                </Button>
            </Box>
        </Box>
    );
};

export default Success;