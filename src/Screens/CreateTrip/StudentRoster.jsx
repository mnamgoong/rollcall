import React, { useState, useEffect } from "react";
import { 
    Box, 
    FormControl, 
    Grid, 
    MenuItem, 
    Select, 
    Typography 
} from "@mui/material";
import { fetchUserAttributes } from "@aws-amplify/auth"; // Import from the correct package

const StudentRoster = ({ data, updateData }) => {
    const [classPeriods, setClassPeriods] = useState([]);
    const [userEmail, setUserEmail] = useState(null); // State to store user email

    // Fetch user email on mount
    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const attributes = await fetchUserAttributes();
                setUserEmail(attributes?.email); // Extract and store the email
            } catch (error) {
                console.error("Error fetching user attributes:", error);
            }
        };

        fetchEmail();
    }, []);

    useEffect(() => {
        const fetchClassInfo = async () => {
            try {
                const response = await fetch(
                    `https://u6x8gbfgze.execute-api.us-east-1.amazonaws.com/dev/info?teacherEmail=${userEmail}`,
                );
                const responseData = await response.json();
                const periods = responseData.periods || [];
                setClassPeriods(periods.map(period => ({ id: period, name: `Period ${period}` })));
            } catch (error) {
                console.error('Error fetching class info:', error);
                setClassPeriods([]);
            }
        };

        if (userEmail) { // Only fetch if userEmail is available
          fetchClassInfo();
        }
    }, [userEmail]); // Dependency array includes userEmail

    const handleChange = (event) => {
        updateData({ classSelection: event.target.value });
    };

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
                            onChange={handleChange}
                            displayEmpty
                            renderValue={(value) => value || "- Select -"}
                        >
                            <MenuItem value="" disabled>
                                <em>- Select -</em>
                            </MenuItem>
                            {classPeriods.map((period) => (
                                <MenuItem key={period.id} value={period.name}>
                                    {period.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentRoster;