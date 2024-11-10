import React from "react"; 
import { 
	Box, 
	Grid, 
	TextField, 
	Checkbox, 
	FormControlLabel, 
	Typography 
} from "@mui/material";

const Transportation = ({ data, updateData }) => {
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        updateData({ [name]: type === 'checkbox' ? checked : value });
    };

    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        What is the mode(s) of transportation for the trip?
                    </Typography>
                </Grid>
                
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={data.walking} onChange={handleChange} name="walking" />}
                            label="Walking"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={data.car} onChange={handleChange} name="car" />}
                            label="Car"
                        />
                    </Grid>
                    <Grid item>
						<FormControlLabel 
							control={<Checkbox checked={data.bus} onChange={handleChange} name="bus" />} 
							label="Bus" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
							control={<Checkbox checked={data.charterBus} onChange={handleChange} name="charterBus" />} 
							label="Charter Bus" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
							control={<Checkbox checked={data.train} onChange={handleChange} name="train" />} 
							label="Train" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
							control={<Checkbox checked={data.plane} onChange={handleChange} name="plane" />} 
							label="Plane" 
						/>
					</Grid>
                    <Grid item>
                        <FormControlLabel control={<Checkbox checked={Boolean(data.other)} onChange={handleChange} name="other" />} label="Other:" />
                        <TextField variant="outlined" size="small" value={data.other} onChange={handleChange} name="other" />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body1">
                        Please list any necessary travel accommodations.
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={data.accommodations}
                        onChange={handleChange}
                        name="accommodations"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Transportation;
