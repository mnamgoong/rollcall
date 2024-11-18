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
					{/* <TextField
						fullWidth
						required
						label="What are the tentative date(s) for the trip?"
						name="tripDates"
						value={data.tripDates}
						onChange={handleChange}
						variant="outlined"
						helperText="e.g. 01/01/2024-01/05/2024"
					/> */}
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						{data.overnight ? (
							<Box display="flex" gap={2}>
								<DesktopDatePicker 
									label="When does the trip start?"
									value={data.tripDates?.startDate ? dayjs(data.tripDates.startDate) : null}
									onChange={(newValue) => {
										updateData({ 
											tripDates: {
												...data.tripDates,
												startDate: newValue ? newValue.format('MM/DD/YYYY') : ''
											}
										});
									}}
									sx={{ flex: 1 }}
								/>
								<DesktopDatePicker 
									label="When does the trip end?"
									value={data.tripDates?.endDate ? dayjs(data.tripDates.endDate) : null}
									onChange={(newValue) => {
										updateData({ 
											tripDates: {
												...data.tripDates,
												endDate: newValue ? newValue.format('MM/DD/YYYY') : ''
											}
										});
									}}
									sx={{ flex: 1 }}
								/>
							</Box>
						) : (
							<DesktopDatePicker 
                				label="What date is the trip?"
								value={data.tripDates ? dayjs(data.tripDates) : null}
								onChange={(newValue) => {
									updateData({ 
										tripDates: newValue ? newValue.format('MM/DD/YYYY') : ''
									});
								}}
								sx={{ width: '100%' }}
							/>
						)}
					</LocalizationProvider>
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
