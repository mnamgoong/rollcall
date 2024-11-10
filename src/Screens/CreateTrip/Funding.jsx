import React from "react";
import { 
	Box, 
	FormControl,
	Grid, 
	InputAdornment, 
	MenuItem, 
	Select, 
	TextField, 
	Typography 
} from "@mui/material";

const Funding = ({ data, updateData }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        updateData({ [name]: value });
    };

    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1">What is the source of funding for the trip?</Typography>
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                        <Select
                            value={data.fundingSource || ""}
                            onChange={(event) => handleChange(event)}
                            displayEmpty
                            name="fundingSource"
                            renderValue={(value) => value || "- Select -"}
                        >
                            <MenuItem value="" disabled><em>- Select -</em></MenuItem>
                            <MenuItem value="Class Budget">Class Budget</MenuItem>
                            <MenuItem value="School Funding">School Funding</MenuItem>
                            <MenuItem value="External Grant">External Grant</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="body1">What is the estimated cost per student?</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Amount"
                        value={data.costPerStudent || ""}
                        name="costPerStudent"
                        onChange={handleChange}
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
                        variant="outlined"
                        placeholder="Amount"
                        value={data.totalCost || ""}
                        name="totalCost"
                        onChange={handleChange}
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
