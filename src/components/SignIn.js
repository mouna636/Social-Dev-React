import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import MUILink from '@mui/material/Link';
import { Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useAuth } from '../context/AuthContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';

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

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn(props) {
  const { login } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string()
        .min(4, 'Password must be at least 4 characters long')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);

      login(values);
    },
  });
  return (
    <Card variant='outlined'>
      {/* <SitemarkIcon /> */}
      <Typography
        component='h1'
        variant='h4'
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
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
            // error={usernameError}
            // helperText={usernameErrorMessage}
            id='username'
            type='text'
            name='username'
            placeholder='username'
            autoComplete='username'
            autoFocus
            required
            fullWidth
            variant='outlined'
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Link
              component='button'
              type='button'
              onClick={handleClickOpen}
              variant='body2'
              sx={{ alignSelf: 'baseline' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            // error={passwordError}
            // helperText={passwordErrorMessage}
            name='password'
            placeholder='••••••'
            type='password'
            id='password'
            autoComplete='current-password'
            autoFocus
            required
            fullWidth
            variant='outlined'
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          // onClick={validateInputs}
        >
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <MUILink
              component={Link}
              to='/register'
              variant='body2'
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </MUILink>
          </span>
        </Typography>
      </Box>
      {/* <Divider>or</Divider> */}
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
          </Box> */}
    </Card>
  );
}
