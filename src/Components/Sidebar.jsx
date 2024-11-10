import React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Dashboard, HelpOutline, LocationOn, Logout, Luggage } from "@mui/icons-material";

const Sidebar = ({ onSelectPage }) => {
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
					<ListItem button onClick={() => onSelectPage("My Trips")}>
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
