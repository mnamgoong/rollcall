import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";
import ViewProgressTracker from './ViewProgressTracker';
import BasicInformation from "./BasicInformation";
import Transportation from "./Transportation";
import StudentRoster from "./StudentRoster";
import AdultRoster from "./AdultRoster";
import Funding from "./Funding";
import Documents from "../CreateTrip/Documents";

const EditTrip = ({ tripId, onBack }) => {
    const [tripData, setTripData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

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

    const updateTripData = (section, newData) => {
        setTripData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(
                `https://lbeaduxwcl.execute-api.us-east-1.amazonaws.com/default/updateTrip?id=${tripId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tripData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save trip");
            }

            alert("Trip details saved successfully.");
            onBack();
        } catch (error) {
            console.error("Error saving trip details:", error);
            alert("Failed to save trip details.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (!tripData) {
        return <Typography sx={{ mt: 10 }}>FAILED TO LOAD TRIP DETAILS</Typography>;
    }

    const handleNext = () => {
        if (activeTab < sections.length - 1) {
            setActiveTab((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeTab > 0) {
            setActiveTab((prev) => prev - 1);
        }
    };

    const sections = [
        {
            title: "Basic Information",
            component: (
                <BasicInformation
                    data={tripData}
                    updateData={(data) => updateTripData("basicInformation", data)}
                />
            ),
        },
        {
            title: "Transportation",
            component: (
                <Transportation
                    data={tripData}
                    updateData={(data) => updateTripData("transportation", data)}
                />
            ),
        },
        {
            title: "Student Roster",
            component: (
                <StudentRoster
                    data={tripData}
                    updateData={(data) => updateTripData("studentRoster", data)}
                />
            ),
        },
        {
            title: "Adult Roster",
            component: (
                <AdultRoster
                    data={tripData}
                    updateData={(data) => updateTripData("adultRoster", data)}
                />
            ),
        },
        {
            title: "Funding",
            component: (
                <Funding
                    data={tripData}
                    updateData={(data) => updateTripData("funding", data)}
                />
            ),
        },
        {
            title: "Documents",
            component: (
                <Documents
                    data={tripData}
                    updateData={(data) => updateTripData("documents", data)}
                />
            ),
        },
    ];

    return (
        <Box display="flex" flexGrow={1} width="100%">
            <Container>
                <Box mt={4}>
                    <Button variant="outlined" onClick={onBack}>
                        Back
                    </Button>
                </Box>

                <Typography variant="h5" fontWeight="bold" mt={2}>
                    Edit Trip
                </Typography>
                <Typography variant="body1" mb={2}>
                    ID: {tripData.id}
                </Typography>

                <Divider sx={{ mb: 2 }}></Divider>

                <ViewProgressTracker
                    steps={sections.map((section) => section.title)}
                    activeStep={activeTab}
                />

                <Box mt={2}>{sections[activeTab].component}</Box>

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

                {activeTab === sections.length - 1 && (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default EditTrip;
