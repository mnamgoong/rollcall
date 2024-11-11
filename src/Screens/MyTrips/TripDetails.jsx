import React, { useState, useEffect } from "react"; 
import { 
    Box, 
    Button, 
    Container,
    Tabs, 
    Tab, 
    Typography,
    Divider, 
} from "@mui/material";
import BasicInformation from "./BasicInformation";
import Transportation from "./Transportation";
import StudentRoster from "./StudentRoster"; 
import AdultRoster from "./AdultRoster"; 
import Funding from "./Funding";
import Documents from "../CreateTrip/Documents";

const TripDetails = ({ tripID, onBack }) => {
    const [activeTab, setActiveTab] = useState(0);

    // add DB data
    const tripData = {
        "staff": [],
        "costPerStudent": "20",
        "status": "PENDING",
        "walking": false,
        "totalCost": "400",
        "subjectArea": "AP World History",
        "destinationLocation": "Washington, DC, USA",
        "charterBus": false,
        "arrangements": "Students will have a substitute teacher.",
        "eligibilityCriteria": "Students must be enrolled in AP World History.",
        "id": "TRIP_001",
        "international": false,
        "bus": true,
        "tripName": "History Trip",
        "accommodations": "",
        "uploadedFiles": [],
        "outOfState": true,
        "other": "",
        "createdAt": "2024-11-11T02:43:10.288041",
        "plane": false,
        "curriculumRelation": "Students will be immersed in history.",
        "train": false,
        "classSelection": "Class 1",
        "car": false,
        "tripDates": "03/12/2024",
        "updatedAt": "2024-11-11T02:43:10.288078",
        "fundingSource": "Class Budget",
        "chaperones": [],
        "activityDescription": "Students will be going to the Smithsonian Institute, where we'll receive a tour of the different exhibits.",
        "overnight": true,
        "mainDestination": "Smithsonian Institute"
    }

    const handleNext = () => {
        if (activeTab < sections.length - 1) {
            setActiveTab(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeTab > 0) {
            setActiveTab(prev => prev - 1);
        }
    };

    const sections = [
        {
            title: "Basic Information",
            component: <BasicInformation data={tripData} />
        },
        {
            title: "Transportation",
            component: <Transportation data={tripData} />
        },
        {
            title: "Student Roster",
            component: <StudentRoster data={tripData} />
        },
        {
            title: "Adult Roster",
            component: <AdultRoster data={tripData} />
        },
        {
            title: "Funding",
            component: <Funding data={tripData} />
        },
        {
            title: "Documents",
            component: <Documents data={tripData} />
        }
    ];

    if (!tripData) {
        // incase of error while fetching the data
        return <Typography mt={2}>Failed to load trip details.</Typography>;
    }

    return (
        <Box display="flex" flexGrow={1} width="100%">
            <Container>
                <Box mt={4}>
                    <Button variant="outlined" onClick={onBack}>Back</Button>
                </Box>

                <Typography variant="h5" fontWeight="bold" mt={2}>
                    Trip Details
                </Typography>
                <Typography variant="body1" mb={2}>
                    ID: {tripData.id}
                </Typography>

                <Divider sx={{ mb: 1 }}></Divider>

                {/* tabs for different sections */}
                <Tabs value={activeTab} indicatorColor="primary" textColor="primary">
                    {sections.map((section, index) => (
                        <Tab label={section.title} key={index} />
                    ))}
                </Tabs>

                {/* render the selected tab's content */}
                <Box mt={2}>
                    {sections[activeTab]?.component}
                </Box>

                {/* navigation buttons */}
                <Box display="flex" justifyContent="space-between" mt={4} mb={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBack}
                        disabled={activeTab === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={activeTab === sections.length - 1}
                    >
                        Next
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default TripDetails;