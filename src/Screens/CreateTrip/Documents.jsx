import React from "react";
import { styled } from '@mui/material/styles';
import {
    Box,
    Button,
    Grid,
    Typography,
    Paper
} from "@mui/material";
import {
    CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Documents = () => {
    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper
                        variant="outlined"
                        sx={{ p: 4, textAlign: "center", borderStyle: "dashed", borderColor: "#6f6f6f" }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Upload Required Documents
                        </Typography>
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center" mt={2} mb={6}>
					<Button variant="contained" color="error">
						SUBMIT
					</Button>
				</Grid>
            </Grid>
        </Box>
    );
};

export default Documents;