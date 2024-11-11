import React from "react";
import { 
	Box, 
	FormControl,
	Grid, 
	InputAdornment, 
	Select, 
	TextField, 
	Typography 
} from "@mui/material";

const Funding = ({ data }) => {
    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1">What is the source of funding for the trip?</Typography>
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                        <Select
                            value={data.fundingSource || ""}
                            disabled
                            displayEmpty
                            renderValue={(value) => value || "- Select -"}
                        >
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="body1">What is the estimated cost per student?</Typography>
                    <TextField
                        fullWidth
                        disabled
                        variant="outlined"
                        placeholder="Amount"
                        value={data.costPerStudent || ""}
                        name="costPerStudent"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        sx={{ mt: 2 }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="body1">What is the total estimated cost?</Typography>
                    <TextField
                        fullWidth
                        disabled
                        variant="outlined"
                        placeholder="Amount"
                        value={data.totalCost || ""}
                        name="totalCost"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        sx={{ mt: 2 }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Funding;
