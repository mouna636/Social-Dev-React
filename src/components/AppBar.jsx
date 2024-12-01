import React, { useRef, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  acceptConnection,
  acceptRequest,
  declineRequest,
  getPendingConnections,
  rejectRequest,
} from "../services/userService";
import { Cancel, CheckCircle } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const AppBarr = ({ showList, setshowList }) => {
  const refMenuMobile = useRef(null);
  const [showMobileMenu, setshowMobileMenu] = useState(false);
  const refFriendRequestsAnchor = useRef(null);

  const refMenuBiggerScreen = useRef(null);
  const [showBiggerScreenMenu, setshowBiggerScreenMenu] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false); // State to toggle friend requests list
  const {
    logout,
    fullUser,
    isAuthenticated,
    onAcceptRequest,
    newFriendRequest,
    setNewFriendRequest,
  } = useAuth();
  const [friendRequests, setFriendRequests] = useState([]);
  const navigate = useNavigate();

  const handleProfile = () => {
    console.log(fullUser.id);
    navigate("/profile/" + fullUser.id);
  };

  React.useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getPendingConnections(fullUser.id);
        setFriendRequests(res);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchRequests();
  }, [fullUser.id, newFriendRequest]);

  const renderMenu = isAuthenticated && (
    <Menu
      anchorEl={refMenuBiggerScreen.current}
      open={showBiggerScreenMenu}
      onClose={() => {
        setshowBiggerScreenMenu(false);
      }}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );
  const FriendRequestItem = ({ request }) => {
    return (
      <ListItem key={request.id} alignItems="center">
        {/* Displaying Avatar with Profile Image */}
        <ListItemAvatar>
          <Avatar
            alt={`${request.sender.firstname} ${request.sender.lastname}`}
            src={request.sender.profilePicture}
          />
        </ListItemAvatar>

        {/* Displaying the Sender's Name */}
        <ListItemText
          primary={`${request.sender.firstname} ${request.sender.lastname}`}
          secondary={request.sender.email} // Optional: you can display the email or other details
        />

        {/* Accept & Decline with Icons */}
        <IconButton
          color="success"
          size="small"
          aria-label="accept friend request"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          onClick={() => handleRequest(request, "accept")}
          title="Accept Friend Request"
        >
          <CheckCircle />
        </IconButton>

        <IconButton
          color="danger"
          size="small"
          aria-label="decline friend request"
          onClick={() => handleRequest(request, "decline")}
          title="Decline Friend Request"
        >
          <Cancel />
        </IconButton>
      </ListItem>
    );
  };

  const handleRequest = (request, action) => {
    switch (action) {
      case "accept":
        acceptRequest(request.id);
        alert("Friend request accepted successfully");
        setFriendRequests(
          friendRequests.filter((req) => req.id !== request.id)
        );
        setShowFriendRequests(false);
        onAcceptRequest(request);
        break;
      case "decline":
        rejectRequest(request.id);
        alert("Friend request declined successfully");
        setFriendRequests(
          friendRequests.filter((req) => req.id !== request.id)
        );
        setShowFriendRequests(false);
        break;
      default:
        console.error("Invalid action:", action);
    }
  };

  const handleFriendRequestsClick = () => {
    setShowFriendRequests(!showFriendRequests);
    if (newFriendRequest) {
      setNewFriendRequest(false);
    }
  };

  const renderFriendRequestsList = (
    <Menu
      anchorEl={refFriendRequestsAnchor.current}
      open={showFriendRequests}
      onClose={() => setShowFriendRequests(false)}
    >
      <List>
        {friendRequests?.map((request) => FriendRequestItem({ request }))}
      </List>
    </Menu>
  );

  const renderMobileMenu = isAuthenticated && (
    <Menu
      anchorEl={refMenuMobile.current}
      open={showMobileMenu}
      onClose={() => {
        setshowMobileMenu(false);
      }}
    >
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 4 friend requests"
          color="inherit"
          onClick={() => setShowFriendRequests(!showFriendRequests)}
        >
          <Badge badgeContent={4} color="error">
            <PersonAddIcon />
          </Badge>
        </IconButton>
        <p>Friend Requests</p>
        {showFriendRequests && (
          <div>
            <p>Friend Request 1</p>
            <p>Friend Request 2</p>
            <p>Friend Request 3</p>
          </div>
        )}
      </MenuItem> */}
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setshowMobileMenu(false);
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          onClick={() => {
            showList === "none" ? setshowList("block") : setshowList("none");
          }}
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          DevSphere
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {isAuthenticated && (
          <Box
            sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}
          >
            <IconButton
              ref={refFriendRequestsAnchor}
              sx={{ width: "37px", height: "37px" }}
              size="large"
              aria-label="show friend requests"
              color="inherit"
              onClick={handleFriendRequestsClick}
            >
              <Badge
                badgeContent={
                  newFriendRequest
                    ? friendRequests?.length + 1
                    : friendRequests?.length
                }
                color="error"
              >
                <PersonAddIcon />
              </Badge>
            </IconButton>

            <IconButton
              sx={{ width: "37px", height: "37px" }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              sx={{ width: "37px", height: "37px" }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              ref={refMenuBiggerScreen}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={() => {
                setshowBiggerScreenMenu(!showBiggerScreenMenu);
              }}
              color="inherit"
            >
              <Avatar
                sx={{ width: "37px", height: "37px" }}
                src="./imges/Ali Hassan.JPG"
              />
            </IconButton>
          </Box>
        )}

        {!isAuthenticated && (
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Box>
        )}

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            ref={refMenuMobile}
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            onClick={() => {
              setshowMobileMenu(!showMobileMenu);
            }}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {renderFriendRequestsList}

      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};

export default AppBarr;
