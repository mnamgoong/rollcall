import React from 'react';
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

// Helper components for different trip types
const AthleticsQuestions = ({ data }) => (
    <>
        <Grid item xs={12}>
            <TextField
                fullWidth
                disabled
                label="What is the purpose of the trip (e.g. competition, training, team-building)?"
                value={data.tripPurpose || ''}
                variant="outlined"
                multiline
                rows={4}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                fullWidth
                disabled
                label="What specific event or competition will the team participate in?"
                value={data.athleticEvent || ''}
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
                value={data.arrangements || ''}
                variant="outlined"
                multiline
                rows={4}
            />
        </Grid>
    </>
);

const CurricularQuestions = ({ data }) => (
    <>
        <Grid item xs={12}>
            <TextField
                fullWidth
                disabled
                label="What subject area does it cover?"
                value={data.subjectArea || ''}
                variant="outlined"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                fullWidth
                disabled
                label="Describe the activity or event."
                value={data.activityDescription || ''}
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
                value={data.curriculumRelation || ''}
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
                value={data.arrangements || ''}
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
                value={data.eligibilityCriteria || ''}
                variant="outlined"
                multiline
                rows={4}
            />
        </Grid>
    </>
);

const FineArtsQuestions = ({ data }) => (
    <>
        <Grid item xs={12}>
            <TextField
                fullWidth
                disabled
                label="What is the purpose of the trip (e.g. performance, competition, workshop)?"
                value={data.tripPurpose || ''}
                variant="outlined"
                multiline
                rows={4}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                fullWidth
                disabled
                label="How does the trip relate to the fine arts curriculum?"
                value={data.curriculumRelation || ''}
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
                value={data.arrangements || ''}
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
                value={data.eligibilityCriteria || ''}
                variant="outlined"
                multiline
                rows={4}
            />
        </Grid>
    </>
);

const StudentOrgsQuestions = ({ data }) => (
    <>
        <Grid item xs={12}>
            <TextField
                fullWidth
                disabled
                label="What is the purpose of the trip (e.g. leadership, service, competition, project)?"
                value={data.tripPurpose || ''}
                variant="outlined"
                multiline
                rows={4}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                fullWidth
                disabled
                label="What activities or events will the students participate in?"
                value={data.activityDescription || ''}
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
                value={data.eligibilityCriteria || ''}
                variant="outlined"
                multiline
                rows={4}
            />
        </Grid>
    </>
);

const BasicInformation = ({ data }) => {
    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        disabled
                        label="What is the name of your trip?"
                        value={data.tripName}
                        variant="outlined"
                    />
                </Grid>
				<Grid item xs={12} md={6}>
                    <FormControl fullWidth disabled>
                        <InputLabel>What type of trip are you planning?</InputLabel>
                        <Select
                            label="What type of trip are you planning?"
							value={data.tripType}
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
                        disabled
                        label="What is the main destination?"
                        value={data.mainDestination}
                        variant="outlined"
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
				{data.tripType === "athletics" && (
                    <AthleticsQuestions data={data} />
                )}

                {data.tripType === "curricular" && (
                    <CurricularQuestions data={data} />
                )}

                {data.tripType === "fineArts" && (
                    <FineArtsQuestions data={data} />
                )}

                {data.tripType === "studentOrgs" && (
                    <StudentOrgsQuestions data={data} />
                )}
            </Grid>
        </Box>
    );
};

export default BasicInformation;
