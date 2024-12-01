import React from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Grid,
} from "@mui/material";
import { changePassword } from "../../services/userService";
import { useFormik } from "formik";
import * as Yup from "yup";

const ChangePasswordModal = ({ open, onClose, authUser }) => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      oldPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required"),
      oldPassword: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleConfirm();
    },
  });
  const [error, setError] = React.useState(null);
  const handleConfirm = async () => {
    console.log(authUser);

    if (authUser.id === undefined) return;
    try {
      console.log(authUser.id, formik.values);

      await changePassword(authUser.id, formik.values);
      console.log("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response.data.error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <form onSubmit={formik.onSubmit}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="newPassword">New Password</FormLabel>
                  <TextField
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    autoComplete="new-password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.newPassword &&
                      Boolean(formik.errors.newPassword)
                    }
                    helperText={
                      formik.touched.newPassword && formik.errors.newPassword
                    }
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                  <TextField
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    placeholder="Old Password"
                    value={formik.values.oldPassword}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.oldPassword &&
                      Boolean(formik.errors.oldPassword)
                    }
                    helperText={
                      formik.touched.oldPassword && formik.errors.oldPassword
                    }
                  />
                </FormControl>
              </Grid>
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <Box sx={{ mt: 5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirm}
                  sx={{ mr: 1 }}
                >
                  Confirm
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChangePasswordModal;
