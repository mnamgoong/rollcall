import { 
    Box, 
    Container,
    Paper, 
    Typography, 
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    height: '100%',
    borderRadius: 12,
	display: 'flex',
    flexDirection: 'column'
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
        signed: 18,
		total: 25,
        color: '#4CAF50',
    },
    {
        title: "Mr. J's 8th Grade History Class",
        signed: 13,
		total: 20,
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
        <Box display="flex" flexGrow={1} width="100%">
            <Container>
                {/* Permission Progress Cards */}
				<Typography variant="h6" fontWeight="bold" mt={4} mb={2}>Permission Slip Progress</Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {tripData.map((trip, index) => (
                        <Box key={index} sx={{ flex: 1, minWidth: '300px', mb: 3 }}>
                            <StyledPaper elevation={3}>
								<Box sx={{ padding: 2}}>
									<Typography fontWeight="bold" gutterBottom>
										{trip.title}
									</Typography>
									<Box display="flex" flexDirection="column" alignItems="center">
										<CircularProgressBox>
											<CircularProgress
												variant="determinate"
												value={100}
												size={120}
												thickness={4}
												sx={{ 
													color: '#eee',
													position: 'absolute'
												}}
											/>
											<CircularProgress
												variant="determinate"
												value={trip.signed / trip.total * 100}
												size={120}
												thickness={4}
												sx={{ 
													color: trip.color 
												}}
											/>
											<ProgressLabel variant="h6">
												{`${trip.signed / trip.total * 100}%`}
											</ProgressLabel>
										</CircularProgressBox>
										<Box sx={{ mt: 2, width: '100%' }}>
											<Typography variant="body2" color="text.secondary">
												{trip.signed} Parents Signed
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{trip.total - trip.signed} Parents Have Not Signed
											</Typography>
										</Box>
									</Box>
								</Box>
                            </StyledPaper>
                        </Box>
                    ))}
                </Box>

                {/* Second Row - Grade Trips and Proposed Trips */}
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ flex: 1, minWidth: '300px', mb: 3 }}>
                        <StyledPaper elevation={3}>
							<Box sx={{ padding: 2 }}>
								<Typography variant="h6" fontWeight="bold" gutterBottom>
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
							</Box>
                        </StyledPaper>
                    </Box>

                    <Box sx={{ flex: 1, minWidth: '300px', mb: 3 }}>
                        <StyledPaper elevation={3}>
							<Box sx={{ padding: 2 }}>
								<Typography variant="h6" fontWeight="bold" gutterBottom>
									Proposed Trips
								</Typography>
								{proposedTrips.map((trip, index) => (
									<Box key={index} sx={{ mb: 2 }}>
										<Typography variant="subtitle1" fontWeight="medium">
											{trip.title}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{trip.location}
										</Typography>
									</Box>
								))}
							</Box>
                        </StyledPaper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;
