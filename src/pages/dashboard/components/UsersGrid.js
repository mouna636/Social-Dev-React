import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';

import { getUsers } from '../../../services/userService';

export default function UsersGrid() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        console.log(userList);
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'firstname', headerName: 'First Name', width: 150 },
    { field: 'lastname', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      valueGetter: (params) => params.name,
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
          Details
        </Typography>
        <Grid container spacing={2} columns={12}>
          <CustomizedDataGrid columns={columns} rows={users} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
