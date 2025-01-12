import React, { useState } from "react";
import { 
    Box, 
    Grid, 
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle
} from "@mui/material";
import { 
    Visibility as VisibilityIcon
} from "@mui/icons-material";

const Documents = ({ data }) => {
    const [previewFile, setPreviewFile] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    const handlePreviewClick = (file) => {
        setPreviewFile({ 
            url: file.data,
            type: file.type, 
            name: file.name 
        });
        setPreviewOpen(true);
    };

    const handleClosePreview = () => {
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
                            Uploaded Documents
                        </Typography>

                        {data?.uploadedFiles?.length > 0 ? (
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
                                                onClick={() => handlePreviewClick(file)}
                                                size="small"
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body1" color="textSecondary">
                                No documents uploaded
                            </Typography>
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
