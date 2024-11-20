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
import SearchIcon from '@mui/icons-material/Search';
import studentData from '../../Data/students.json'; // dummy data

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

    const [searchTerm, setSearchTerm] = useState('');

    // filter students based on search
    const filteredStudents = students.filter(student => {
        const fullName = `${student.lastName} ${student.firstName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

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

                {/* Student Roster */}
                {data.classSelection && (
                    <Grid item xs={12}>
                        <Box sx={{ 
                            mt: 2, 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                        }}>
                            <Typography variant="h6" fontWeight="bold">
                                Student Roster
                            </Typography>
                            
                            <FormControl variant="outlined" sx={{ width: '300px' }}>
                                <Box sx={{ 
                                    position: 'relative', 
                                    display: 'flex', 
                                    alignItems: 'center' 
                                }}>
                                    <SearchIcon sx={{ 
                                        position: 'absolute',
                                        left: '8px',
                                        color: '#666'
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Search by student name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            padding: '8px 12px 8px 36px', // Added left padding for icon
                                            fontSize: '16px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            width: '100%'
                                        }}
                                    />
                                </Box>
                            </FormControl>
                        </Box>

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
                                {(searchTerm.trim() === '' ? students : filteredStudents).map((student, index) => (
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
