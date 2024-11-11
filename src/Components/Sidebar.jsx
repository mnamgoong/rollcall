import { get } from '@aws-amplify/api';
import { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import { Dashboard, DirectionsBus, HelpOutline, Logout } from '@mui/icons-material';

const Sidebar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState('createTrip');

    const handleMyTripsClick = async () => {
        console.log('My Trips clicked');
        setSelectedItem('myTrips');
        setLoading(true);
        setError(null);

        try {
            console.log('Making API call to gettrips');
            const response = await get({
                apiName: 'sendFormData',
                path: '/gettrips'
            });
            console.log('API Response:', response);
        } catch (error) {
            console.error('API Error:', {
                message: error.message,
                name: error.name,
                code: error.code
            });
            setError('Failed to fetch trips: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box width="290px" height="100vh" bgcolor="white">
            <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                <Box display="flex" alignItems="center" mb={4}>
                    <img
                        src="https://c.animaapp.com/EyZmrxhy/img/image-1@2x.png"
                        alt="Logo"
                        style={{ width: 50, height: 50 }}
                    />
                    <Typography variant="h4" fontWeight="bold" ml={2}>
                        RollCall
                    </Typography>
                </Box>
                
                <List component="nav" width="100%">
                    <ListItem button onClick={() => setSelectedItem('dashboard')}>
                        <ListItemIcon><Dashboard /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    
                    <ListItem button onClick={() => setSelectedItem('createTrip')}>
                        <ListItemIcon><DirectionsBus /></ListItemIcon>
                        <ListItemText primary="Create a Trip" />
                    </ListItem>
                    
                    <ListItem 
                        button 
                        onClick={handleMyTripsClick}
                        selected={selectedItem === 'myTrips'}
                    >
                        <ListItemIcon><DirectionsBus /></ListItemIcon>
                        <ListItemText primary="My Trips" />
                    </ListItem>
                    
                    <ListItem button onClick={() => setSelectedItem('help')}>
                        <ListItemIcon><HelpOutline /></ListItemIcon>
                        <ListItemText primary="Help" />
                    </ListItem>
                </List>

                {loading && (
                    <Typography sx={{ mt: 2 }}>
                        Loading...
                    </Typography>
                )}

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Sidebar;
