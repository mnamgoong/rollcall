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

const TripDetails = ({ tripId, onBack }) => {
    const [tripData, setTripData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await fetch(
                    `https://lbeaduxwcl.execute-api.us-east-1.amazonaws.com/default/getTripByID/trip/id?id=${tripId}`
                );
                const data = await response.json();
                setTripData(data);
            } catch (error) {
                console.error('Error fetching trip details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    if (isLoading) {
        return <Typography>Loading trip details...</Typography>;
    }

    if (!tripData) {
        return <Typography>Failed to load trip details.</Typography>;
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