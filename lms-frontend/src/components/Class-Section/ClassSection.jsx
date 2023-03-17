import { Box, TextField, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
// import InputBase from "@mui/material/InputBase";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { useTheme } from "@mui/material";
import Loader from "../Home/Loader/Loader";

const ClassSection = () => {
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [alldata, setAllData] = useState([]);
  const [newData, setNewData] = useState({
    class_id: "",
    section_id: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const apiURL = "http://localhost:8000/api/classsections";

  const fetchallData = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch data ",response.data);
      setAllData(response.data);
      setIsLoading(false);


    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }
  };

  //conditional adding ,,, if same class id check different section id
  
      // if ((newData.class_id === allData.class_id) && (newData.section_id === allData.section_id)){
      //   toast.error("The provided class already has this section id, add a new section", { autoClose: 2000 })
      // };

const addClass = async () => {
  try {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    await axios.post(
      apiURL,
      { class_id: newData.class_id, section_id: newData.section_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Added Successfully", { autoClose: 2000 });
    fetchallData();
    setNewData({ class_id: "", section_id: "" });
    setIsLoading(false);

  } catch (error) {
    console.error(error);
    setIsLoading(false);
    toast.error("Add Failed", { autoClose: 2000 });
   

  }
};




  //

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    axios.delete(`http://localhost:8000/api/classsections/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Deleted Successfully", 2000);
    fetchallData();
    setIsLoading(false);

  };

  const handleUpdate = async (id, field, value) => {
    const updatedData = alldata.map((row) => {
      if (row.id === id) {
        console.log("row ",row)
        return { ...row, [field]: value };
      }
      return row;
    });

    console.log("updated data ",updatedData)
    // setAllData(updatedData);
    // setIsUpdateMode(false);
    // setSelectedInfo({});
    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${apiURL}/${id}`,
        {
          class_id: selectedInfo.class_id,
          section_id: selectedInfo.section_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated Successfully ",response);
      setAllData(response.data);

      setIsUpdateMode(false);
      setSelectedInfo({});
      setIsLoading(false);

      toast.success("Updated Successfully", 2000);

    } catch (error) {
      console.error(error);
      toast.error("Update Failed", 2000);
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
      field: "classid",
      headerName: "Class ID",
      flex: 3,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.class_id,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.class_id || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                class_id: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.class_id}</div>
        ),
    },
    {
      field: "sectionid",
      headerName: "Section ID",
      flex: 6,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.section_id,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.section_id || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                section_id: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.section_id}</div>
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
                  "class_id" || "section_id",
                  selectedInfo.class_id || selectedInfo.section_id
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
    <div>
      {isLoading ? <Loader /> : (
    <Box m="20px">
      {      console.log("all data ",alldata)
}
      <Header title="CLASS SECTION" subtitle="List of Class Section" />
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
          <Button
            variant="contained"
            color="neutral"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add new Class Section
          </Button>
        </Stack>

        <Box mt={2} display={isOpen ? "block" : "none"}>
          <TextField
            fullWidth
            variant="outlined"
            label="Class ID"
            value={newData.class_id}
            onChange={(e) =>
              setNewData({ ...newData, class_id: e.target.value })
            }
          />
          <Box sx={{ m: 1 }} />
          <TextField
            fullWidth
            variant="outlined"
            label="Section ID"
            value={newData.section_id}
            onChange={(e) =>
              setNewData({ ...newData, section_id: e.target.value })
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
          <Box sx={{ p: 3 }} />
        </Box>

        <ToastContainer />
      </Box>
    </Box>)}
    </div>
  );
};

export default ClassSection;

