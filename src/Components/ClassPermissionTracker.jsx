import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material';
import { useAuth } from 'react-oidc-context';
import { get, post } from 'aws-amplify/api';

const ClassPermissionTracker = ({ tripData }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useAuth();

    const fetchStudents = async () => {
        try {
            const userEmail = auth.user?.profile.email;
            const periodNumber = tripData.classSelection.split(' ')[1];
            
            const response = await fetch(
                `https://z6u30mgjq5.execute-api.us-east-1.amazonaws.com/dev/students?teacherEmail=${encodeURIComponent(userEmail)}&period=${encodeURIComponent(periodNumber)}&tripId=${encodeURIComponent(tripData.id)}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.length > 0 && data[0].students) {
                setStudents(data[0].students.map(student => ({
                    ...student,
                    slipSigned: student.slipSigned || false
                })));
            } else {
                setStudents([]);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Failed to load student data');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = async (studentId, currentStatus) => {
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
                        trip_id: tripData.id,
                        if_permission: (!currentStatus).toString()
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data) {
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

    useEffect(() => {
        fetchStudents();
    }, [tripData, auth.user]);

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                <TableCell align="right">Permission Slip</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={student.slipSigned}
                                            onChange={() => handleCheckboxChange(student.id, student.slipSigned)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default ClassPermissionTracker; 