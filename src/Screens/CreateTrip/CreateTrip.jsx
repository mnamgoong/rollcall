import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Button } from '@mui/material';
import { post } from 'aws-amplify/api';
import BasicInformation from './BasicInformation';
import Transportation from './Transportation';
import StudentRoster from './StudentRoster';
import AdultRoster from './AdultRoster';
import Funding from './Funding';
import Documents from './Documents';

const CreateTrip = () => {
    const [activeTab, setActiveTab] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);

    // centralized state for all form data
    const [formData, setFormData] = useState({
        basicInformation: {
            tripName: '',
            mainDestination: '',
            destinationLocation: '',
            tripDates: '',
            overnight: false,
            outOfState: false,
            international: false,
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
    });

    // tab configuration
    const tabConfig = [
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
    ];

    // update form data function
    const updateFormData = (section, newData) => {
        setFormData(prevData => ({
            ...prevData,
            [section]: { ...prevData[section], ...newData }
        }));
    };

    // navigation functions
    const handleNext = () => {
		if (activeTab < tabConfig.length - 1) {
			setActiveTab(prev => prev + 1);
		} else {
			handleSubmit();
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
            const tripData = {
                trips: [
                    {
                        id: `TRIP_${Date.now()}`,
                        title: formData.basicInformation.tripName || "Default Title",
                        description: formData.basicInformation.activityDescription || "Default Description",
                        startDate: formData.basicInformation.tripDates,
                        endDate: formData.basicInformation.tripDates,
                        location: formData.basicInformation.mainDestination,
                        transportMode: formData.transportation,
                        participants: formData.studentRoster.classSelection ? [formData.studentRoster.classSelection] : [],
                        organizers: formData.adultRoster.staff,
                        chaperones: formData.adultRoster.chaperones,
                        fundSource: formData.funding.fundingSource,
                        costPerStudent: formData.funding.costPerStudent,
                        totalCost: formData.funding.totalCost,
                        status: "PENDING",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }
                ]
            };

            const response = await post({
                apiName: 'sendFormData',
                path: '/items',
                options: {
                    body: tripData
                }
            });
            
            console.log('Success:', response);
            alert('Trip submitted successfully!');
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting trip: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box display="flex" flexGrow={1} width="100%">
            <Container>
                <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
                    {tabConfig[activeTab].title}
                </Typography>

                {/* tabs */}
                <Tabs
                    value={activeTab}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {tabConfig.map((tab, index) => (
                        <Tab key={index} label={tab.title} />
                    ))}
                </Tabs>

                {/* render the current tab's component */}
                <Box mt={2}>
                    {tabConfig[activeTab].component}
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
                        color={activeTab == tabConfig.length - 1 ? "error" : "primary"}
                        onClick={handleNext}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : activeTab === tabConfig.length - 1 ? "Submit" : "Next"}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default CreateTrip;
