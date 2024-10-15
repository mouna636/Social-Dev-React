import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  // datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import { Outlet } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import styled from '@emotion/styled';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  // ...datePickersCustomizations,
  ...treeViewCustomizations,
};
const AuthContainer = styled(Stack)(({ theme }) => ({
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

export default function Dashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />

      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component='main'
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {/* <MainGrid /> */}
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
