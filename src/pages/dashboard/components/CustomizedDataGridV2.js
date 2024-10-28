import * as React from 'react';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { createUser, updateUser } from '../../../services/userService';
import { useAuth } from '../../../context/AuthContext';

const roles = [
  { id: 1, name: 'super-admin' },
  { id: 2, name: 'admin' },
  { id: 3, name: 'user' },
];

export default function CustomizedDataGrid({ initialRows, onOpenDeleteModal }) {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  const { user } = useAuth();

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  React.useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const processRowUpdate = async (newRow) => {
    console.log('Updated Row:', newRow);

    try {
      const response = await updateUser(newRow);
      console.log('Updated User:', response);

      const updatedRow = { ...newRow };
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)),
      );
    } catch (error) {
      console.error('Error saving row:', error);
    }

    return newRow;
  };

  const handleDeleteClick = (id) => () => {
    const rowExists = rows.some((row) => row.id === id);
    if (!rowExists) {
      console.error(`No row with id #${id} found`);
      return;
    }
    const row = rows.find((row) => row.id === id);
    console.log(row);

    onOpenDeleteModal(row);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: true },
    { field: 'username', headerName: 'Username', width: 150, editable: true },
    {
      field: 'firstname',
      headerName: 'First Name',
      width: 150,
      editable: true,
    },
    { field: 'lastname', headerName: 'Last Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      type: 'singleSelect',
      editable: user?.role?.name === 'super-admin',

      valueOptions: roles.map((item) => item.name),

      valueGetter: (params) => {
        return params.name || params;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',

      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
