import * as React from 'react';
import { DataGrid, GridCellModes, useGridApiContext } from '@mui/x-data-grid';
import { Button, Box, Select, MenuItem } from '@mui/material';
import RoleEnum from '../../../utils/RoleEnum';

const roles = [
  { id: 1, name: 'super-admin' },
  { id: 2, name: 'admin' },
  { id: 3, name: 'user' },
];

const RoleEditCell = (props) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select value={value || ''} onChange={handleChange} autoWidth>
      {roles.map((role, index) => (
        <MenuItem key={index} value={role.name}>
          {role.name}
        </MenuItem>
      ))}
    </Select>
  );
};

function EditToolbar(props) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
    props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === 'edit') {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        variant='outlined'
      >
        {cellMode === 'edit' ? 'Save' : 'Edit'}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === 'view'}
        variant='outlined'
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default function CustomizedDataGrid({
  rows,
  columns,
  handleRowUpdate,
  handleRowUpdateError,
  handleOpenModal,
}) {
  const [selectedCellParams, setSelectedCellParams] = React.useState(null);
  const [cellModesModel, setCellModesModel] = React.useState({});
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [originalRows, setOriginalRows] = React.useState(rows);

  const handleEditClick = () => {
    setIsEditMode(true);
    setOriginalRows(rows);
  };

  const handleSaveClick = () => {
    handleOpenModal();
    // setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setEditRowsModel({});
  };

  const processRowUpdate = (updatedRow, originalRow) => {
    handleRowUpdate(updatedRow, originalRow);
    return updatedRow;
  };

  const handleProcessRowUpdateError = (error) => {
    handleRowUpdateError(error);
  };

  const handleCellEditExit = (params, event) => {
    if (event.reason === 'escapeKeyDown' || event.reason === 'cellFocusOut') {
      const originalRow = originalRows.find((row) => row.id === params.id);
      if (originalRow) {
        setEditRowsModel((prev) => ({
          ...prev,
          [params.id]: {
            ...prev[params.id],
            [params.field]: { value: originalRow[params.field] },
          },
        }));
      }
    }
  };

  const handleCellFocus = React.useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === 'edit') {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode],
  );

  const handleCellEditStop = React.useCallback((params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  const updatedColumns = columns.map((column) => {
    if (column.field === 'role') {
      return {
        ...column,
        editable: isEditMode,
        renderEditCell: (params) => <RoleEditCell {...params} />,
      };
    }
    return {
      ...column,
      editable: isEditMode,
    };
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        {isEditMode ? (
          <>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveClick}
              sx={{ mr: 1 }}
            >
              Save
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button variant='contained' color='primary' onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </Box>
      <DataGrid
        autoHeight
        checkboxSelection
        rows={rows}
        columns={updatedColumns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density='compact'
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        editRowsModel={editRowsModel}
        onEditRowsModelChange={setEditRowsModel}
        onCellEditExit={handleCellEditExit}
        onCellKeyDown={handleCellKeyDown}
        onCellEditStop={handleCellEditStop}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            setSelectedCellParams,
            cellModesModel,
            setCellModesModel,
          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
      />
    </Box>
  );
}
