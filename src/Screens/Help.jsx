import { 
    Box,
    Container, 
    Typography,
    TextField,
    Button,
    Stack
} from "@mui/material";

export const Help = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const mailtoLink = `mailto:rollcalltrips@gmail.com?subject=${encodeURIComponent(formData.get('subject'))}&body=${encodeURIComponent(
            `Name: ${formData.get('name')}\n` +
            `Email: ${formData.get('email')}\n\n` +
            `${formData.get('body')}`
        )}`;
        window.location.href = mailtoLink;
    };

    return (
        <Box display="flex" flexGrow={1} width="100%">
            <Container maxWidth="sm">
                <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            required
                            name="name"
                            label="Name"
                            fullWidth
                        />
                        <TextField
                            required
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            required
                            name="subject"
                            label="Subject"
                            fullWidth
                        />
                        <TextField
                            required
                            name="body"
                            label="Message"
                            multiline
                            rows={6}
                            fullWidth
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                        >
                            Send Message
                        </Button>
                    </Stack>
                </form>
            </Container>
        </Box>
    );
};

export default Help;
