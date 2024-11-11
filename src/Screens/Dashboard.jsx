import { Container, Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

// styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	height: '100%',
	borderRadius: 12,
}));

const CircularProgressBox = styled(Box)({
	position: 'relative',
	display: 'inline-flex',
	margin: '20px 0',
});

const ProgressLabel = styled(Typography)({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
});

// dummy data
const tripData = [
	{
		title: "Mrs. Q's 4th Grade Art Class",
		progress: 47,
		color: '#4CAF50',
	},
	{
		title: "Mr. J's 8th Grade History Class",
		progress: 75,
		color: '#f44336',
	},
];

const proposedTrips = [
	{
		title: "Music Department",
		location: "Radio City Music Hall",
	},
	{
		title: "Mr. Doe's 10th Grade Science Class",
		location: "Nature Preserve",
	},
];

const gradeTrips = [
	{ grade: "Kindergarten", progress: 60 },
	{ grade: "Grades 1-5", progress: 75 },
	{ grade: "Grades 6-8", progress: 45 },
	{ grade: "Grades 9-12", progress: 80 },
];

export const Dashboard = () => {
    return (
		<Box display="flex" justifyContent="center" width="100%">
			<Grid container spacing={2}>
				{/* Permission Progress Cards */}
				{tripData.map((trip, index) => (
					<Grid item xs={12} md={6} key={index}>
						<StyledPaper>
							<Typography variant="h6" gutterBottom>{trip.title}</Typography>
							<CircularProgressBox>
								<CircularProgress
									variant="determinate"
									value={trip.progress}
									size={120}
									thickness={4}
									sx={{ color: trip.color }}
								/>
								<ProgressLabel variant="h6">
									{`${trip.progress}%`}
								</ProgressLabel>
							</CircularProgressBox>
							<Box sx={{ mt: 2 }}>
								<Typography variant="body2" color="text.secondary">
									Parents Signed
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Parents Have Not Signed
								</Typography>
							</Box>
						</StyledPaper>
					</Grid>
				))}

				{/* Grade Trips Progress */}
				<Grid item xs={12} md={6}>
					<StyledPaper>
						<Typography variant="h6" gutterBottom>
							Number of Trips per Grade
						</Typography>
						{gradeTrips.map((grade, index) => (
							<Box key={index} sx={{ mb: 2 }}>
								<Typography variant="body2" gutterBottom>
									{grade.grade}
								</Typography>
								<Box
									sx={{
										width: '100%',
										bgcolor: '#eee',
										borderRadius: 1,
										height: 8,
									}}
								>
								<Box
									sx={{
									width: `${grade.progress}%`,
									bgcolor: '#1976d2',
									height: '100%',
									borderRadius: 1,
									}}
								/>
								</Box>
							</Box>
						))}
					</StyledPaper>
				</Grid>

				{/* Proposed Trips */}
				<Grid item xs={12} md={6}>
					<StyledPaper>
						<Typography variant="h6" gutterBottom>
							Proposed Trips
						</Typography>
						{proposedTrips.map((trip, index) => (
							<Box key={index} sx={{ mb: 2 }}>
								<Typography variant="subtitle1">
								{trip.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
								{trip.location}
								</Typography>
							</Box>
						))}
					</StyledPaper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Dashboard;
