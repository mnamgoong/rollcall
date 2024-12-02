import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { 
    Box, 
    Button, 
    Dialog,
    DialogContent,
    DialogTitle,
    Grid, 
    IconButton,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Snackbar,
    SnackbarContent
} from "@mui/material";
import { 
    CheckCircle as CheckCircleIcon,
    DriveFolderUpload as DriveFolderUploadIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from "@mui/icons-material";
import AWS from 'aws-sdk';

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const Documents = ({ data, updateData }) => {
    const [previewFile, setPreviewFile] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileNames, setFileNames] = useState([]);
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // AWS S3 configuration
    const S3_BUCKET = "rollcall-uploaded-documents";
    const REGION = "us-east-1";

    AWS.config.update({ 
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    }); // hidden keys in the .env file (.gitignore)

    const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        const newFileNames = newFiles.map(file => file.name);
        
        setFileNames(prevFileNames => [...prevFileNames, ...newFileNames]);
        setFilesToUpload(prevFiles => [...prevFiles, ...newFiles]);
    };

    const uploadFiles = async () => {
        const uploadPromises = filesToUpload.map(file => {
            const params = {
                Bucket: S3_BUCKET,
                Key: file.name,
                Body: file,
                ContentType: file.type,
            };

            return s3.upload(params).promise(); 
        });

        try {
            const uploadResults = await Promise.all(uploadPromises);

            const newUploadedFiles = uploadResults.map((result, index) => ({
                name: filesToUpload[index].name,
                type: filesToUpload[index].type,
                url: `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${filesToUpload[index].name}` // Construct the URL
            }));

            updateData({ uploadedFiles: [...data.uploadedFiles, ...newUploadedFiles] });
            setFilesToUpload([]); // Clear files to upload
            setSnackbarOpen(true); // Show success message
        } catch (error) {
            console.error("Error uploading files: ", error);
        }
    };

    const handleDeleteFile = (indexToDelete) => {
        const updatedFileNames = fileNames.filter((_, index) => index !== indexToDelete);
        const updatedFilesToUpload = filesToUpload.filter((_, index) => index !== indexToDelete);

        setFileNames(updatedFileNames);
        setFilesToUpload(updatedFilesToUpload);
    };

    const handlePreviewClick = (file) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file); // Create a URL for the file
            setPreviewFile({ 
                url: fileUrl, // Use the created URL
                type: file.type, 
                name: file.name 
            });
            setPreviewOpen(true);
        } else {
            console.error("File not found for preview");
        }
    };

    const handleClosePreview = () => {
        if (previewFile?.url) {
            URL.revokeObjectURL(previewFile.url); // Clean up the object URL
        }
        setPreviewFile(null);
        setPreviewOpen(false);
    };

    const renderPreview = () => {
        if (!previewFile) return null;

        if (previewFile.type.startsWith('image/')) {
            return <img src={previewFile.url} alt={previewFile.name} style={{ maxWidth: '100%', maxHeight: '80vh' }} />;
        }
        if (previewFile.type === 'application/pdf') {
            return (
                <iframe
                    src={previewFile.url}
                    title={previewFile.name}
                    width="100%"
                    height="500px"
                    style={{ border: 'none' }}
                />
            );
        }
        if (previewFile.type === 'text/plain') {
            return <iframe src={previewFile.url} title={previewFile.name} width="100%" height="500px" />;
        }
        return <Typography>Preview not available for this file type</Typography>;
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box display="flex" justifyContent="center" width="100%">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper
                        variant="outlined"
                        sx={{ p: 4, textAlign: "center", borderStyle: "dashed", borderColor: "#6f6f6f" }}
                    >
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Upload Documents
                        </Typography>
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<DriveFolderUploadIcon />}
                        >
                            Browse Files
                            <VisuallyHiddenInput
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </Button>

                        {fileNames.length > 0 && (
                            <List sx={{ mt: 2, width: '100%', py: 0 }}>
                                {fileNames.map((fileName, index) => (
                                    <ListItem 
                                        key={index}
                                        sx={{ 
                                            py: 0.5,
                                            borderBottom: index !== fileNames.length - 1 ? '1px solid #eee' : 'none'
                                        }}
                                    >
                                        <ListItemText 
                                            primary={fileName}
                                            sx={{ my: 0 }}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton 
                                                edge="end" 
                                                aria-label="preview"
                                                onClick={() => handlePreviewClick(filesToUpload[index])} // Pass the correct file object
                                                size="small"
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton 
                                                edge="end" 
                                                aria-label="delete"
                                                onClick={() => handleDeleteFile(index)}
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Paper>
                </Grid>
                
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={uploadFiles}
                    >
                        Save Files
                    </Button>
                </Grid>
            </Grid>

            <Dialog
                open={previewOpen}
                onClose={handleClosePreview}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    {previewFile?.name}
                </DialogTitle>
                <DialogContent>
                    {renderPreview()}
                </DialogContent>
            </Dialog>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={1000}
                onClose={handleSnackbarClose}
            >
                <SnackbarContent
                    message={
                        <Box display="flex" alignItems="center">
                            <CheckCircleIcon style={{ color: 'green', marginRight: 10 }} />
                            <Typography>Files successfully uploaded</Typography>
                        </Box>
                    }
                />
            </Snackbar>
        </Box>
    );
};

export default Documents;
