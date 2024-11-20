import React, { useState } from "react";
import { 
	Autocomplete,
    Box,
    Button,
    Dialog,
	DialogTitle,
	DialogContent,
	DialogActions, 
	Grid, 
	IconButton,
	Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, 
    TextField,
	Typography,
} from "@mui/material";
import { 
	AddCircle as AddCircleIcon
} from "@mui/icons-material";

const AdultRoster = ({ data, updateData }) => {
    // dummy teacher data for autocomplete
    const teachers = [
        { name: "Mr. Mike Smith", position: "Teacher", phone: "(404) 903-2814", email: "mr.smith@school.edu" },
        { name: "Mrs. Patricia Jones", position: "Teacher", phone: "(678) 176-0234", email: "mrs.jones@school.edu" },
        { name: "Ms. Sharon Johnson", position: "Teacher", phone: "(470) 878-5715", email: "ms.johnson@school.edu" },
    ]

    // combined dialog states for staff, chaperone, and dropdown
    const [dialogStates, setDialogStates] = useState({
        staff: false,
        chaperone: false,
        dropdown: false
    });

    // combined form data for both staff and chaperone forms
    const [formData, setFormData] = useState({
        staff: {
            name: "",
            position: "",
            phone: "",
            email: ""
        },
        chaperone: {
            name: "",
            phone: "",
            email: ""
        }
    });

    // dialog open handler
    const handleOpenDialog = (type) => setDialogStates(prev => ({ ...prev, [type]: true }));

    // dialog close handler with form reset
    const handleCloseDialog = (type) => {
        setDialogStates(prev => ({ ...prev, [type]: false }));
        setFormData(prev => ({
            ...prev,
            [type]: type === 'staff' 
                ? { name: "", position: "", phone: "", email: "" }
                : { name: "", phone: "", email: "" }
        }));
    };

    // input change handler with phone number formatting
    const handleInputChange = (type, event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [name]: name === 'phone' ? formatPhoneNumber(value) : value
            }
        }));
    };

    // form submit handler
    const handleSubmit = (type) => {
        const key = type === 'staff' ? 'staff' : 'chaperones';
        const updatedData = [...(data[key] || []), formData[type]];
        updateData({ [key]: updatedData });
        handleCloseDialog(type);
    };

    // phone number formatting
    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/\D/g, '');
        
        if (phoneNumber.length <= 3) {
            return phoneNumber;
        } else if (phoneNumber.length <= 6) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        } else if (phoneNumber.length <= 10) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
        } else {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        }
    };

    // handler for teacher autocomplete selection
    const handleTeacherSelect = (event, value) => {
        if (value) {
            setFormData(prev => ({
                ...prev,
                staff: {
                    name: value.name,
                    position: value.position,
                    phone: value.phone,
                    email: value.email
                }
            }));
            setDialogStates(prev => ({ ...prev, dropdown: false }));
        }
    };

    // helper function to render table headers
    const renderTableHeaders = (headers) => (
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            {headers.map((header, index) => (
                <TableCell key={index}>
                    <Typography fontWeight="bold">{header}</Typography>
                </TableCell>
            ))}
        </TableRow>
    );

    // helper function to render add buttons
    const renderAddButton = (type, label) => (
        <Box display="flex" alignItems="center">
            <IconButton color="error" onClick={() => handleOpenDialog(type)}>
                <AddCircleIcon />
            </IconButton>
            <Typography ml={1}>{label}</Typography>
        </Box>
    );

    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                {/* Staff Table Section */}
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold">Staff</Typography>
                    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2, mb: 2 }}>
                        <Table>
                            <TableHead>
                                {renderTableHeaders(['Name', 'Position', 'Phone', 'Email'])}
                            </TableHead>
                            <TableBody>
                                {data.staff?.map((staff, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{staff.name}</TableCell>
                                        <TableCell>{staff.position}</TableCell>
                                        <TableCell>{staff.phone}</TableCell>
                                        <TableCell>{staff.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {renderAddButton('staff', 'Add staff members')}
                </Grid>

                {/* Chaperone Table Section */}
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold">Non-Staff Chaperones</Typography>
                    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2, mb: 2 }}>
                        <Table>
                            <TableHead>
                                {renderTableHeaders(['Name', 'Phone', 'Email'])}
                            </TableHead>
                            <TableBody>
                                {data.chaperones?.map((chaperone, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{chaperone.name}</TableCell>
                                        <TableCell>{chaperone.phone}</TableCell>
                                        <TableCell>{chaperone.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {renderAddButton('chaperone', 'Add chaperones')}
                </Grid>
            </Grid>

            {/* Staff Dialog */}
            <Dialog open={dialogStates.staff} onClose={() => handleCloseDialog('staff')} fullWidth>
                <DialogTitle>Add Staff Member</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }} display="flex" flexDirection="column" gap={2}>
                        {/* Teacher Autocomplete */}
                        <Autocomplete
                            options={teachers}
                            getOptionLabel={(option) => option.name}
                            onChange={handleTeacherSelect}
                            freeSolo
                            autoSelect
                            blurOnSelect
                            open={formData.staff.name.length > 0 && dialogStates.dropdown}
                            onInputChange={(event, value) => {
                                handleInputChange('staff', { target: { name: 'name', value } });
                                setDialogStates(prev => ({ ...prev, dropdown: true }));
                            }}
                            filterOptions={(options, { inputValue }) => 
                                options.filter(option => 
                                    option.name.toLowerCase().includes(inputValue.toLowerCase())
                                )
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.staff.name}
                                    onChange={(e) => {
                                        handleInputChange('staff', e);
                                        setDialogStates(prev => ({ ...prev, dropdown: true }));
                                    }}
                                    required
                                />
                            )}
                        />
                        {/* Staff Form Fields */}
                        {['position', 'phone', 'email'].map((field) => (
                            <TextField
                                key={field}
                                fullWidth
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                name={field}
                                type={field === 'email' ? 'email' : 'text'}
                                value={formData.staff[field]}
                                onChange={(e) => handleInputChange('staff', e)}
                                required
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog('staff')}>Cancel</Button>
                    <Button 
                        onClick={() => handleSubmit('staff')} 
                        variant="contained" 
                        color="primary"
                        disabled={!Object.values(formData.staff).every(Boolean)}
                    >
                        Add Staff Member
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Chaperone Dialog */}
            <Dialog open={dialogStates.chaperone} onClose={() => handleCloseDialog('chaperone')} fullWidth>
                <DialogTitle>Add Chaperone</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }} display="flex" flexDirection="column" gap={2}>
                        {/* Chaperone Form Fields */}
                        {['name', 'phone', 'email'].map((field) => (
                            <TextField
                                key={field}
                                fullWidth
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                name={field}
                                type={field === 'email' ? 'email' : 'text'}
                                value={formData.chaperone[field]}
                                onChange={(e) => handleInputChange('chaperone', e)}
                                required
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog('chaperone')}>Cancel</Button>
                    <Button 
                        onClick={() => handleSubmit('chaperone')} 
                        variant="contained"
                        disabled={!Object.values(formData.chaperone).every(Boolean)}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdultRoster;
