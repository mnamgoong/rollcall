import React, { useState } from 'react';
import { 
    Box, 
	Checkbox,
	FormControl,
	FormControlLabel,
    Grid, 
	InputLabel,
	MenuItem,
	Select,
    TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { usePlacesWidget } from 'react-google-autocomplete'; // libary to access the google places API

// questions for athletics trips
const AthleticsQuestions = ({ data, updateData }) => {
    const handleFieldChange = (field) => (e) => {
        updateData({ [field]: e.target.value });
    };

    return (
        <>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="What is the purpose of the trip (e.g. competition, training, team-building)?"
                    value={data.tripPurpose || ''}
                    onChange={handleFieldChange('tripPurpose')}
                    variant="outlined"
					multiline
                    rows={4}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="What specific event or competition will the team participate in?"
                    value={data.athleticEvent || ''}
                    onChange={handleFieldChange('athleticEvent')}
                    variant="outlined"
					multiline
                    rows={4}
                />
            </Grid>
			<Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="What arrangements have been made for those not attending the trip?"
                    value={data.arrangements || ''}
                    onChange={handleFieldChange('arrangements')}
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </Grid>
        </>
    );
};

const CurricularQuestions = ({ data, updateData }) => {
    const handleFieldChange = (field) => (e) => {
        updateData({ [field]: e.target.value });
    };

    return (
        <>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="What subject area does it cover?"
                    value={data.subjectArea || ''}
                    onChange={handleFieldChange('subjectArea')}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Describe the activity or event."
                    value={data.activityDescription || ''}
                    onChange={handleFieldChange('activityDescription')}
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
                    value={data.curriculumRelation || ''}
                    onChange={handleFieldChange('curriculumRelation')}
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="What arrangements have been made for those not attending the trip?"
                    value={data.arrangements || ''}
                    onChange={handleFieldChange('arrangements')}
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
                    value={data.eligibilityCriteria || ''}
                    onChange={handleFieldChange('eligibilityCriteria')}
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </Grid>
        </>
    );
};

const FineArtsQuestions = ({ data, updateData }) => {
    const handleFieldChange = (field) => (e) => {
        updateData({ [field]: e.target.value });
    };

    return (
		<>
			<Grid item xs={12}>
				<TextField
					fullWidth
					required
					label="What is the purpose of the trip (e.g. performance, competition, workshop)?"
					value={data.tripPurpose || ''}
					onChange={handleFieldChange('tripPurpose')}
					variant="outlined"
					multiline
					rows={4}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					fullWidth
					required
					label="How does the trip relate to the fine arts curriculum?"
					value={data.curriculumRelation || ''}
					onChange={handleFieldChange('curriculumRelation')}
					variant="outlined"
					multiline
					rows={4}
				/>
			</Grid>
			<Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="What arrangements have been made for those not attending the trip?"
                    value={data.arrangements || ''}
                    onChange={handleFieldChange('arrangements')}
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
                    value={data.eligibilityCriteria || ''}
                    onChange={handleFieldChange('eligibilityCriteria')}
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </Grid>
		</>
	);
}

const StudentOrgsQuestions = ({ data, updateData }) => {
	const handleFieldChange = (field) => (e) => {
		updateData({ [field]: e.target.value });
	};
	
	return (
		<>
			<Grid item xs={12}>
				<TextField
					fullWidth
					required
					label="What is the purpose of the trip (e.g. leadership, service, competition, project)?"
					value={data.tripPurpose || ''}
					onChange={handleFieldChange('tripPurpose')}
					variant="outlined"
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					fullWidth
					required
					label="What activities or events will the students participate in?"
					value={data.activityDescription || ''}
					onChange={handleFieldChange('activityDescription')}
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
                    value={data.eligibilityCriteria || ''}
                    onChange={handleFieldChange('eligibilityCriteria')}
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </Grid>
		</>
	);
}

const BasicInformation = ({ data, updateData }) => {
	const [mainDestination, setMainDestination] = useState(data.mainDestination || '');
    // setup google places autocomplete for main destination
    const { ref: mainDestinationRef } = usePlacesWidget({
		apiKey: 'AIzaSyC3jNjnnyVdoA1VEOf6XtV6ik-RoFY1W3U',
		onPlaceSelected: (place) => {
			const formattedAddress = place.formatted_address || '';
			setMainDestination(formattedAddress);
			updateData({ mainDestination: formattedAddress });
		},
		options: {
			types: ['establishment'],
		},
	});

    const handleChange = (field) => (event) => {
        const { value, type, checked } = event.target;
        updateData({ [field]: type === 'checkbox' ? checked : value });
    };

    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        label="What is the name of your trip?"
                        value={data.tripName}
                        onChange={handleChange('tripName')}
                        variant="outlined"
                    />
                </Grid>
				<Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                        <InputLabel>What type of trip are you planning?</InputLabel>
                        <Select
                            label="What type of trip are you planning?"
                            value={data.tripType || ''}
                            onChange={handleChange('tripType')}
                        >
                            <MenuItem value="athletics">Athletics</MenuItem>
							<MenuItem value="curricular">Curricular</MenuItem>
                            <MenuItem value="fineArts">Fine Arts (i.e. Band, Orchestra, Chorus)</MenuItem>
                            <MenuItem value="studentOrgs">Student Organizations</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
					<TextField
						fullWidth
						required
						label="What is the main destination?"
						inputRef={mainDestinationRef}
						value={mainDestination}
						onChange={(e) => {
							setMainDestination(e.target.value);
							updateData({ mainDestination: e.target.value });
						}}
						onFocus={(e) => {
							e.target.select();
						}}
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
									slotProps={{
										textField: {
										  required: true,
										},
									}}
								/>
								<DesktopDatePicker 
									required
									label="When does the trip end?"
									minDate={data.startDate ? dayjs(data.startDate) : null}
									value={data.endDate ? dayjs(data.endDate) : null}
									onChange={(newValue) => {
										updateData({ 
											endDate: newValue ? newValue.format('MM/DD/YYYY') : ''
										});
									}}
									sx={{ flex: 1 }}
									slotProps={{
										textField: {
										  required: true,
										},
									}}
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
								slotProps={{
									textField: {
									  required: true,
									},
								}}
							/>
						)}
					</LocalizationProvider>
				</Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox checked={data.overnight} onChange={handleChange('overnight')}  />}
                        label="Overnight Trip"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={data.outOfState} onChange={handleChange('outOfState')} />}
                        label="Out of State Trip"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={data.international} onChange={handleChange('international')} />}
                        label="International Trip"
                    />
                </Grid>
				
				{data.tripType === "athletics" && (
                    <AthleticsQuestions data={data} updateData={updateData} />
                )}

                {data.tripType === "curricular" && (
                    <CurricularQuestions data={data} updateData={updateData} />
                )}

                {data.tripType === "fineArts" && (
                    <FineArtsQuestions data={data} updateData={updateData} />
                )}

                {data.tripType === "studentOrgs" && (
                    <StudentOrgsQuestions data={data} updateData={updateData} />
                )}
            </Grid>
        </Box>
    );
};

export default BasicInformation;