import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card as MuiCard,
  CircularProgress,
  MenuItem,
  Select,
  Grid,
  TextareaAutosize,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GetCountries, GetState, StateSelect } from 'react-country-state-city';

// Styled Card Component
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '600px',
  },
}));

export default function SignUp() {
  const { register } = useAuth();
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true); // Loading state for countries
  const [loadingStates, setLoadingStates] = useState(false); // Loading state for states

  const formik = useFormik({
    initialValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      country: '',
      countryid: '',
      state: '',
      stateid: '',
      jobTitle: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);

      register(values);
    },
  });

  useEffect(() => {
    setLoadingCountries(true);
    GetCountries()
      .then((result) => {
        setCountriesList(result);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      })
      .finally(() => {
        setLoadingCountries(false);
      });
  }, []);

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    formik.setFieldValue('country', countriesList[countryId].name);
    formik.setFieldValue('countryid', countryId);

    setLoadingStates(true);

    GetState(countryId)
      .then((result) => {
        setStateList(result);
        formik.setFieldValue('state', '');
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
      })
      .finally(() => {
        setLoadingStates(false);
      });
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;

    const selectedState = stateList.find((state) => state.id === stateId);
    formik.setFieldValue('state', selectedState ? selectedState.name : '');

    formik.setFieldValue('stateid', stateId);
  };

  return (
    <Card variant='outlined'>
      <Typography
        component='h1'
        variant='h4'
        sx={{
          width: '100%',
          fontSize: 'clamp(2rem, 10vw, 2.15rem)',
          textAlign: 'center',
        }}
      >
        Sign up
      </Typography>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <TextField
                id='username'
                name='username'
                placeholder='Username'
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor='firstname'>First name</FormLabel>
              <TextField
                id='firstname'
                name='firstname'
                placeholder='firstname'
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor='lastname'>Last name</FormLabel>
              <TextField
                id='lastname'
                name='lastname'
                placeholder='lastname'
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                id='email'
                name='email'
                type='email'
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor='jobTitle'>Job Title</FormLabel>
              <TextField
                id='jobTitle'
                name='jobTitle'
                placeholder='Job Title'
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor='countryid'>Country</FormLabel>
              <Select
                id='countryid'
                name='countryid'
                value={formik.values.countryid}
                onChange={handleCountryChange}
              >
                {countriesList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {loadingCountries && <CircularProgress size={24} />}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor='stateid'>State</FormLabel>
              <Select
                id='stateid'
                name='stateid'
                value={formik.values.stateid}
                onChange={handleStateChange}
              >
                {stateList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {loadingStates && <CircularProgress size={24} />}
            </FormControl>
          </Grid>
        </Grid>

        <Button type='submit' fullWidth variant='contained'>
          Sign Up
        </Button>

        <Typography sx={{ textAlign: 'center' }}>
          Have an account?{' '}
          <Link to='/login' variant='body2'>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
