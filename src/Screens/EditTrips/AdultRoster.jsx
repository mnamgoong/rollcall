import React from "react";
import { 
	Box, 
	Grid, 
	Paper, 
	Table, 
	TableBody, 
	TableCell, 
	TableContainer, 
	TableHead, 
	TableRow, 
	Typography 
} from "@mui/material";

const AdultRoster = ({ data }) => {
	// helper function to render table headers
	const renderTableHeaders = (headers) => (
		<TableRow sx={{ backgroundColor: '#f5f5f5' }}>
			{headers.map((header, index) => (
				<TableCell key={index}>
					<Typography fontWeight="bold">{header}</Typography>
				</TableCell>
			))}
		</TableRow>
	);

	return (
		<Box display="flex" justifyContent="center" width="100%">
			<Grid container spacing={2}>
				{/* Staff Table Section */}
				<Grid item xs={12}>
					<Typography variant="h6" fontWeight="bold">Staff</Typography>
					<TableContainer component={Paper} variant="outlined" sx={{ mt: 2, mb: 2 }}>
						<Table>
							<TableHead>
								{renderTableHeaders(['Name', 'Position', 'Phone', 'Email'])}
							</TableHead>
							<TableBody>
								{data.staff?.map((staff, index) => (
									<TableRow key={index}>
										<TableCell>{staff.name}</TableCell>
										<TableCell>{staff.position}</TableCell>
										<TableCell>{staff.phone}</TableCell>
										<TableCell>{staff.email}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>

				{/* Chaperone Table Section */}
				<Grid item xs={12}>
					<Typography variant="h6" fontWeight="bold">Non-Staff Chaperones</Typography>
					<TableContainer component={Paper} variant="outlined" sx={{ mt: 2, mb: 2 }}>
						<Table>
							<TableHead>
								{renderTableHeaders(['Name', 'Phone', 'Email'])}
							</TableHead>
							<TableBody>
								{data.chaperones?.map((chaperone, index) => (
									<TableRow key={index}>
										<TableCell>{chaperone.name}</TableCell>
										<TableCell>{chaperone.phone}</TableCell>
										<TableCell>{chaperone.email}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AdultRoster;
