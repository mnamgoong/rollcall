import React from "react"; 
import { 
	Box, 
	Grid, 
	TextField, 
	Checkbox, 
	FormControlLabel, 
	Typography 
} from "@mui/material";

const Transportation = ({ data }) => {
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
                            disabled
                            control={<Checkbox checked={data.walking} name="walking" />}
                            label="Walking"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            disabled
                            control={<Checkbox checked={data.car} name="car" />}
                            label="Car"
                        />
                    </Grid>
                    <Grid item>
						<FormControlLabel 
                            disabled
							control={<Checkbox checked={data.bus} name="bus" />} 
							label="Bus" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
                            disabled
							control={<Checkbox checked={data.charterBus} name="charterBus" />} 
							label="Charter Bus" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
                            disabled
							control={<Checkbox checked={data.train} name="train" />} 
							label="Train" 
						/>
					</Grid>
					<Grid item>
						<FormControlLabel 
                            disabled
							control={<Checkbox checked={data.plane} name="plane" />} 
							label="Plane" 
						/>
					</Grid>
                    <Grid item>
                        <FormControlLabel 
                            disabled
                            control={<Checkbox checked={Boolean(data.other)} name="other" />} 
                            label="Other:" />
                        <TextField variant="outlined" size="small" value={data.other} name="other" />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body1">
                        Please list any necessary travel accommodations.
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        disabled
                        rows={4}
                        variant="outlined"
                        value={data.accommodations}
                        name="accommodations"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Transportation;
