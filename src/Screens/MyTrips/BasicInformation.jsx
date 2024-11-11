import React from 'react';
import { 
	Box, 
	Grid, 
	TextField, 
	Checkbox, 
	FormControlLabel 
} from '@mui/material';

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
					<TextField
						fullWidth
						disabled
						label="What are the tentative date(s) for the trip?"
						name="tripDates"
						value={data.tripDates}
						variant="outlined"
						helperText="e.g. 01/01/2024-01/05/2024"
					/>
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
