import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGridV2';

import {
  getUsers,
  updateUser,
  deleteUser,
} from '../../../services/userService';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import { useState } from 'react';

export default function UsersGrid() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    description: '',
    handleConfirm: null,
  });

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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const openDeleteModal = (row) => {
    console.log('Row to delete:', row);

    setModalConfig({
      title: 'DELETE',
      description: `Are you sure you want to delete ${
        row.firstname + ' ' + row.lastname
      }?`,
      handleConfirm: () => handleUserDelete(row),
    });
    setOpenModal(true);
  };

  const handleUserDelete = async (row) => {
    try {
      const res = await deleteUser(row.id);
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== row.id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
        Overview
      </Typography>

      <ConfirmModal
        title={modalConfig.title}
        description={modalConfig.description}
        handleClose={handleCloseModal}
        handleConfirm={modalConfig.handleConfirm}
        open={openModal}
      />

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
          <CustomizedDataGrid
            initialRows={users}
            onOpenDeleteModal={openDeleteModal}
          />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
