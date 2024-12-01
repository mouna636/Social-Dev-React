import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ImageIcon from "@mui/icons-material/Image";
import DateRangeIcon from "@mui/icons-material/DateRange";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const socket = io("http://localhost:8001");

const AddPost = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const { isAuthenticated, fullUser } = useAuth();

  const handleSendPost = () => {
    if (content.trim()) {
      socket.emit("message", { content, user: fullUser });
      setContent("");
      setIsOpen(false);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <Tooltip
          sx={{ position: "fixed", bottom: "22px", left: "22px" }}
          title="Add Post"
        >
          <Fab onClick={() => setIsOpen(true)} color="primary">
            <AddIcon />
          </Fab>
        </Tooltip>
      )}

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "22px",
            borderRadius: "6px",
            position: "fixed",
            bgcolor: theme.palette.background.default,
            width: { xs: "97%", sm: 399 },
          }}
        >
          <Typography sx={{ textAlign: "center", mb: 1 }} variant="h6">
            Create a post
          </Typography>

          <Stack alignItems="center" direction="row">
            <Avatar
              sx={{ mr: "13px" }}
              src="https://i.pinimg.com/474x/1b/61/45/1b614533bde5ad1760664fd6c35dd895.jpg"
            />
            <Typography variant="body1">
              {fullUser.firstname + " " + fullUser.lastname}
            </Typography>
          </Stack>

          <TextField
            sx={{ width: "100%", mt: "22px" }}
            multiline
            rows={3}
            placeholder="What is in your mind ..."
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Stack direction={"row"} spacing={1} my={3}>
            <EmojiEmotionsIcon color="primary" />
            <ImageIcon color="secondary" />
            <VideoCameraBackIcon color="success" />
            <PersonAddIcon color="error" />
          </Stack>

          <ButtonGroup sx={{ width: "100%" }} variant="contained">
            <Button sx={{ flexGrow: 1 }} onClick={handleSendPost}>
              Post
            </Button>
            <Button>
              <DateRangeIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
};

export default AddPost;
