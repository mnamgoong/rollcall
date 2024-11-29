import React, { useState, useCallback } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Button 
} from '@mui/material';
import { post } from 'aws-amplify/api';
import ProgressTracker from './ProgressTracker';
import { useAuth } from 'react-oidc-context';
import BasicInformation from './BasicInformation';
import Transportation from './Transportation';
import StudentRoster from './StudentRoster';
import AdultRoster from './AdultRoster';
import Funding from './Funding';
import Documents from './Documents';
import Success from './Success';

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
    }
};

const CreateTrip = ({ setSelectedPage }) => {
    const auth = useAuth();
    const [activeTab, setActiveTab] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [completedSteps, setCompletedSteps] = useState({
        'basicInformation': false,
        'transportation': false,
        'studentRoster': false,
        'adultRoster': false,
        'funding': false,
        'documents': false
    });

    // centralized state for all form data
    const [formData, setFormData] = useState(initialFormState);

    // tab configuration
    const sections = [
        {
            title: "Basic Information",
            component: (
                <BasicInformation
                    data={formData.basicInformation}
                    updateData={(data) => updateFormData('basicInformation', data)}
                />
            ),
            data: formData.basicInformation,
        },
        {
            title: "Transportation",
            component: (
                <Transportation
                    data={formData.transportation}
                    updateData={(data) => updateFormData('transportation', data)}
                />
            ),
            data: formData.transportation,
        },
        {
            title: "Student Roster",
            component: (
                <StudentRoster
                    data={formData.studentRoster}
                    updateData={(data) => updateFormData('studentRoster', data)}
                />
            ),
            data: formData.studentRoster,
        },
        {
            title: "Adult Roster",
            component: (
                <AdultRoster
                    data={formData.adultRoster}
                    updateData={(data) => updateFormData('adultRoster', data)}
                />
            ),
            data: formData.adultRoster,
        },
        {
            title: "Funding",
            component: (
                <Funding
                    data={formData.funding}
                    updateData={(data) => updateFormData('funding', data)}
                />
            ),
            data: formData.funding,
        },
        {
            title: "Documents",
            component: (
                <Documents
                    data={formData.documents}
                    updateData={(data) => updateFormData('documents', data)}
                />
            ),
            data: formData.documents,
        },
        {
            title: "Submission Complete",
            component: (
                <Success 
                    onViewTrips={() => setSelectedPage("My Trips")}
                    onCreateAnother={() => {
                        setActiveTab(0);
                        setFormData(initialFormState);
                    }}
                />
            ),
        },
    ];

    // update form data function
    const updateFormData = useCallback((section, newData) => {
        setFormData(prevData => ({
            ...prevData,
            [section]: { ...prevData[section], ...newData }
        }));
    }, []);

    // navigation functions
    const handleNext = () => {
        if (activeTab === sections.length - 2) { // If on Documents page
            handleSubmit();
        } else {
            setActiveTab(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeTab > 0) {
            setActiveTab(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const userEmail = auth.user?.profile.email;
            const userName = auth.user?.profile.name;

            console.log('=== USER DEBUG INFO ===');
            console.log('Profile:', auth.user?.profile);
            console.log('Name:', userName);
            console.log('Email:', userEmail);
            console.log('=== END USER DEBUG INFO ===');

            const tripData = {
                trips: [{
                    id: `TRIP_${Date.now()}`,
                    tripName: formData.basicInformation.tripName,
                    tripType: formData.basicInformation.tripType,
                    mainDestination: formData.basicInformation.mainDestination,
                    startDate: formData.basicInformation.startDate,
                    endDate: formData.basicInformation.endDate,
                    overnight: formData.basicInformation.overnight,
                    outOfState: formData.basicInformation.outOfState,
                    international: formData.basicInformation.international,
                    tripPurpose: formData.basicInformation.tripPurpose,
                    athleticEvent: formData.basicInformation.athleticEvent,
                    subjectArea: formData.basicInformation.subjectArea,
                    activityDescription: formData.basicInformation.activityDescription,
                    curriculumRelation: formData.basicInformation.curriculumRelation,
                    arrangements: formData.basicInformation.arrangements,
                    eligibilityCriteria: formData.basicInformation.eligibilityCriteria,
                    walking: formData.transportation.walking,
                    car: formData.transportation.car,
                    bus: formData.transportation.bus,
                    charterBus: formData.transportation.charterBus,
                    train: formData.transportation.train,
                    plane: formData.transportation.plane,
                    other: formData.transportation.other,
                    accommodations: formData.transportation.accommodations,
                    classSelection: formData.studentRoster.classSelection,
                    staff: formData.adultRoster.staff,
                    chaperones: formData.adultRoster.chaperones,
                    fundingSource: formData.funding.fundingSource,
                    costPerStudent: formData.funding.costPerStudent,
                    totalCost: formData.funding.totalCost,
                    uploadedFiles: formData.documents.uploadedFiles,
                    userFullName: userName,
                    email: userEmail,
                    status: "PENDING",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }]
            };

            try {
                const response = await post({
                    apiName: 'sendFormData',
                    path: '/items',
                    options: {
                        body: tripData
                    }
                });
                console.log('Done:', response);

                setCompletedSteps({
                    'basicInformation': true,
                    'transportation': true,
                    'studentRoster': true,
                    'adultRoster': true,
                    'funding': true,
                    'documents': true
                });
                setActiveTab(sections.length - 1);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to submit trip');
            } finally {
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error getting user info:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <Box display="flex" flexGrow={1} width="100%">
            <Container>
                <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
                    {sections[activeTab].title}
                </Typography>

                <ProgressTracker 
                    steps={sections.slice(0, -1).map(section => section.title)}
                    activeStep={activeTab}
                    completedSteps={completedSteps}
                />

                <Box mt={2}>
                    {sections[activeTab].component}
                </Box>

                {activeTab !== sections.length - 1 && (
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
                            color={activeTab === sections.length - 2 ? "error" : "primary"}
                            onClick={handleNext}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : activeTab === sections.length - 2 ? "Submit" : "Next"}
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default CreateTrip;
