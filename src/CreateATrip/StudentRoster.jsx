import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

export const StudentRoster = () => {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box width="100%" maxWidth="md" p={3}>
        <Typography variant="body1" gutterBottom>
          Which class are you taking on the trip?
        </Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel>- Select -</InputLabel>
          <Select native label="- Select -">
            <option aria-label="None" value="" />
            <option value={10}>Class 1</option>
            <option value={20}>Class 2</option>
            <option value={30}>Class 3</option>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentRoster;
