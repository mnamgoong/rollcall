import React from "react";
import { 
	Box, 
	FormControl, 
	Grid, 
	MenuItem, 
	Select, 
	Typography 
} from "@mui/material";

const StudentRoster = ({ data, updateData }) => {
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
                            <MenuItem value="Period 1">Period 1</MenuItem>
                            <MenuItem value="Period 2">Period 2</MenuItem>
                            <MenuItem value="Period 3">Period 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentRoster;
