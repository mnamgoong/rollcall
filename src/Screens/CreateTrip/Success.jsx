import React from 'react';
import { 
    Box,
    Button, 
    Typography
} from '@mui/material';

const Success = ({ onViewTrips, onCreateAnother }) => {
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
                    onClick={onViewTrips}
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