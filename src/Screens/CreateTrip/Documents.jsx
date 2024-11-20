import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { 
    Box, 
    Button, 
    Dialog,
    DialogContent,
    DialogTitle,
    Grid, 
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from "@mui/material";
import { 
    DriveFolderUpload as DriveFolderUploadIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from "@mui/icons-material";

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

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        const currentFiles = data.uploadedFiles || [];
        updateData({ uploadedFiles: [...currentFiles, ...newFiles] });
    };

    const handleDeleteFile = (indexToDelete) => {
        const updatedFiles = (data.uploadedFiles || []).filter((_, index) => index !== indexToDelete);
        updateData({ uploadedFiles: updatedFiles });
    };

    const handlePreviewClick = (file) => {
        const fileUrl = URL.createObjectURL(file);
        setPreviewFile({ url: fileUrl, type: file.type, name: file.name });
        setPreviewOpen(true);
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

                        {data.uploadedFiles?.length > 0 && (
                            <List sx={{ mt: 2, width: '100%', py: 0 }}>
                                {data.uploadedFiles.map((file, index) => (
                                    <ListItem 
                                        key={index}
                                        sx={{ 
                                            py: 0.5,
                                            borderBottom: index !== data.uploadedFiles.length - 1 ? '1px solid #eee' : 'none'
                                        }}
                                    >
                                        <ListItemText 
                                            primary={file.name}
                                            secondary={`${(file.size / 1024).toFixed(2)} KB`}
                                            sx={{ my: 0 }}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton 
                                                edge="end" 
                                                aria-label="preview"
                                                onClick={() => handlePreviewClick(file, index)}
                                                sx={{ mr: 1 }}
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
        </Box>
    );
};

export default Documents;
