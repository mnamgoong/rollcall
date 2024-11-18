import React, { useState } from 'react';
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
import { usePlacesWidget } from 'react-google-autocomplete';

const BasicInformation = ({ data, updateData }) => {
	const [mainDestination, setMainDestination] = useState(data.mainDestination || '');
    const [destinationLocation, setDestinationLocation] = useState(data.destinationLocation || '');

    // setup google places autocomplete for main destination
    const { ref: mainDestinationRef } = usePlacesWidget({
        apiKey: 'AIzaSyC3jNjnnyVdoA1VEOf6XtV6ik-RoFY1W3U',
        onPlaceSelected: (place) => {
            setMainDestination(place.formatted_address || '');
        },
        options: {
            types: ['establishment'],
        },
    });

    // setup google places autocomplete for destination location
    const { ref: destinationLocationRef } = usePlacesWidget({
        apiKey: 'AIzaSyC3jNjnnyVdoA1VEOf6XtV6ik-RoFY1W3U',
        onPlaceSelected: (place) => {
            const components = place.address_components;
            const city = components.find((c) => c.types.includes('locality'))?.long_name || '';
            const state = components.find((c) => c.types.includes('administrative_area_level_1'))?.short_name || '';
            const country = components.find((c) => c.types.includes('country'))?.long_name || '';
            setDestinationLocation(`${city}, ${state}, ${country}`);
        },
        options: {
            types: ['(cities)'], 
        },
    });

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
                        label="What is the main destination?"
                        name="mainDestination"
                        inputRef={mainDestinationRef}
                        value={mainDestination}
                        onChange={(e) => setMainDestination(e.target.value)}
                        variant="outlined"
                    />
                </Grid>
				<Grid item xs={12} md={6}>
					<TextField
                        fullWidth
                        label="Where is the main destination located?"
                        name="destinationLocation"
                        inputRef={destinationLocationRef}
                        value={destinationLocation}
                        onChange={(e) => setDestinationLocation(e.target.value)}
                        variant="outlined"
                    />
				</Grid>
				<Grid item xs={12} md={6}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						{data.overnight ? (
							<Box display="flex" gap={2}>
								<DesktopDatePicker 
									required
									label="When does the trip start?"
									value={data.startDate ? dayjs(data.startDate) : null}
									onChange={(newValue) => {
										updateData({ 
											startDate: newValue ? newValue.format('MM/DD/YYYY') : ''
										});
									}}
									sx={{ flex: 1 }}
								/>
								<DesktopDatePicker 
									required
									label="When does the trip end?"
									value={data.endDate ? dayjs(data.endDate) : null}
									onChange={(newValue) => {
										updateData({ 
											endDate: newValue ? newValue.format('MM/DD/YYYY') : ''
										});
									}}
									sx={{ flex: 1 }}
								/>
							</Box>
						) : (
							<DesktopDatePicker 
								required
								label="What date is the trip?"
								value={data.startDate ? dayjs(data.startDate) : null}
								onChange={(newValue) => {
									updateData({ 
										startDate: newValue ? newValue.format('MM/DD/YYYY') : '',
										endDate: '' 
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
