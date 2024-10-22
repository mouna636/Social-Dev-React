import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Checkbox,
  IconButton,
  Modal,
  Snackbar,
  Tooltip,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ThumbDown,
  ThumbDownOffAlt,
  Comment,
  Add,
} from "@mui/icons-material";
import MessageInput from "./MessageInput";
import io from "socket.io-client";

const socket = io("http://localhost:8001");

const PostsDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    socket.on("posts", (newPosts) => {
      setPosts(newPosts);
    });

    socket.on("message", (newPost) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
    });

    socket.on("postLiked", (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    });

    socket.on("postDisliked", (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    });

    socket.on("commentAdded", (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      setSnackbarMessage("Commentaire ajouté !");
      setOpenSnackbar(true);
    });

  
    socket.emit("fetchPosts");

    return () => {
      socket.off("posts");
      socket.off("message");
      socket.off("postLiked");
      socket.off("postDisliked");
      socket.off("commentAdded");
    };
  }, []);

  const handleLike = (postId) => {
    socket.emit("likePost", postId);
  };

  const handleDislike = (postId) => {
    socket.emit("dislikePost", postId);
  };

  const handleCommentSubmit = (comment) => {
    socket.emit("addComment", { postId: currentPostId, content: comment });
    setIsOpen(false); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const toggleComments = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      {posts.map((post) => (
        <Card key={post.id} sx={{ maxWidth: { xs: "97%", sm: 444 }, mx: "auto", my: 2 }}>
          <CardContent>
            <Typography variant="body1">{post.content}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={post.liked}
                onClick={() => handleLike(post.id)}
                sx={{ "&:hover": { cursor: "pointer" } }}
              />
              <Typography variant="body2" sx={{ mr: 1 }}>{post.likes} Likes</Typography>

              <IconButton onClick={() => handleDislike(post.id)}>
                {post.disliked ? <ThumbDown sx={{ color: "blue" }} /> : <ThumbDownOffAlt />}
              </IconButton>
              <Typography variant="body2" sx={{ marginLeft: 0.5 }}>{post.dislikes} Dislikes</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <IconButton onClick={() => {
                  setCurrentPostId(post.id);
                  setIsOpen(true);
                }}>
                  <Add />
                </IconButton>
                <Typography variant="body2" sx={{ marginLeft: 0.5 }}>Commenter</Typography>
              </Box>

              <IconButton onClick={() => toggleComments(post.id)}>
                <Comment />
              </IconButton>
              <Tooltip title="Voir les commentaires">
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>
                  <Typography variant="body2" sx={{ display: 'inline', ml: 0.5 }}>
                    {post.comments ? post.comments.length : 0}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </CardActions>

          {expandedPostId === post.id && (
            <Box sx={{ mt: 2, ml: 2 }}>
              {post.comments && post.comments.map((comment, index) => (
                <Box key={index} sx={{
                  padding: 1,
                  marginBottom: 1,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#f9f9f9",
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {comment.author}:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.content}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Card>
      ))}

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setCurrentPostId(null);
        }}
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
            bgcolor: "background.paper",
            width: { xs: "97%", sm: 400 },
          }}
        >
          <Typography sx={{ textAlign: "center", mb: 2 }} variant="h6">
            Ajouter un commentaire
          </Typography>

          <MessageInput 
            onSubmit={handleCommentSubmit}
            onClose={() => setIsOpen(false)}
          />
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default PostsDisplay;
