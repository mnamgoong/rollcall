import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import BasicInformation from './BasicInformation';
import Transportation from './Transportation';
import StudentRoster from './StudentRoster';
import AdultRoster from './AdultRoster';
import Funding from './Funding';
import Documents from './Documents';

const CreateTrip = () => {
	// state to store the active tab index
	const [activeTab, setActiveTab] = useState(0);

	// tab configurations (title and component for each tab)
	const tabConfig = [
		{
			title: "Basic Information",
			component: <BasicInformation />,
		},
		{
			title: "Transportation",
			component: <Transportation />,
		},
		{
			title: "Student Roster",
			component: <StudentRoster />,
		},
		{
			title: "Adult Roster",
			component: <AdultRoster />,
		},
		{
			title: "Funding",
			component: <Funding />,
		},
		{
			title: "Documents",
			component: <Documents />,
		}
	];

	// function to handle tab change
	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<Box display="flex" flexGrow={1} width="100%" >
			<Container>
				{/* render the title based on the active tab */}
				<Typography variant="h5" fontWeight={"bold"} mt={4} mb={2}>
					{tabConfig[activeTab].title}
				</Typography>

				{/* tab navigation */}
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="Basic Information" />
					<Tab label="Transportation" />
					<Tab label="Student Roster" />
					<Tab label="Adult Roster" />
					<Tab label="Funding" />
					<Tab label="Documents" />
				</Tabs>

				{/* render the component associated with the active tab */}
				<Box mt={2}>
					{tabConfig[activeTab].component}
				</Box>
			</Container>
		</Box>
	);
}

export default CreateTrip;