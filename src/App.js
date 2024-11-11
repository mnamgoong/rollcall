// import logo from './logo.svg';
// import './App.css';
// import { BasicInformation } from './CreateATrip/BasicInformation';

// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>a
//     //   </header>
//     // </div>
//     <BasicInformation></BasicInformation>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import BasicInformation from './CreateATrip/BasicInformation';
import Transportation from './CreateATrip/Transportation';
import StudentRoster from './CreateATrip/StudentRoster';
import AdultRoster from './CreateATrip/AdultRoster';
import Funding from './CreateATrip/Funding';
import Documents from './CreateATrip/Documents';
import TripList from './ViewTrips/TripList';

import { Box, Container, Typography, Tabs, Tab } from '@mui/material';

function App() {
  // State to store active tab index
  const [activeTab, setActiveTab] = useState(0);

  // Define tab configurations (title and component for each tab)
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
    },
    // Add other tabs here
  ];

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box display="flex" width="100%">
      <Sidebar />
      <Box flexGrow={1}>
        <Header />
        <Container>
          {/* Render the title based on the active tab */}
          <Typography variant="h4" mt={4} mb={2}>
            {tabConfig[activeTab].title}
          </Typography>

          {/* Tabs navigation */}
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
            {/* Add other tab labels here */}
          </Tabs>

          {/* Render the component associated with the active tab */}
          <Box mt={2}>
            {tabConfig[activeTab].component}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
