import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './App.css';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Dashboard from './Screens/Dashboard';
import CreateTrip from './Screens/CreateTrip/CreateTrip';
import MyTrips from './Screens/MyTrips/Overview';
import Help from './Screens/Help';
import SignIn from './Screens/SignIn';
import * as Amplify from 'aws-amplify';

import { getCurrentUser, signOut } from 'aws-amplify/auth';

function App() {
	const [selectedPage, setSelectedPage] = useState("Dashboard");
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			await getCurrentUser();
			setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	if (!isAuthenticated) {
		return (
			<ThemeProvider theme={theme}>
				<SignIn />
			</ThemeProvider>
		);
	}

	const renderPage = () => {
		switch (selectedPage) {
			case "Dashboard":
				return <Dashboard />;
			case "Create a Trip":
				return <CreateTrip setSelectedPage={setSelectedPage}/>;
			case "My Trips":
				return <MyTrips />;
			case "Help":
				return <Help />;
			default:
				return <Dashboard />;
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Box display="flex">
				<Sidebar onSelectPage={setSelectedPage} />
				<Box ml="20vw" width="80vw">
					<Header />
					<Container sx={{ mt: "10vh" }}>{renderPage()}</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default App;

