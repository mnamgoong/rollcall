import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import './App.css';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Dashboard from './Screens/Dashboard';
import CreateTrip from './Screens/CreateTrip/CreateTrip';
import MyTrips from './Screens/MyTrips/Overview';
import Help from './Screens/Help';

function App() {
	// state to store the active page
	const [selectedPage, setSelectedPage] = useState("Dashboard");

	// function to handle page change
	const renderPage = () => {
		switch (selectedPage) {
			case "Dashboard":
				return <Dashboard />;
			case "Create a Trip":
				return <CreateTrip />;
			case "My Trips":
				return <MyTrips />;
			case "Help":
				return <Help />;
			default:
				return <Dashboard />;
		}
	};

	return (
		<Box display="flex">
			{/* sidebar */}
			<Sidebar onSelectPage={setSelectedPage} />

			{/* main content */}
			<Box
				ml="20vw" // align content next to the sidebar
				width="80vw" // content area takes up the remaining width
			>
				<Header />
				<Container sx={{ mt: "10vh" }}>{renderPage()}</Container>
			</Box>
		</Box>
	);
}

export default App;
