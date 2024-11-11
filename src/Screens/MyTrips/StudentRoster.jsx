import React from "react";
import { 
	Box, 
	FormControl, 
	Grid, 
	MenuItem, 
	Select, 
	Typography 
} from "@mui/material";

const StudentRoster = ({ data }) => {
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
            </Grid>
        </Box>
    );
};

export default StudentRoster;