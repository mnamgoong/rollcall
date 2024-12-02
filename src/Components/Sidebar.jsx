import React from 'react';
import Dashboard from "@mui/icons-material/Dashboard";
import HelpOutline from "@mui/icons-material/HelpOutline";
import LocationOn from "@mui/icons-material/LocationOn";
import Logout from "@mui/icons-material/Logout";
import Luggage from "@mui/icons-material/Luggage";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useAuth } from 'react-oidc-context';

const navigationItems = [
    { id: 'Dashboard', icon: Dashboard },
    { id: 'Create a Trip', icon: LocationOn },
    { id: 'My Trips', icon: Luggage },
    { id: 'Help', icon: HelpOutline }
];

const Sidebar = ({ selectedPage, setSelectedPage }) => {
    const auth = useAuth();

    const handleItemClick = (pageId) => {
        setSelectedPage(pageId);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav">
                {navigationItems.map(({ id, icon: Icon }) => (
                    <ListItem
                        sx={{ cursor: 'pointer' }}
                        key={id}
                        selected={selectedPage === id}
                        onClick={() => handleItemClick(id)}
                    >
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText primary={id} />
                    </ListItem>
                ))}
            </List>
            <Button
                fullWidth
                onClick={() => auth.signoutRedirect()}
                startIcon={<Logout />}
            >
                Logout
            </Button>
        </Box>
    );
};

export default Sidebar;