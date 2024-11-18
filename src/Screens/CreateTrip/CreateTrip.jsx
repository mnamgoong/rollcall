import React, { useState, useEffect, useCallback } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Button 
} from '@mui/material';
import { post } from 'aws-amplify/api';
import ProgressTracker from './ProgressTracker';
import BasicInformation from './BasicInformation';
import Transportation from './Transportation';
import StudentRoster from './StudentRoster';
import AdultRoster from './AdultRoster';
import Funding from './Funding';
import Documents from './Documents';

const CreateTrip = () => {
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
    const [formData, setFormData] = useState({
        basicInformation: {
            tripName: '',
            mainDestination: '',
            destinationLocation: '',
            startDate: '',
            endDate: '',
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
    ];

    // update form data function
    const updateFormData = useCallback((section, newData) => {
        setFormData(prevData => ({
            ...prevData,
            [section]: { ...prevData[section], ...newData }
        }));
    }, []);

    // function to check if a section is complete
    const checkSectionCompletion = useCallback((section) => {
        console.log(`Checking completion for ${section}:`, formData[section]);
    
        if (!formData[section]) {
            console.log(`No data for ${section}`);
            return false;
        }
        
        const data = formData[section];
        
        switch (section) {
            case 'basicInformation':
                const requiredFields = [
                    'tripName',
                    'mainDestination',
                    'destinationLocation',
                    'startDate',
                    'subjectArea',
                    'activityDescription',
                    'curriculumRelation',
                    'arrangements',
                    'eligibilityCriteria'
                ];
                return requiredFields.every(field => Boolean(data[field]));
                
            case 'transportation':
                return Boolean(
                    data.walking || 
                    data.car || 
                    data.bus || 
                    data.charterBus || 
                    data.train || 
                    data.plane || 
                    data.other ||
                    data.accommodations
                );
                
            case 'studentRoster':
                return Boolean(data.classSelection);
                
            case 'adultRoster':
                return Boolean(data.staff?.length > 0 || data.chaperones?.length > 0);
                
            case 'funding':
                return Boolean(
                    data.fundingSource && 
                    data.costPerStudent && 
                    data.totalCost
                );
                
            case 'documents':
                return Boolean(data.uploadedFiles?.length > 0);
                
            default:
                return false;
        }
    }, [formData]);

    // update completion status whenever form data changes
    // useEffect(() => {
    //     const currentSection = Object.keys(completedSteps)[activeTab];
    //     const newCompletedSteps = { ...completedSteps };
        
    //     console.log(`Checking current section: ${currentSection}`);
    //     newCompletedSteps[currentSection] = checkSectionCompletion(currentSection);
        
    //     console.log('Section completion status:', newCompletedSteps[currentSection]);
    //     setCompletedSteps(newCompletedSteps);
    // }, [formData, activeTab, completedSteps, checkSectionCompletion]);    

    // navigation functions
    const handleNext = () => {
        // const currentSection = Object.keys(completedSteps)[activeTab];
        // const isCurrentSectionComplete = checkSectionCompletion(currentSection);
    
        // if (!isCurrentSectionComplete) {
        //     alert('Please complete all required fields before proceeding.');
        //     return;
        // }
    
        // if (activeTab < sections.length - 1) {
        //     setActiveTab(prev => prev + 1);
        // } else {
        //     handleSubmit();
        // }
        if (activeTab < sections.length - 1) {
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
        const tripData = {
            trips: [{
                id: `TRIP_${Date.now()}`,
                tripName: formData.basicInformation.tripName,
                mainDestination: formData.basicInformation.mainDestination,
                destinationLocation: formData.basicInformation.destinationLocation,
                startDate: formData.basicInformation.startDate,
                endDate: formData.basicInformation.endDate,
                overnight: formData.basicInformation.overnight,
                outOfState: formData.basicInformation.outOfState,
                international: formData.basicInformation.outOfState,
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
            console.log('Success:', response);

            setCompletedSteps({
                'basicInformation': true,
                'transportation': true,
                'studentRoster': true,
                'adultRoster': true,
                'funding': true,
                'Documents': true
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit trip');
        } finally {
            alert('Trip submitted successfully!');
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
                    steps={sections.map(section => section.title)}
                    activeStep={activeTab}
                    completedSteps={completedSteps}
                />

                {/* render the current section's component */}
                <Box mt={2}>
                    {sections[activeTab].component}
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
                        color={activeTab === sections.length - 1 ? "error" : "primary"}
                        onClick={handleNext}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : activeTab === sections.length - 1 ? "Submit" : "Next"}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default CreateTrip;
