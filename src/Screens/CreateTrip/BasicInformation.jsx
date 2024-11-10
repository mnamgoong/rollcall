import React from 'react';
import { 
	Box, 
	Grid, 
	TextField, 
	Checkbox, 
	FormControlLabel 
} from '@mui/material';

const BasicInformation = ({ data, updateData }) => {
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        updateData({ [name]: type === 'checkbox' ? checked : value });
    };

    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        label="What is the name of your trip?"
                        name="tripName"
                        value={data.tripName}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        label="What is the main destination?"
                        name="mainDestination"
                        value={data.mainDestination}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						required
						label="Where is the main destination located?"
						name="destinationLocation"
						value={data.destinationLocation}
						onChange={handleChange}
						variant="outlined"
						helperText="e.g. Atlanta, GA, USA"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						required
						label="What are the tentative date(s) for the trip?"
						name="tripDates"
						value={data.tripDates}
						onChange={handleChange}
						variant="outlined"
						helperText="e.g. 01/01/2024-01/05/2024"
					/>
				</Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox checked={data.overnight} onChange={handleChange} name="overnight" />}
                        label="Overnight Trip"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={data.outOfState} onChange={handleChange} name="outOfState" />}
                        label="Out of State Trip"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={data.international} onChange={handleChange} name="international" />}
                        label="International Trip"
                    />
                </Grid>
				<Grid item xs={12}>
 					<TextField
						fullWidth
						required
						label="What subject area does it cover?"
						name="subjectArea"
						value={data.subjectArea}
						onChange={handleChange}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						required
						label="Describe the activity or event."
						name="activityDescription"
						value={data.activityDescription}
						onChange={handleChange}
						variant="outlined"
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						required
						label="How does the trip relate to the curriculum?"
						name="curriculumRelation"
						value={data.curriculumRelation}
						onChange={handleChange}
						variant="outlined"
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						required
						label="What arrangements have been made for those students not attending the trip?"
						name="arrangements"
						value={data.arrangements}
						onChange={handleChange}
						variant="outlined"
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						required
						label="What is the eligibility criteria to receive an invitation to participate in the trip?"
						name="eligibilityCriteria"
						value={data.eligibilityCriteria}
						onChange={handleChange}
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
