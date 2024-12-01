import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  connectUser,
  getConnections,
  getPendingConnections,
  getUserById,
  updateUser,
} from "../../services/userService";

import { deleteExperience } from "../../services/experienceService";
import ExperienceModal from "../modal/ExperienceModal";
import ConfirmModal from "../modal/ConfirmModal";
import ExperienceTimeline from "./ExperienceTimeline";
import {
  updateExperience,
  getExperiencesByUser,
} from "../../services/experienceService";
import AppBarr from "../AppBar";

import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "../modal/EditProfileModal";
import ChangePasswordModal from "../modal/ChangePassword";
import ConnectionListModal from "../modal/ConnectionListModal";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [experiences, setExperiences] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [connectionsList, setConnectionsList] = useState([]);
  const [openConnections, setOpenConnections] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const authUser = useAuth().user;

  const { fullUser, sendFriendRequest } = useAuth();
  const navigate = useNavigate();

  const openAddModal = () => {
    setCurrentExperience(null);
    setModalOpen(true);
  };
  const openEditModal = (id) => {
    const experience = experiences.find((exp) => exp.id === id);
    setCurrentExperience(experience);
    setModalOpen(true);
  };

  const openDeleteModal = (id) => {
    const experience = experiences.find((exp) => exp.id === id);
    setCurrentExperience(experience);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const closeEditModal = (id) => {
    setCurrentExperience({});
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const [isPending, setIsPending] = useState(false);
  const getPendingConn = async () => {
    try {
      const connections = await getPendingConnections(id);
      console.log("conn:", connections);

      if (connections.some((u) => u.sender.id === fullUser.id))
        setIsPending(true);
      // if()
    } catch (error) {
      console.log("Error fetching connections:", error);
    }
  };

  const handleDeleteExperience = async () => {
    const experience = currentExperience;
    if (experience) {
      try {
        console.log("deleting experience " + experience.id);

        await deleteExperience(experience.id);
        const updatedExperiences = experiences.filter(
          (exp) => exp.id !== experience.id
        );
        setExperiences(updatedExperiences);
        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
    }
  };
  const getUserConnections = async () => {
    try {
      const connections = await getConnections(fullUser.id);
      setConnectionsList(connections);
    } catch (error) {
      console.log("Error fetching connections:", error);
    }
  };

  const handleSaveExperience = async (experience) => {
    if (experience) {
      setExperiences((prevExperiences) => [...prevExperiences, experience]);
      try {
        const updatedUser = {
          ...user,
          experiences: [...experiences, experience],
        };
        console.log(updatedUser);

        await updateUser(updatedUser);
        closeEditModal();
      } catch (e) {
        console.error("Error updating user:", e);
      }
      console.log(experience);

      // handleCloseModal();
    }
  };

  const handleEditExperience = async (experience) => {
    console.log(experience);

    if (experience) {
      try {
        const { currentlyWorking, ...rest } = experience;
        await updateExperience(rest);
        const updatedExperiences = experiences.map((exp) =>
          exp.id === experience.id ? experience : exp
        );
        setExperiences(updatedExperiences);
        closeEditModal();
      } catch (e) {
        console.error("Error updating Experience:", e);
      }
      console.log(experience);

      // handleCloseModal();
    }
  };

  const connect = () => {
    try {
      connectUser(user.id, {
        senderId: fullUser.id,
        receiverId: user.id,
      });
      sendFriendRequest(user.id);
    } catch (error) {
      console.log("Error connecting user:", error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await getUserById(id);
        console.log(resp.data);
        if (!resp.data) navigate("/");

        setUser(resp.data);

        setIsCurrentUser(authUser.username === resp.data.username);
      } catch (e) {
        console.error("Error fetching user:", e);
      }
    };
    const getExperiences = async () => {
      try {
        const resp = await getExperiencesByUser(id);
        console.log(resp);

        setExperiences(resp);
      } catch (e) {
        console.error("Error fetching experiences:", e);
      }
    };
    getUser();
    getExperiences();
    getUserConnections();
    getPendingConn();
    console.log(isCurrentUser);
  }, [id, authUser.username, navigate, isCurrentUser]);

  const userx = {
    name: "John Doe",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    connections: "500+ connections",
    profilePic: "https://via.placeholder.com/150",
    backgroundImg: "https://via.placeholder.com/800x200",
    summary: `Experienced developer with a strong background in full stack development. Passionate about building scalable web applications and learning new technologies.`,
    experience: [
      {
        title: "Senior Developer",
        company: "Tech Corp",
        duration: "Jan 2020 - Present",
        description:
          "Leading a team of developers to build scalable solutions for e-commerce businesses.",
      },
      {
        title: "Junior Developer",
        company: "Web Solutions",
        duration: "Jan 2018 - Dec 2019",
        description:
          "Developed web applications for various clients using React and Node.js.",
      },
    ],
  };
  const [showList, setshowList] = useState("none");

  return (
    <Box>
      <AppBarr showList={showList} setshowList={setshowList} />
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box>
          <img
            src={userx.backgroundImg}
            alt="background"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Avatar
            src={userx.profilePic}
            alt={userx.name}
            sx={{
              width: 120,
              height: 120,
              marginTop: "-60px",
              border: "3px solid white",
              marginLeft: "20px",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "16px",
                marginLeft: "20px",
              }}
            >
              <Typography variant="h5">
                {user?.firstname + " " + user?.lastname}
              </Typography>
              <Typography color="text.secondary">{userx.jobTitle}</Typography>
              <Typography color="text.secondary">
                {user?.state + ", " + user?.country}
              </Typography>
              <Typography
                color="text.secondary"
                component={Link}
                onClick={() => setOpenConnections(true)}
              >
                {connectionsList.length} connections
              </Typography>

              {!isCurrentUser &&
                (fullUser.connections.some((u) => u.id === user.id) ? (
                  <Button variant="outlined" sx={{ mt: 1 }}>
                    Friends
                  </Button>
                ) : isPending ? (
                  <Button variant="outlined" disabled sx={{ mt: 1 }}>
                    Pending
                  </Button>
                ) : (
                  <Button variant="outlined" sx={{ mt: 1 }} onClick={connect}>
                    Connect
                  </Button>
                ))}
            </Box>
            {isCurrentUser && (
              <Box sx={{ marginRight: "20px" }}>
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  onClick={() => setProfileModalOpen(true)}
                >
                  Edit Account
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  onClick={() => setPasswordModalOpen(true)}
                >
                  Change Password
                </Button>
                <EditProfileModal
                  open={profileModalOpen}
                  user={user}
                  onClose={() => setProfileModalOpen(false)}
                />
              </Box>
            )}
          </Box>
        </Box>

        {/* Summary Section */}
        <Paper sx={{ padding: 2, marginTop: 3 }}>
          <Typography variant="h6">About</Typography>
          <Typography color="text.secondary">{user?.about}</Typography>
        </Paper>

        {/* Experience Section */}
        <Paper sx={{ padding: 2, marginTop: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography variant="h6">Experience</Typography>
            {isCurrentUser && (
              <Button
                variant="contained"
                color="primary"
                onClick={openAddModal}
              >
                Add Experience
              </Button>
            )}
          </Box>
          {isCurrentUser && (
            <>
              <ExperienceModal
                open={modalOpen}
                onClose={handleCloseModal}
                onAdd={handleSaveExperience}
                onEdit={handleEditExperience}
                experience={currentExperience}
              />

              <ConfirmModal
                open={deleteModalOpen}
                description={"Are you sure you want to delete this experience?"}
                title={"DELETE"}
                handleClose={closeDeleteModal}
                handleConfirm={handleDeleteExperience}
              />

              <ChangePasswordModal
                open={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                user={user}
                authUser={fullUser}
              />

              <ConnectionListModal
                open={openConnections}
                handleClose={() => setOpenConnections(false)}
                connections={connectionsList}
              />
            </>
          )}

          <ExperienceTimeline
            experiences={experiences}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            isCurrentUser={isCurrentUser}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
