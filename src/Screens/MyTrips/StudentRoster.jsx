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
import { useAuth } from 'react-oidc-context';

const StudentRoster = ({ data }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useAuth();

    const fetchStudents = async () => {
        const userEmail = auth.user?.profile.email;
        const periodNumber = data.classSelection.split(' ')[1];

        console.log('Fetching students with:', {
            userEmail,
            periodNumber,
            tripId: data.id
        });

        try {
            const url = `https://z6u30mgjq5.execute-api.us-east-1.amazonaws.com/dev/students?teacherEmail=${encodeURIComponent(userEmail)}&period=${encodeURIComponent(periodNumber)}&tripId=${encodeURIComponent(data.id)}`;
            console.log('Request URL:', url);

            const response = await fetch(url);
            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const responseData = await response.json();
            console.log('Response data:', responseData);

            if (responseData && responseData.length > 0 && responseData[0].students) {
                setStudents(responseData[0].students.map(student => ({
                    ...student,
                    slipSigned: student.slipSigned || false
                })));
            } else {
                console.log('No students found in response');
                setStudents([]);
            }
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                periodNumber,
                auth: auth.user ? 'authenticated' : 'not authenticated'
            });
            setError('Failed to load student data');
        } finally {
            setLoading(false);
        }
    };

    // get and sort students for the selected period
    // const getStudentsForPeriod = useCallback(() => {
    //     const periodNumber = parseInt(data.classSelection?.split(' ')[1]);
    //     return studentData.students
    //         .filter(student => student.period === periodNumber)
    //         .sort((a, b) => {
    //             // first compare by lastName
    //             const lastNameComparison = a.lastName.localeCompare(b.lastName);
                
    //             // if lastNames are equal, compare by firstName
    //             if (lastNameComparison === 0) {
    //                 return a.firstName.localeCompare(b.firstName);
    //             }
                
    //             return lastNameComparison;
    //         });
    // }, [data.classSelection]);

    // // initialize students state with sorted data
    // const [students, setStudents] = useState(getStudentsForPeriod());

    // update students when class selection changes
    useEffect(() => {
        if (auth.user && data) {
            fetchStudents();
        }
    }, [auth.user, data.id]);

    // permission slip and payment tracking
    const handleCheckboxChange = async (studentId, currentStatus) => {
        console.log(data.id)
        console.log(studentId)
        console.log(currentStatus)

        try {
            const response = await fetch(
                'https://z6u30mgjq5.execute-api.us-east-1.amazonaws.com/dev/permission-status',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        student_id: studentId,
                        trip_id: data.id,
                        if_permission: (!currentStatus).toString()
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            if (responseData) {
                setStudents(prevStudents => 
                    prevStudents.map(student => 
                        student.id === studentId 
                            ? { ...student, slipSigned: !currentStatus }
                            : student
                    )
                );
            }
        } catch (error) {
            console.error('Error updating permission:', error);
            setError('Failed to update permission status');
            await fetchStudents();
        }
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
                                                {/* {`${student.lastName}, ${student.firstName}`} */}
                                                {student.name}
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    checked={student.slipSigned}
                                                    onChange={() => handleCheckboxChange(student.id, student.slipSigned)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    // checked={student.payment}
                                                    // onChange={handleCheckboxChange(index, 'payment')}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {/* {student.healthConditions} */}
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
