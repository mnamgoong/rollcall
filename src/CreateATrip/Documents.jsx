import {
    Box,
    Button,
    Container,
    Divider,
    Typography,
    Paper,
} from "@mui/material";
import React from "react";

export const Documents = () => {
    return (
        <Container maxWidth="md">
        <Box sx={{ p: 3 }}>
            <Box mt={4} display="flex" flexDirection="column" alignItems="center">
            <Paper
                variant="outlined"
                sx={{
                p: 3,
                width: "100%",
                textAlign: "center",
                borderStyle: "dashed",
                borderColor: "#6f6f6f",
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                Upload Required Documents
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Upload Documents
                </Button>
            </Paper>
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
                <Button variant="contained" color="error">
                    Submit
                </Button>
            </Box>
        </Box>
        </Container>
    );
};

export default Documents;