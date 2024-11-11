import React from "react";
import { 
	Box, 
	Grid, 
	IconButton, 
	Paper, 
	Typography 
} from "@mui/material";
import { 
	AddCircle as AddCircleIcon 
} from "@mui/icons-material";

const AdultRoster = ({ data }) => {
    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold">Staff</Typography>
                    <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
                        <Box display="flex" alignItems="center">
                            <IconButton color="error" onClick={handleAddStaff}>
                                <AddCircleIcon />
                            </IconButton>
                            <Typography ml={1}>Add staff members</Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold">Chaperones</Typography>
                    <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
                        <Box display="flex" alignItems="center">
                            <IconButton color="error" onClick={handleAddChaperone}>
                                <AddCircleIcon />
                            </IconButton>
                            <Typography ml={1}>Add chaperones</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdultRoster;
