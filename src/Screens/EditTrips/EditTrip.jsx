import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import ViewProgressTracker from './ViewProgressTracker';
import BasicInformation from './BasicInformation';
import Transportation from './Transportation';
import StudentRoster from './StudentRoster';
import AdultRoster from './AdultRoster';
import Funding from './Funding';
import Documents from './Documents';

const EditTrip = ({ tripId, onBack }) => {
    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // Fetch trip details
    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await fetch(
                    `https://lbeaduxwcl.execute-api.us-east-1.amazonaws.com/default/getTripByID/trip/id?id=${tripId}`
                );
                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }
                const data = await response.json();
                setFormData({
                    basicInformation: {
                        tripName: data.tripName || '',
                        tripType: data.tripType || '',
                        mainDestination: data.mainDestination || '',
                        startDate: data.startDate || '',
                        endDate: data.endDate || '',
                        overnight: data.overnight || false,
                        outOfState: data.outOfState || false,
                        international: data.international || false,
                        tripPurpose: data.tripPurpose || '',
                        athleticEvent: data.athleticEvent || '',
                        subjectArea: data.subjectArea || '',
                        activityDescription: data.activityDescription || '',
                        curriculumRelation: data.curriculumRelation || '',
                        arrangements: data.arrangements || '',
                        eligibilityCriteria: data.eligibilityCriteria || '',
                    },
                    transportation: {
                        walking: data.walking || false,
                        car: data.car || false,
                        bus: data.bus || false,
                        charterBus: data.charterBus || false,
                        train: data.train || false,
                        plane: data.plane || false,
                        other: data.other || '',
                        accommodations: data.accommodations || '',
                    },
                    studentRoster: {
                        classSelection: data.classSelection || '',
                    },
                    adultRoster: {
                        staff: data.staff || [],
                        chaperones: data.chaperones || [],
                    },
                    funding: {
                        fundingSource: data.fundingSource || '',
                        costPerStudent: data.costPerStudent || '',
                        totalCost: data.totalCost || '',
                    },
                    documents: {
                        uploadedFiles: data.uploadedFiles || [],
                    },
                });
            } catch (error) {
                console.error('Error fetching trip details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    const updateFormData = (section, newData) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], ...newData },
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        console.log("FormData being sent to API:", JSON.stringify(formData)); // Log formData
        try {
            const response = await fetch(
                `https://umkn2by4pf.execute-api.us-east-1.amazonaws.com/default/editTrip/trip/id?id=${tripId}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );
    
            console.log("API response:", response); // Log the response object
    
            if (!response.ok) {
                const errorDetails = await response.text();
                console.error("Error details:", errorDetails);
                throw new Error("Failed to save trip");
            }
    
            alert('Trip details saved successfully.');
            onBack();
        } catch (error) {
            console.error("Error saving trip details:", error);
            alert('Failed to save trip details.');
        } finally {
            setIsSaving(false);
        }
    };
w    

    const sections = [
        {
            title: 'Basic Information',
            component: (
                <BasicInformation
                    data={formData?.basicInformation || {}}
                    updateData={(data) => updateFormData('basicInformation', data)}
                />
            ),
        },
        {
            title: 'Transportation',
            component: (
                <Transportation
                    data={formData?.transportation || {}}
                    updateData={(data) => updateFormData('transportation', data)}
                />
            ),
        },
        {
            title: 'Student Roster',
            component: (
                <StudentRoster
                    data={formData?.studentRoster || {}}
                    updateData={(data) => updateFormData('studentRoster', data)}
                />
            ),
        },
        {
            title: 'Adult Roster',
            component: (
                <AdultRoster
                    data={formData?.adultRoster || {}}
                    updateData={(data) => updateFormData('adultRoster', data)}
                />
            ),
        },
        {
            title: 'Funding',
            component: (
                <Funding
                    data={formData?.funding || {}}
                    updateData={(data) => updateFormData('funding', data)}
                />
            ),
        },
        {
            title: 'Documents',
            component: (
                <Documents
                    data={formData?.documents || {}}
                    updateData={(data) => updateFormData('documents', data)}
                />
            ),
        },
    ];

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

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

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
                    ID: {tripId}
                </Typography>

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
                        onClick={activeTab === sections.length - 1 ? handleSave : handleNext}
                        disabled={isSaving}
                    >
                        {activeTab === sections.length - 1 ? (isSaving ? 'Saving...' : 'Save') : 'Next'}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default EditTrip;