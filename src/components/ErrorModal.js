import React from 'react';
import { Modal, Typography, Box, Button } from '@mui/material';

const ErrorModal = ({ open, handleClose, errorMessage }) => {
    return (
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="error-modal-title"
                aria-describedby="error-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '1px solid orange',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                        '&:hover': {
                            backgroundColor: 'black',
                            opacity: [0.9, 0.8, 0.95],
                            border: '1px solid white'
                        },
                    }}
                >
                    <Typography id="error-modal-title" variant="h4" component="h2" sx={{ color: '#ff0000' }}>
                        Error:
                    </Typography>
                    <Typography id="error-modal-description" sx={{ mt: 2, color: '#FFFFFF',whiteSpace: 'pre-line' }}>
                        {errorMessage}
                    </Typography>
                    <Button 
                        onClick={handleClose}
                        variant="contained" color="warning" size="large" type="submit"
                        sx={{ mt: 2  }} // Styling for the button
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
    );
};

export default ErrorModal;