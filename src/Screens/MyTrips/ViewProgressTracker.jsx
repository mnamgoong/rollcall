import React from 'react';
import { 
    Box, 
    Stepper, 
    Step, 
    StepLabel 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ViewProgressTracker = ({ steps, activeStep }) => {
    const StepIcon = () => {
        // always return completed icon
        return <CheckCircleIcon color="success" />;
    };

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    const isActive = index === activeStep;
                    
                    return (
                        <Step key={step}>
                            <StepLabel
                                StepIconComponent={StepIcon}
                                sx={{
                                    '& .MuiStepLabel-label': {
                                        color: isActive ? 'primary.main' : 'success.main'
                                    }
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

export default ViewProgressTracker; 