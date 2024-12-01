// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import io, { Socket } from "socket.io-client";
import axiosInstance from "../api/axiosInstance";
import { getUserByUsername } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [fullUser, setFullUser] = useState({});
  // New socket-related state
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [newFriendRequest, setNewFriendRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && fullUser.data) initializeSocket(fullUser.data);
  }, [isAuthenticated, fullUser]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await axiosInstance.get("/auth/profile");
        setUser(resp.data);

        const fullUserRes = await getUserByUsername(resp.data.username);
        console.log("Full user data:", fullUserRes.data);

        setFullUser(fullUserRes.data);

        // Initialize socket connection after authentication
        initializeSocket(fullUserRes.data);

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const initializeSocket = (userData) => {
    // Disconnect existing socket if any
    if (socket) {
      socket.disconnect();
    }

    // Create new socket connection
    const newSocket = io("http://localhost:8081");

    // Connect user to socket
    newSocket.on("connect", () => {
      console.log("Connected to socket server");

      newSocket.emit("connectUser", {
        userId: userData.id,
        connectedUsers: userData.connections.map((conn) => conn.id),
      });
    });

    // Listen for active users
    newSocket.on("activeUsers", (users) => {
      console.log("Active users:", users);
      const activeUserIds = users.map((user) => user.userId);
      setActiveUsers(activeUserIds);
    });

    newSocket.on("friendRequestAccepted", ({ senderId, receiverId }) => {
      alert("Your friend request was accepted!");
    });

    newSocket.on("friendRequestReceived", ({ senderId, receiverId }) => {
      // alert("You received a friend request");
      setNewFriendRequest(true);
    });

    newSocket.on("request_declined", () => {
      console.log("Request declined");
    });

    setSocket(newSocket);
  };
  const onAcceptRequest = (request) => {
    if (socket && fullUser) {
      console.log("Accepting request", {
        senderId: request.sender.id,
        receiverId: fullUser.id,
      });

      socket.emit("acceptRequest", {
        senderId: request.sender.id,
        receiverId: fullUser.id,
      });
    }
  };

  const sendFriendRequest = (receiverId) => {
    if (socket && fullUser) {
      console.log("Sending friend request", {
        senderId: fullUser.id,
        receiverId,
      });

      socket.emit("sendRequest", {
        senderId: fullUser.id,
        receiverId,
      });
    }
  };

  const login = async (credentials) => {
    try {
      const resp = await axiosInstance.post("/auth/login", credentials);

      // Fetch full user details after login
      const fullUserRes = await getUserByUsername(resp.data.username);
      setFullUser(fullUserRes.data);

      // Initialize socket connection
      initializeSocket(fullUserRes.data);

      setIsAuthenticated(true);
      navigate("/");
      return Promise.resolve();
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
      return Promise.reject(error);
    }
  };

  const logout = async () => {
    try {
      // Disconnect from socket before logout
      if (socket) {
        socket.emit("disconnect", fullUser.id);
        socket.disconnect();
        setSocket(null);
      }

      await axiosInstance.post("/auth/logout");

      setIsAuthenticated(false);
      setUser({});
      setFullUser({});
      setActiveUsers([]);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      setIsAuthenticated(false);
    }
  };

  // Update connections method
  const updateConnections = (newConnections) => {
    if (socket && fullUser) {
      socket.emit("updateConnections", {
        userId: fullUser.id,
        connectedUsers: newConnections.map((conn) => conn.id),
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        fullUser,
        login,
        logout,
        isLoading,
        socket,
        activeUsers,
        updateConnections,
        onAcceptRequest,
        sendFriendRequest,
        newFriendRequest,
        setNewFriendRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
