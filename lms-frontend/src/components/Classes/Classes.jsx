import { Box, TextField, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
// import InputBase from "@mui/material/InputBase";

import axios from "axios";
import React, { useState, useEffect } from "react";

import { useTheme } from "@mui/material";

const Classes = () => {
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [alldata, setAllData] = useState([]);
  const [newClass, setNewClass] = useState({ class_name: "" });
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = localStorage.getItem("role") === "1";
  const role = isAdmin ? "admin" : "teacher";
  console.log("isAdmin ", isAdmin);

	const apiURL = "http://localhost:8000/api/classes/";

	const fetchallData = async () => {
		try {
			const response = await axios.get(apiURL);
			console.log(response.data);
			setAllData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchallData();
	}, []);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "classname",
      headerName: "Class Name",
      flex: 12,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.class_name,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.class_name || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                class_name: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.class_name}</div>
        ),
    },

    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <div>
            <IconButton
              onClick={() => {
                handleUpdate(
                  params.row.id,
                  "class_name",
                  selectedInfo.class_name
                );
                setIsUpdateMode(false);
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              variant="contained"
              onClick={() => setIsUpdateMode(false)}
            >
              <ClearOutlinedIcon />
            </IconButton>
          </div>
        ) : (
          <IconButton
            onClick={() => {
              setSelectedInfo(params.row);
              setIsUpdateMode(true);
            }}
          >
            <EditIcon />
          </IconButton>
        ),
    },

    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton onClick={() => deleteUser(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="CLASSES" subtitle="List of Classes" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Stack direction="column">
          <DataGrid
            rows={alldata}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            // rowsPerPageOptions={[5, 10, 25]}
            autoHeight
            disableSelectionOnClick
          />
          {role === "admin" && (
            <Button
              variant="contained"
              color="neutral"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Add new Class
            </Button>
          )}
        </Stack>

        <Box mt={2} display={isOpen ? "block" : "none"}>
          <TextField
            fullWidth
            label="New Class Name"
            variant="outlined"
            value={newClass.class_name}
            onChange={(e) =>
              setNewClass({ ...newClass, class_name: e.target.value })
            }
          />
          <Box sx={{ m: 1 }} />
          <Button variant="contained" color="neutral" onClick={addClass}>
            Add
          </Button>{" "}
          <Button
            variant="contained"
            color="neutral"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </Box>
        <Box sx={{ p: 3 }} />

        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Classes;
