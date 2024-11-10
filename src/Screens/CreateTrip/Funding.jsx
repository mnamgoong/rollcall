import React from "react";
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";

const Funding = () => {
	return (
		<Box display="flex" justifyContent="center" width="100%">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="body1">
						What is the source of funding for the trip?
					</Typography>
					<FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
						<Select
							displayEmpty
							renderValue={(value) => value || "- Select -"}
						>
							<MenuItem value="" disabled><em>- Select -</em></MenuItem>
							<MenuItem value="Class 1">Class Budget</MenuItem>
							<MenuItem value="Class 2">School Funding</MenuItem>
							<MenuItem value="Class 3">External Grant</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={6}>
					<Typography variant="body1">
						What is the estimated cost per student?
					</Typography>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Amount"
						InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}}
						sx={{ mt: 2 }}
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<Typography variant="body1">
						What is the total estimated cost?
					</Typography>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Amount"
						InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}}
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

export default Funding;