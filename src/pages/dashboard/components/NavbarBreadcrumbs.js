import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Link, useLocation } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = React.useState([]);
  const location = useLocation();
  React.useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbItems = pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      return (
        <Link key={to} to={to}>
          <Typography
            variant='body1'
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        </Link>
      );
    });
    setBreadcrumbs(breadcrumbItems);
  }, [location]);
  return (
    <StyledBreadcrumbs
      aria-label='breadcrumb'
      separator={<NavigateNextRoundedIcon fontSize='small' />}
      className={breadcrumbsClasses.margin}
    >
      {breadcrumbs}
    </StyledBreadcrumbs>
  );
}
