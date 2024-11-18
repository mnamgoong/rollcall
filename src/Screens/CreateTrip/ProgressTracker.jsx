import React from 'react';
import { 
    Box, 
    Stepper, 
    Step, 
    StepLabel 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ProgressTracker = ({ steps, activeStep, completedSteps }) => {
    const StepIcon = ({ completed, active }) => {
        if (completed) {
            return <CheckCircleIcon color="success" />;
        }
        if (active) {
            return <RadioButtonUncheckedIcon color="primary" />;
        }
        return <RadioButtonUncheckedIcon />;
    };

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    const stepKey = step.replace(/\s+/g, '');
                    const isCompleted = completedSteps[stepKey];
                    const isActive = index === activeStep;
                    
                    return (
                        <Step key={step}>
                            <StepLabel
                                StepIconComponent={(props) => (
                                    <StepIcon 
                                        completed={isCompleted} 
                                        active={isActive} 
                                        {...props} 
                                    />
                                )}
                                sx={{
                                    '& .MuiStepLabel-label': {
                                        color: isCompleted ? 'success' : isActive ? 'primary.main' : 'text.secondary',
                                    },
                                }}
                            >
                                {step}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default ProgressTracker; 