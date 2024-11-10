import React from "react"; 
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";

const Transportation = () => {
	return (
		<Box display="flex" justifyContent="center" width="100%">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="body1">
						What is the mode(s) of transportation for the trip?
					</Typography>
				</Grid>
				
				<Grid container justifyContent="center" spacing={2}>
					<Grid item>
						<FormControlLabel control={<Checkbox />} label="Walking" />
					</Grid>
					<Grid item>
						<FormControlLabel control={<Checkbox />} label="Car" />
					</Grid>
					<Grid item>
						<FormControlLabel control={<Checkbox />} label="Bus" />
					</Grid>
					<Grid item>
						<FormControlLabel control={<Checkbox />} label="Charter Bus" />
					</Grid>
					<Grid item>
						<FormControlLabel control={<Checkbox />} label="Train" />
					</Grid>
					<Grid item>
						<FormControlLabel control={<Checkbox />} label="Plane" />
					</Grid>
					<Grid item>
						<FormControlLabel control={<Checkbox />} label="Other:" />
						<TextField variant="outlined" size="small" />
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Typography variant="body1">
						Please list any necessary travel accommodations (e.g. wheelchair accessibility, special education).
					</Typography>
					<TextField 
						fullWidth 
						multiline 
						rows={4} 
						variant="outlined" 
						sx={{ mt: 2 }}
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

export default Transportation;
