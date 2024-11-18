import React from 'react';
import { 
	Box, 
	Grid, 
	TextField, 
	Checkbox, 
	FormControlLabel 
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const BasicInformation = ({ data }) => {
    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        disabled
                        label="What is the name of your trip?"
                        name="tripName"
                        value={data.tripName}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        disabled
                        label="What is the main destination?"
                        name="mainDestination"
                        value={data.mainDestination}
                        variant="outlined"
                    />
                </Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						disabled
						label="Where is the main destination located?"
						name="destinationLocation"
						value={data.destinationLocation}
						variant="outlined"
						helperText="e.g. Atlanta, GA, USA"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {data.overnight ? (
                            <Box display="flex" gap={2}>
                                <DesktopDatePicker 
                                    disabled
                                    label="When does the trip start?"
                                    value={data.startDate ? dayjs(data.startDate) : null}
                                    sx={{ flex: 1 }}
                                />
                                <DesktopDatePicker 
                                    disabled
                                    label="When does the trip end?"
                                    value={data.endDate ? dayjs(data.endDate) : null}
                                    sx={{ flex: 1 }}
                                />
                            </Box>
                        ) : (
                            <DesktopDatePicker 
                                disabled
                                label="What date is the trip?"
                                value={data.startDate ? dayjs(data.startDate) : null}
                                sx={{ width: '100%' }}
                            />
                        )}
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        disabled
                        control={<Checkbox checked={data.overnight} name="overnight" />}
                        label="Overnight Trip"
                    />
                    <FormControlLabel
                        disabled
                        control={<Checkbox checked={data.outOfState} name="outOfState" />}
                        label="Out of State Trip"
                    />
                    <FormControlLabel
                        disabled
                        control={<Checkbox checked={data.international} name="international" />}
                        label="International Trip"
                    />
                </Grid>
				<Grid item xs={12}>
 					<TextField
						fullWidth
						disabled
						label="What subject area does it cover?"
						name="subjectArea"
						value={data.subjectArea}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						disabled
						label="Describe the activity or event."
						name="activityDescription"
						value={data.activityDescription}
						variant="outlined"
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						disabled
						label="How does the trip relate to the curriculum?"
						name="curriculumRelation"
						value={data.curriculumRelation}
						variant="outlined"
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						disabled
						label="What arrangements have been made for those students not attending the trip?"
						name="arrangements"
						value={data.arrangements}
						variant="outlined"
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						disabled
						label="What is the eligibility criteria to receive an invitation to participate in the trip?"
						name="eligibilityCriteria"
						value={data.eligibilityCriteria}
						variant="outlined"
						multiline
						rows={4}
					/>
				</Grid>
            </Grid>
        </Box>
    );
};

export default BasicInformation;
