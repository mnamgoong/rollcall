import React from 'react';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
} from '@mui/material';

const BasicInformation = () => {
	return (
		<Box display="flex" justifyContent="center" width="100%">
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						required
						label="What is the name of your trip?"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						required
						label="What is the main destination?"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						required
						label="Where is the main destination located?"
						variant="outlined"
						helperText="e.g. Atlanta, GA, USA"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						required
						label="What are the tentative date(s) for the trip?"
						variant="outlined"
						helperText="e.g. 01/01/2024"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox />}
						label="Overnight Trip"
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Out of State Trip"
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="International Trip"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						required
						label="What subject area does it cover?"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						required
						label="Describe the activity or event."
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
						variant="outlined"
						multiline
						rows={4}
					/>
				</Grid>
				<Grid item xs={12} display="flex" justifyContent="center" mt={2} mb={6}>
					<Button variant="contained" color="primary">
						Next
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default BasicInformation;