import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  //   const [open, setOpen] = React.useState(false);
  const { register } = useAuth();
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const formik = useFormik({
    initialValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      firstname: Yup.string().required('Required'),
      lastname: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Required'),
    }),

    onSubmit: (values) => {
      console.log('aa');

      console.log(values);

      register(values);
    },
  });
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction='column' justifyContent='space-between'>
        <ColorModeSelect
          sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
        />
        <Card variant='outlined'>
          {/* <SitemarkIcon /> */}
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component='form'
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <TextField
                id='username'
                type='text'
                name='username'
                placeholder='username'
                autoComplete='username'
                autoFocus
                required
                fullWidth
                variant='outlined'
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='username'>First name</FormLabel>
              <TextField
                id='firstname'
                type='text'
                name='firstname'
                placeholder='Firstname'
                autoComplete='firstname'
                autoFocus
                required
                fullWidth
                variant='outlined'
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='lastname'>Last name</FormLabel>
              <TextField
                id='lastname'
                type='text'
                name='lastname'
                placeholder='Lastname'
                autoComplete='lastname'
                required
                fullWidth
                variant='outlined'
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                id='email'
                type='email'
                name='email'
                placeholder='Email'
                autoComplete='email'
                required
                fullWidth
                variant='outlined'
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>

              <TextField
                name='password'
                placeholder='••••••'
                type='password'
                id='password'
                autoComplete='current-password'
                autoFocus
                required
                fullWidth
                variant='outlined'
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </FormControl>

            <Button type='submit' fullWidth variant='contained'>
              Sign up
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Have an account?
              <span>
                <Link to='/login' variant='body2' sx={{ alignSelf: 'center' }}>
                  Sign in
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
