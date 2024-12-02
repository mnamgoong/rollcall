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
                
                <Grid item xs={12}>
                    <Grid container justifyContent="flex-start" spacing={2}>
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
                        <Grid item xs>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            checked={data.other} 
                                            onChange={handleChange} 
                                            name="other" 
                                        />
                                    } 
                                    label="Other:"
                                    sx={{ mr: 1 }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <TextField 
                                        variant="outlined" 
                                        size="small" 
                                        value={data.otherMode} 
                                        onChange={handleChange} 
                                        name="otherMode" 
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body1">
                        Please list any necessary travel accommodations.
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
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
