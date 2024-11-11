import React from 'react';
import { Box, Button, Typography } from "@mui/material";

const TripDetails = ({ tripId, onBack }) => {
    return (
        <Box>
            <Button onClick={onBack} variant="contained" color="error" sx={{ mt: 4, mb: 2 }}>
                Back
            </Button>
            <Typography variant="h5" fontWeight={"bold"}>Trip Details</Typography>
            <Typography>ID: {tripId}</Typography>
            {/* additional trip details */}
        </Box>
    );
};

export default TripDetails;
