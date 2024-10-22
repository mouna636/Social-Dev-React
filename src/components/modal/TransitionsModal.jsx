import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Button,
  Fade,
  Modal as BaseModal,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from '../../utils/dayjs';

// Validation schema using yup
const validationSchema = yup.object({
  title: yup.string().required('Job Title is required'),
  company: yup.string().required('Company is required'),
  startDate: yup.date().required('Start Date is required'),
  endDate: yup.date().required('End Date is required'),
  description: yup.string().required('Description is required'),
});

export default function TransitionsModal({ open, onClose, onAdd }) {
  const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newExperience = { ...values };
      onAdd(newExperience);

      // formik.resetForm();
    },
  });

  const closeModal = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={onClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <ModalContent>
            <Typography variant='h6' id='transition-modal-title'>
              Add Experience
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label='Job Title'
                name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin='normal'
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                label='Company'
                name='company'
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin='normal'
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
              />
              <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                <DatePicker
                  label='Start Date'
                  value={dayjs(formik.values.startDate)}
                  onChange={(date) =>
                    formik.setFieldValue(
                      'startDate',
                      dayjs(date).format('YYYY-MM-DD'),
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name='startDate'
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin='normal'
                      error={
                        formik.touched.startDate &&
                        Boolean(formik.errors.startDate)
                      }
                      helperText={
                        formik.touched.startDate && formik.errors.startDate
                      }
                    />
                  )}
                />
              </Box>
              <Box sx={{ marginBottom: 1 }}>
                <DatePicker
                  label='End Date'
                  value={dayjs(formik.values.endDate)}
                  onChange={(date) =>
                    formik.setFieldValue(
                      'endDate',
                      dayjs(date).format('YYYY-MM-DD'),
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name='endDate'
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin='normal'
                      error={
                        formik.touched.endDate && Boolean(formik.errors.endDate)
                      }
                      helperText={
                        formik.touched.endDate && formik.errors.endDate
                      }
                    />
                  )}
                />
              </Box>
              <TextField
                label='Description'
                name='description'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin='normal'
                multiline
                rows={4}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{ marginTop: 2 }}
              >
                Add Experience
              </Button>
              <Button onClick={closeModal} sx={{ marginTop: 2, marginLeft: 2 }}>
                Close
              </Button>
            </form>
          </ModalContent>
        </Fade>
      </Modal>
    </LocalizationProvider>
  );
}

TransitionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  `,
);
