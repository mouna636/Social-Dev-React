import * as React from "react";
import PropTypes from "prop-types";
import { styled, css, Grid } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Button,
  Fade,
  Modal as BaseModal,
  TextField,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "../../utils/dayjs";
import { useState } from "react";
import { GetCountries, GetState } from "react-country-state-city/dist/cjs";
import { getUserByUsername, updateUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
// Validation schema using yup
const validationSchema = yup.object({
  username: yup.string().required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
});

export default function EditProfileModal({ open, onClose, user }) {
  const initialValues = {
    username: user?.username || "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    country: user?.country || "",
    countryid: user?.countryid || "",
    state: user?.state || "",
    stateid: user?.stateid || "",
    jobTitle: user?.jobTitle || "",
  };

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const currentUser = useAuth().user;
  const [errors, setErrors] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      updateUserProfile(values);
      //   closeModal();
    },
  });
  const updateUserProfile = async (values) => {
    try {
      // Update user profile
      await updateUser(values);
      console.log("User profile updated successfully");
    } catch (error) {
      console.warn(error.response.data.error);

      console.error("Error updating user profile:", error);
      setErrors(error.response.data.error || "An error occurred");
    }
  };

  React.useEffect(() => {
    if (errors) {
      console.error("Errors:", errors);
    }
  }, [errors]);

  const closeModal = () => {
    onClose();
    formik.resetForm();
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;

    formik.setFieldValue("countryid", countryId);

    GetState(countryId)
      .then((result) => {
        console.log(countryId);

        console.log("States fetched:", result);
        setStateList(result);

        if (user?.stateid) {
          const matchingState = result.find(
            (state) => state.name === user.state
          );
          console.log("Matching state:", matchingState);

          formik.setFieldValue("stateid", matchingState?.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  };

  React.useEffect(() => {
    if (open) {
      GetCountries()
        .then((result) => {
          setCountriesList(result);
          console.log(result);
          if (result) {
            const userCountry = result.find(
              (country) => country.id == user.countryid
            );
            if (userCountry) {
              GetState(userCountry.id).then((result) => {
                setStateList(result);
              });
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
        });
    }
  }, [open]);

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    console.log("State changed to:", stateId);
    const selectedState = stateList.find((state) => state.id === stateId);
    formik.setFieldValue("state", selectedState ? selectedState.name : "");

    formik.setFieldValue("stateid", stateId);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <ModalContent>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  {/* Username */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <TextField
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                      />
                    </FormControl>
                  </Grid>

                  {/* First name */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="firstname">First name</FormLabel>
                      <TextField
                        id="firstname"
                        name="firstname"
                        placeholder="First name"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.firstname &&
                          Boolean(formik.errors.firstname)
                        }
                        helperText={
                          formik.touched.firstname && formik.errors.firstname
                        }
                      />
                    </FormControl>
                  </Grid>

                  {/* Last name */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="lastname">Last name</FormLabel>
                      <TextField
                        id="lastname"
                        name="lastname"
                        placeholder="Last name"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.lastname &&
                          Boolean(formik.errors.lastname)
                        }
                        helperText={
                          formik.touched.lastname && formik.errors.lastname
                        }
                      />
                    </FormControl>
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <TextField
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </FormControl>
                  </Grid>

                  {/* Job Title */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
                      <TextField
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Job Title"
                        value={formik.values.jobTitle}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>

                  {/* Country */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="countryid">Country</FormLabel>
                      <Select
                        id="countryid"
                        name="countryid"
                        value={String(formik.values.countryid)}
                        onChange={handleCountryChange}
                      >
                        {countriesList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* State */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="stateid">State</FormLabel>
                      <Select
                        id="stateid"
                        name="stateid"
                        value={String(formik.values.stateid)}
                        onChange={handleStateChange}
                      >
                        {stateList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Typography variant="body2" color="textSecondary">
                    {typeof errors === "string" ? errors : ""}
                  </Typography>
                </Grid>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Edit Account
                </Button>{" "}
                <Button onClick={closeModal} sx={{ marginLeft: 2 }}>
                  Close
                </Button>
              </Box>
            </form>
          </ModalContent>
        </Fade>
      </Modal>
    </LocalizationProvider>
  );
}

// EditProfileModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  `
);
