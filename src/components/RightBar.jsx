import React from "react";
import { Box, Tooltip, Typography, Avatar } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const RightBar = () => {
  const { fullUser, activeUsers } = useAuth();

  const isUserOnline = (userId) => activeUsers.includes(userId);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        p: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: 400, // Limit the width for better UI
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: "#333",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Connections
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {fullUser?.connections?.map((user) => (
          <Box
            key={user.username}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1,
              borderRadius: 1,
              backgroundColor: "#fff",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Tooltip title={user.username}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                alt={user.username}
                src={`https://i.pravatar.cc/150?img=${Math.floor(
                  Math.random() * 70
                )}`}
              />
            </Tooltip>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: "#333",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {user.firstname} {user.lastname}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  marginRight: 3,
                  backgroundColor: isUserOnline(user.id)
                    ? "#4caf50"
                    : "#f44336",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Typography
        sx={{
          color: "#555",
          fontSize: "0.875rem",
          fontWeight: 500,
          textAlign: "center",
          mt: 3,
        }}
      >
        {`Active Connections: ${
          activeUsers.filter((u) => u !== fullUser.id)?.length
        }`}
      </Typography>
    </Box>
  );
};

export default RightBar;
