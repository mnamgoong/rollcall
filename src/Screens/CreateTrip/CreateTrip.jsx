import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useAuth } from 'react-oidc-context';
import ProgressTracker from './ProgressTracker';
import BasicInformation from './BasicInformation';
import Transportation from './Transportation';
import StudentRoster from './StudentRoster';
import AdultRoster from './AdultRoster';
import Funding from './Funding';
import Documents from './Documents';
import Success from './Success';

const CreateTrip = ({ setSelectedPage, tripData, isEditing }) => {
    const auth = useAuth();
    const [activeTab, setActiveTab] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialFormState = {
        basicInformation: {
            tripName: '',
            tripType: '',
            mainDestination: '',
            startDate: '',
            endDate: '',
            overnight: false,
            outOfState: false,
            international: false,
            tripPurpose: '',
            athleticEvent: '',
            subjectArea: '',
            activityDescription: '',
            curriculumRelation: '',
            arrangements: '',
            eligibilityCriteria: '',
        },
        transportation: {
            walking: false,
            car: false,
            bus: false,
            charterBus: false,
            train: false,
            plane: false,
            other: '',
            accommodations: '',
        },
        studentRoster: {
            classSelection: '',
        },
        adultRoster: {
            staff: [],
            chaperones: [],
        },
        funding: {
            fundingSource: '',
            costPerStudent: '',
            totalCost: '',
        },
        documents: {
            uploadedFiles: [],
        },
    };

    const [formData, setFormData] = useState(initialFormState);
    const [completedSteps, setCompletedSteps] = useState({
        basicInformation: false,
        transportation: false,
        studentRoster: false,
        adultRoster: false,
        funding: false,
        documents: false,
    });

    useEffect(() => {
        if (isEditing && tripData) {
            setFormData({
                basicInformation: {
                    ...initialFormState.basicInformation,
                    ...tripData,
                },
                transportation: {
                    ...initialFormState.transportation,
                    ...tripData,
                },
                studentRoster: {
                    ...initialFormState.studentRoster,
                    ...tripData,
                },
                adultRoster: {
                    ...initialFormState.adultRoster,
                    ...tripData,
                },
                funding: {
                    ...initialFormState.funding,
                    ...tripData,
                },
                documents: {
                    uploadedFiles: tripData.uploadedFiles || [],
                },
            });
        } else {
            setFormData(initialFormState);
        }
    }, [isEditing, tripData]);

    const updateFormData = (section, newData) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], ...newData },
        }));
        setCompletedSteps((prev) => ({
            ...prev,
            [section]: true,
        }));
    };

    const handleNext = () => {
        setActiveTab((prev) => Math.min(prev + 1, sections.length - 1));
    };

    const handleBack = () => {
        setActiveTab((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const userEmail = auth.user?.profile.email;
            const userName = auth.user?.profile.name;

            const tripPayload = {
                id: tripData?.id || `TRIP_${Date.now()}`,
                ...formData.basicInformation,
                ...formData.transportation,
                ...formData.studentRoster,
                ...formData.adultRoster,
                ...formData.funding,
                uploadedFiles: formData.documents.uploadedFiles,
                userFullName: userName,
                email: userEmail,
                status: "PENDING",
                createdAt: tripData?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const endpoint = tripData
                ? `https://olt95t35ea.execute-api.us-east-1.amazonaws.com/dev/updateTrip/${tripData.id}`
                : "https://olt95t35ea.execute-api.us-east-1.amazonaws.com/dev/createTrip";

            const method = tripData ? "PUT" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tripPayload),
            });

            if (!response.ok) throw new Error("Failed to save trip");

            setActiveTab(sections.length - 1);
        } catch (error) {
            console.error(error);
            alert('Failed to submit trip');
        } finally {
            setIsSubmitting(false);
        }
    };

    const sections = [
        {
            title: 'Basic Information',
            component: (
                <BasicInformation
                    data={formData.basicInformation}
                    updateData={(data) => updateFormData('basicInformation', data)}
                />
            ),
        },
        {
            title: 'Transportation',
            component: (
                <Transportation
                    data={formData.transportation}
                    updateData={(data) => updateFormData('transportation', data)}
                />
            ),
        },
        {
            title: 'Student Roster',
            component: (
                <StudentRoster
                    data={formData.studentRoster}
                    updateData={(data) => updateFormData('studentRoster', data)}
                />
            ),
        },
        {
            title: 'Adult Roster',
            component: (
                <AdultRoster
                    data={formData.adultRoster}
                    updateData={(data) => updateFormData('adultRoster', data)}
                />
            ),
        },
        {
            title: 'Funding',
            component: (
                <Funding
                    data={formData.funding}
                    updateData={(data) => updateFormData('funding', data)}
                />
            ),
        },
        {
            title: 'Documents',
            component: (
                <Documents
                    data={formData.documents}
                    updateData={(data) => updateFormData('documents', data)}
                />
            ),
        },
        {
            title: 'Success',
            component: <Success onViewTrips={() => setSelectedPage('My Trips')} />,
        },
    ];

    return (
        <Box display="flex" flexGrow={1} width="100%">
            <Container>
                <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
                    {sections[activeTab].title}
                </Typography>
                <ProgressTracker
                    steps={sections.slice(0, -1).map((section) => section.title)}
                    activeStep={activeTab}
                    completedSteps={completedSteps}
                />
                <Box mt={2}>{sections[activeTab].component}</Box>
                <Box display="flex" justifyContent="space-between" mt={4} mb={6}>
                    <Button
                        variant="contained"
                        onClick={handleBack}
                        disabled={activeTab === 0}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={activeTab === sections.length - 2 ? handleSubmit : handleNext}
                        disabled={isSubmitting}
                    >
                        {activeTab === sections.length - 2 ? 'Submit' : 'Next'}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default CreateTrip;
