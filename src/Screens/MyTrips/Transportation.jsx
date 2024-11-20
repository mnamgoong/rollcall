import React from "react"; 
import { 
	Box,
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, 
} from "@mui/material";
import studentData from '../../Data/students.json'; // dummy data

const Transportation = ({ data }) => {
    // calculate total counts
    const totalStudents = data.classSelection ? 
        studentData.students.filter(student => 
            student.period === parseInt(data.classSelection.split(' ')[1])
        ).length || 0 : 0;

    const totalAdults = (data.staff?.length || 0) + (data.chaperones?.length || 0);
    
    const totalPeople = totalStudents + totalAdults;
    
    const regularEducation = data.classSelection ?
        studentData.students.filter(student => 
            student.period === parseInt(data.classSelection.split(' ')[1]) && 
            !student.specialEd
        ).length || 0 : 0;
    
    const specialEducation = data.classSelection ?
        studentData.students.filter(student => 
            student.period === parseInt(data.classSelection.split(' ')[1]) && 
            student.specialEd
        ).length || 0 : 0;

    const getSelectedTransportation = (data) => {
        const transportModes = [
            { 
                key: 'car', 
                label: 'Car',
                calculateNeeded: (totalPeople) => Math.ceil(totalPeople / 4) // 4 people per car
            },
            { 
                key: 'bus', 
                label: 'Bus',
                calculateNeeded: (totalPeople) => Math.ceil(totalPeople / 24) // 24 people per bus
            },
            { 
                key: 'charterBus', 
                label: 'Charter Bus',
                calculateNeeded: (totalPeople) => Math.ceil(totalPeople / 56) // 56 people per charter bus
            },
            { 
                key: 'train', 
                label: 'Train',
                calculateNeeded: (totalPeople) => 1 // usually need 1 train car/booking
            },
            { 
                key: 'plane', 
                label: 'Plane',
                calculateNeeded: (totalPeople) => Math.ceil(totalPeople / 50) // ~50 people per booking/section
            }
        ];
    
        // Filter out walking and only include selected modes
        const selected = transportModes.filter(mode => data[mode.key]);
        
        // Add other if it exists
        if (data.other) {
            selected.push({ 
                key: 'other', 
                label: data.other,
                calculateNeeded: () => 1 // Default to 1 for custom transportation
            });
        }
    
        return selected;
    };

    // helper function to render table headers
    const renderTableHeaders = (headers) => (
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            {headers.map((header, index) => (
                <TableCell key={index} align="center">
                    <Typography fontWeight="bold">{header}</Typography>
                </TableCell>
            ))}
        </TableRow>
    );
    
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
                        <FormControlLabel
                            disabled
                            control={<Checkbox checked={data.walking} name="walking" />}
                            label="Walking"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            disabled
                            control={<Checkbox checked={data.car} name="car" />}
                            label="Car"
                        />
                    </Grid>
                    <Grid item>
						<FormControlLabel 
                            disabled
							control={<Checkbox checked={data.bus} name="bus" />} 
							label="Bus" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
                            disabled
							control={<Checkbox checked={data.charterBus} name="charterBus" />} 
							label="Charter Bus" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
                            disabled
							control={<Checkbox checked={data.train} name="train" />} 
							label="Train" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
                            disabled
							control={<Checkbox checked={data.plane} name="plane" />} 
							label="Plane" 
						/>
					</Grid>
                    <Grid item>
                        <FormControlLabel 
                            disabled
                            control={<Checkbox checked={Boolean(data.other)} name="other" />} 
                            label="Other:" />
                        <TextField variant="outlined" size="small" value={data.other} name="other" />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body1">
                        Please list any necessary travel accommodations.
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        disabled
                        rows={2}
                        variant="outlined"
                        value={data.accommodations}
                        name="accommodations"
                    />
                </Grid>

                {/* Summary Table */}
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold">
                        Transportation Needs
                    </Typography>

                    <Grid 
                        container 
                        justifyContent="space-between" 
                        columnSpacing={2}
                        mt={2}
                    >
                        {[
                            { label: "Total People", value: totalPeople },
                            { label: "Total Students", value: totalStudents },
                            { label: "Total Adults", value: totalAdults },
                            { label: "Regular Education", value: regularEducation },
                            { label: "Special Education", value: specialEducation }
                        ].map(({ label, value }) => (
                            <Grid item xs={12} sm={2.4} key={label}>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table>
                                        <TableHead>
                                            {renderTableHeaders([label])}
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant="h5" align="center">
                                                        {value}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        ))}
                    </Grid>

                    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell>
                                        <Typography fontWeight="bold">Mode</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold">Needed</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold">Scheduled</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold">Missing</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getSelectedTransportation(data).map(({ key, label, calculateNeeded }) => {
                                    const needed = calculateNeeded(totalPeople);
                                    const scheduled = data[`${key}Scheduled`] || 0;
                                    
                                    return (
                                        <TableRow key={key}>
                                            <TableCell>{label}</TableCell>
                                            <TableCell>{needed}</TableCell>
                                            <TableCell>{scheduled}</TableCell>
                                            <TableCell>{needed - scheduled}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Transportation;
