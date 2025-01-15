import React, { useEffect, useState } from "react";
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
import { Amplify, Storage } from 'aws-amplify';

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
    const S3_BUCKET = "rollcall-uploaded-documents";
    const REGION = "us-east-1";
    
    // State variables
    const [previewFile, setPreviewFile] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileNames, setFileNames] = useState([]);
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        // Configure AWS
        AWS.config.update({
            region: REGION,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:f71ac820-df2b-4c61-834d-d448d9862479'
            })
        });
    }, []);

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        const newFileNames = newFiles.map(file => file.name);
        
        setFileNames(prevFileNames => [...prevFileNames, ...newFileNames]);
        setFilesToUpload(prevFiles => [...prevFiles, ...newFiles]);

        event.target.value = '';
    };

    const handleDeleteFile = (indexToDelete) => {
        setFileNames(prev => prev.filter((_, index) => index !== indexToDelete));
        setFilesToUpload(prev => prev.filter((_, index) => index !== indexToDelete));
    };

    const handlePreviewClick = (file) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreviewFile({ 
                url: fileUrl, 
                type: file.type, 
                name: file.name 
            });
            setPreviewOpen(true);
        }
    };

    const handleClosePreview = () => {
        if (previewFile?.url) {
            URL.revokeObjectURL(previewFile.url);
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

    const uploadFiles = async () => {
        const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        try {
            const uploadPromises = filesToUpload.map(async (file) => {
                const params = {
                    Bucket: S3_BUCKET,
                    Key: file.name,
                    Body: file,
                    ContentType: file.type,
                };

                const uploadResult = await s3.upload(params).promise();
                return {
                    name: file.name,
                    type: file.type,
                    url: uploadResult.Location // S3 URL of the uploaded file
                };
            });

            const newUploadedFiles = await Promise.all(uploadPromises);
            updateData({ uploadedFiles: [...data.uploadedFiles, ...newUploadedFiles] });
            
            setFilesToUpload([]);
            setSnackbarOpen(true);
            console.log('Upload successful');
        } catch (error) {
            console.error('Upload error:', error);
        }
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
                                                onClick={() => handlePreviewClick(filesToUpload[index])}
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
                        disabled={filesToUpload.length === 0}
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
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
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