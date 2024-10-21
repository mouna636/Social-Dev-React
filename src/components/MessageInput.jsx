
import React, { useState } from "react";
import { TextField, Button, Stack, Avatar, Typography } from "@mui/material";

const MessageInput = ({ onSubmit, onClose }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onSubmit(commentText); 
      setCommentText(''); 
      onClose(); 
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center">
        <Avatar
          sx={{ mr: 2 }}
          src="https://i.pinimg.com/474x/1b/61/45/1b614533bde5ad1760664fd6c35dd895.jpg" 
        />
        <Typography variant="body1">Votre Nom</Typography>
      </Stack>

      <TextField
        sx={{ width: "100%" }}
        multiline
        rows={3}
        placeholder="Écrire un commentaire..."
        variant="outlined"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCommentSubmit}
      >
        Envoyer
      </Button>
    </Stack>
  );
};

export default MessageInput;
