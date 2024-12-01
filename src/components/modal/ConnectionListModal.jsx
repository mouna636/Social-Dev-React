import React from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { Person, PersonPinCircleOutlined } from "@mui/icons-material";

const ConnectionListModal = ({ open, handleClose, connections }) => {
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
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {connections.map((connection) => (
              <div key={connection.id}>
                <ListItem
                  key={connection.id}
                  alignItems="center"
                  sx={{ borderRadius: "8px", boxShadow: 1, mb: 2, p: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<strong>{connection.username}</strong>}
                    secondary={connection.email}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: "bold",
                        color: "primary.main",
                      },
                      "& .MuiListItemText-secondary": {
                        color: "text.secondary",
                      },
                    }}
                  />
                </ListItem>
                <Divider variant="inset" component="li" sx={{ mb: 1 }} />
              </div>
            ))}
          </List>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            {/* <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirm
            </Button> */}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConnectionListModal;
