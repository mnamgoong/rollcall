import React, { useState, useEffect } from 'react';
import Dashboard from "@mui/icons-material/Dashboard";
import HelpOutline from "@mui/icons-material/HelpOutline";
import LocationOn from "@mui/icons-material/LocationOn";
import Logout from "@mui/icons-material/Logout";
import Luggage from "@mui/icons-material/Luggage";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { get } from 'aws-amplify/api';
import { fetchUserAttributes } from 'aws-amplify/auth';

// Navigation configuration
const navigationItems = [
    { id: 'Dashboard', icon: Dashboard },
    { id: 'Create a Trip', icon: LocationOn },
    { id: 'My Trips', icon: Luggage },
    { id: 'Help', icon: HelpOutline }
];

const Sidebar = ({ onSelectPage, onSignOut }) => {
    const [selectedItem, setSelectedItem] = useState('Dashboard');
    const [userEmail, setUserEmail] = useState(null); // State to store the user's email

    // Fetch user email on mount
    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const attributes = await fetchUserAttributes();
                console.log("User Attributes:", attributes);
                setUserEmail(attributes?.email); // Extract email and save it
            } catch (error) {
                console.error("Error fetching user attributes:", error);
            }
        };

        fetchEmail();
    }, []);

    const handleMyTripsClick = async () => {
        console.log('My Trips clicked');
        try {
            if (!userEmail) {
                console.error("User email not available.");
                return;
            }

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

    // Handler for navigation items
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
                {/* Logo and Title */}
                <Box display="flex" alignItems="center" mb={4}>
                    <img
                        src={require("../Images/logo128.png")}
                        alt="Logo"
                        style={{ width: 100, height: 100 }}
                    />
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
                        onClick={onSignOut}
                    >
                        Log Out
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
