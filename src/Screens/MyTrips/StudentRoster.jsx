import React, { useState, useEffect, useCallback } from "react";
import { 
	Box, 
    Checkbox,
    FormControl, 
    Grid, 
    Paper,
    Select, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography  
} from "@mui/material";
import studentData from '../../Data/students.json';

const StudentRoster = ({ data }) => {
    // get and sort students for the selected period
    const getStudentsForPeriod = useCallback(() => {
        const periodNumber = parseInt(data.classSelection?.split(' ')[1]);
        return studentData.students
            .filter(student => student.period === periodNumber)
            .sort((a, b) => {
                // first compare by lastName
                const lastNameComparison = a.lastName.localeCompare(b.lastName);
                
                // if lastNames are equal, compare by firstName
                if (lastNameComparison === 0) {
                    return a.firstName.localeCompare(b.firstName);
                }
                
                return lastNameComparison;
            });
    }, [data.classSelection]);

    // initialize students state with sorted data
    const [students, setStudents] = useState(getStudentsForPeriod());

    // update students when class selection changes
    useEffect(() => {
        setStudents(getStudentsForPeriod());
    }, [getStudentsForPeriod]);

    // permission slip and payment tracking
    const handleCheckboxChange = (studentIndex, field) => (event) => {
        const newStudents = [...students];
        newStudents[studentIndex] = {
            ...newStudents[studentIndex],
            [field]: event.target.checked
        };
        console.log(`${field} changed for ${newStudents[studentIndex].firstName} ${newStudents[studentIndex].lastName}`);
        setStudents(newStudents);
    };

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
                <Grid item xs={12}>
                    <Typography variant="body1">
                        Which class are you taking on the trip?
                    </Typography>
                    <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                        <Select
                            value={data.classSelection || ""}
                            disabled
                            displayEmpty
                            renderValue={(value) => value || "- Select -"}
                        >
                        </Select>
                    </FormControl>
                </Grid>

                {data.classSelection && (
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                            Student Roster
                        </Typography>
                        <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                            <Table>
                                <TableHead>
                                    {renderTableHeaders([
                                        'Name',
                                        'Permission Slip Signed',
                                        'Payment Received',
                                        'Health Conditions'
                                    ])}
                                </TableHead>
                                <TableBody>
                                    {students.map((student, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {`${student.lastName}, ${student.firstName}`}
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    checked={student.permissionSlip}
                                                    onChange={handleCheckboxChange(index, 'permissionSlip')}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    checked={student.payment}
                                                    onChange={handleCheckboxChange(index, 'payment')}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {student.healthConditions}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default StudentRoster;
