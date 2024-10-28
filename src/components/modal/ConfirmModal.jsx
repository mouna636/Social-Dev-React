import React from 'react';
import { Modal, Backdrop, Fade, Box, Typography, Button } from '@mui/material';

const ConfirmModal = ({
  open,
  handleClose,
  handleConfirm,
  title,
  description,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant='h6' component='h2' gutterBottom>
            {title}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleClose}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmModal;
