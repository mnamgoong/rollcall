import React, { useState } from 'react';
import Dashboard from "@mui/icons-material/Dashboard";
import HelpOutline from "@mui/icons-material/HelpOutline";
import LocationOn from "@mui/icons-material/LocationOn";
import Logout from "@mui/icons-material/Logout";
import Luggage from "@mui/icons-material/Luggage";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { get } from 'aws-amplify/api';

// Navigation configuration
const navigationItems = [
    { id: 'Dashboard', icon: Dashboard },
    { id: 'Create a Trip', icon: LocationOn },
    { id: 'My Trips', icon: Luggage },
    { id: 'Help', icon: HelpOutline }
];

const Sidebar = ({ onSelectPage, onSignOut }) => {  // Add onSignOut to props
    const [selectedItem, setSelectedItem] = useState('Dashboard');

    // handler for My Trips API call
    const handleMyTripsClick = async () => {
        console.log('My Trips clicked');
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
        }
    };

    // handler for all navigation items
    const handleItemClick = (itemId) => {
        setSelectedItem(itemId);
        if (itemId === 'My Trips') {
            handleMyTripsClick();
        }
        onSelectPage(itemId);
    };

    return (
        <Box
            width="20vw"
            height="100vh"
            bgcolor="white"
            display="flex"
            flexDirection="column"
            position="fixed"
        >
            <Box display="flex" flexDirection="column" alignItems="center" p={2} flexGrow={1}>
                {/* RollCall Logo and Title */}
                <Box display="flex" alignItems="center" mb={4}>
                    <img
                        src={require("../Images/logo64.png")}
                        alt="Logo"
                        style={{ width: 50, height: 50 }}
                    />
                    <Typography variant="h4" sx={{ fontFamily: 'Short Stack' }} ml={2}>
                        RollCall
                    </Typography>
                </Box>

                {/* Navigation Menu */}
                <List sx={{ width: '100%', px: 2 }}>
                    {navigationItems.map(({ id, icon: Icon }) => (
                        <ListItem
                            key={id}
                            button
                            onClick={() => handleItemClick(id)}
                            sx={{
                                bgcolor: selectedItem === id ? '#eee' : 'transparent',
                                borderRadius: '8px',
                                mb: 1,
                                '&:hover': {
                                    bgcolor: selectedItem === id
                                        ? '#eee'
                                        : 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <ListItemIcon><Icon /></ListItemIcon>
                            <ListItemText primary={id} />
                        </ListItem>
                    ))}
                </List>

                {/* Logout Button */}
                <Box position="fixed" bottom={20} display="flex" justifyContent="center" width="20vw">
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<Logout />}
                        onClick={onSignOut}  // Use the onSignOut prop
                    >
                        Log Out
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;