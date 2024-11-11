import React, { useState } from 'react';
import Dashboard from "@mui/icons-material/Dashboard";
import HelpOutline from "@mui/icons-material/HelpOutline";
import LocationOn from "@mui/icons-material/LocationOn";
import Logout from "@mui/icons-material/Logout";
import TripOrigin from "@mui/icons-material/TripOrigin";
import DirectionsBus from "@mui/icons-material/DirectionsBus";
import Luggage from "@mui/icons-material/Luggage";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { get } from 'aws-amplify/api';

const Sidebar = ({onSelectPage}) => {
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

//     return (
//         <Box width="290px" height="100vh" bgcolor="white">
//             <Box display="flex" flexDirection="column" alignItems="center" p={2}>
//                 <Box display="flex" alignItems="center" mb={4}>
//                     <img
//                         src="https://c.animaapp.com/EyZmrxhy/img/image-1@2x.png"
//                         alt="Logo"
//                         style={{ width: 50, height: 50 }}
//                     />
//                     <Typography variant="h4" fontWeight="bold" ml={2}>
//                         RollCall
//                     </Typography>
//                 </Box>
                
//                 <List component="nav" width="100%">
//                     <ListItem button onClick={() => setSelectedItem('dashboard')}>
//                         <ListItemIcon><Dashboard /></ListItemIcon>
//                         <ListItemText primary="Dashboard" />
//                     </ListItem>
                    
//                     <ListItem button onClick={() => setSelectedItem('createTrip')}>
//                         <ListItemIcon><DirectionsBus /></ListItemIcon>
//                         <ListItemText primary="Create a Trip" />
//                     </ListItem>
                    
//                     <ListItem 
//                         button 
//                         onClick={handleMyTripsClick}
//                         selected={selectedItem === 'myTrips'}
//                     >
//                         <ListItemIcon><DirectionsBus /></ListItemIcon>
//                         <ListItemText primary="My Trips" />
//                     </ListItem>
                    
//                     <ListItem button onClick={() => setSelectedItem('help')}>
//                         <ListItemIcon><HelpOutline /></ListItemIcon>
//                         <ListItemText primary="Help" />
//                     </ListItem>
//                 </List>

//                 {loading && (
//                     <Typography sx={{ mt: 2 }}>
//                         Loading...
//                     </Typography>
//                 )}

//                 {error && (
//                     <Typography color="error" sx={{ mt: 2 }}>
//                         {error}
//                     </Typography>
//                 )}
//             </Box>
//         </Box>
//     );

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
				{/* rollCall logo */}
				<Box display="flex" alignItems="center" mb={4}>
					<img
						src={require("../Images/logo64.png")}
						alt="Logo"
						style={{ width: 50, height: 50 }}
					/>
					<Typography variant="h4" fontWeight="bold" ml={2}>
						RollCall
					</Typography>
				</Box>

				{/* page navigation */}
				<List>
					<ListItem button onClick={() => onSelectPage("Dashboard")}>
						<ListItemIcon><Dashboard /></ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItem>
					<ListItem button onClick={() => onSelectPage("Create a Trip")}>
						<ListItemIcon><LocationOn /></ListItemIcon>
						<ListItemText primary="Create a Trip" />
					</ListItem>
					<ListItem button onClick={() => {
						handleMyTripsClick();
						onSelectPage("My Trips");
					}}>
						<ListItemIcon><Luggage /></ListItemIcon>
						<ListItemText primary="My Trips" />
					</ListItem>
					<ListItem button onClick={() => onSelectPage("Help")}>
						<ListItemIcon><HelpOutline /></ListItemIcon>
						<ListItemText primary="Help" />
					</ListItem>
				</List>

				{/* logout button */}
				<Box position="fixed" bottom={20} display="flex" justifyContent="center" width="20vw">
					<Button
						variant="contained"
						color="error"
						startIcon={<Logout />}
					>
						Log Out
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
