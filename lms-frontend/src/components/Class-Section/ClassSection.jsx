import { Box, TextField, Button, Stack, Select, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "../Home/Loader/Loader";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { useTheme } from "@mui/material";

const ClassSection = () => {
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [allclassesdata, setAllClassesData] = useState([]);
  const [allsectionsdata, setAllSectionsData] = useState([]);
  const [alljoindata, setAllJoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState({
    class_id: "",
    section_id: "",
    class_name: "",
    section_name: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const apiURLJoin = "https://lms-backend-production-0616.up.railway.app/api/join";

  const apiClassesUrl = "https://lms-backend-production-0616.up.railway.app/api/classes";
  const apiSectionsUrl = "https://lms-backend-production-0616.up.railway.app/api/sections";

  useEffect(() => {
    fetchallDataJoin();
    fetchallDataClasses();
    fetchallDataSections();
  }, [isUpdateMode]);

  const fetchallDataSections = async () => {
    try {
      // setIsLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.get(apiSectionsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch Sections data ", response.data);
      setAllSectionsData(response.data);
      // setIsLoading(false);

    } catch (error) {
      console.error(error);
      // setIsLoading(false);

    }
  };

  const fetchallDataClasses = async () => {
    try {
      // setIsLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.get(apiClassesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch Classes data ", response.data);
      setAllClassesData(response.data);
      // setIsLoading(false);

    } catch (error) {
      console.error(error);
      // setIsLoading(false);

    }
  };

  const fetchallDataJoin = async () => {
    try {
      // setIsLoading(true);

      const token = localStorage.getItem("token");
      const response = await axios.get(apiURLJoin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch Join data ", response.data);
      setAllJoinData(response.data);
      // setIsLoading(false);

    } catch (error) {
      console.error(error);
      // setIsLoading(false);

    }
  };

  const addClass = async () => {
    try {
      // setIsLoading(true);

      const token = localStorage.getItem("token");
      console.log("batikh data", newData);
      await axios.post(
        `https://lms-backend-production-0616.up.railway.app/api/classsections/`,
        { class_id: newData.class_id, section_id: newData.section_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setIsLoading(false);
      fetchallDataJoin();
      toast.success("Added Successfully", { autoClose: 2000 });
      setNewData({ class_id: "", section_id: "" });
      

    } catch (error) {
      console.error(error);
      // setIsLoading(false);
      toast.error("Add Failed", { autoClose: 2000 });

    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");

    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this Class Section?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              setIsLoading(true);
              console.log(id);
              await axios.delete(
                `https://lms-backend-production-0616.up.railway.app/api/classsections/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              toast.success("Deleted Successfully", 2000);
              fetchallDataJoin();
              setIsLoading(false);
            } catch (error) {
              console.error(error);
              toast.error("Delete Failed", 2000);
              setIsLoading(false);
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.error("Canceled", 2000);

          },
        },
      ],
    });
  };

  const handleUpdate = async (id, field, value) => {
    const updatedData = alljoindata.map((row) => {
      if (row.id === id) {
        console.log("row ", row);
        return { ...row, [field]: value };
      }
      return row;
    });

    console.log("updated data ", updatedData);

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://lms-backend-production-0616.up.railway.app/api/classsections/${id}`,
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

      console.log("Updated Successfully ", response);
      setAllJoinData(response.data);
      setIsUpdateMode(false);
      setSelectedInfo({});
      setIsLoading(false);

      toast.success("Updated Successfully", 2000);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Update Failed", 2000);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "classid",
      headerName: "Class Id",
      flex: 1,
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
      field: "classname",
      headerName: "Class Name",
      flex: 3,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.class_name,
      renderCell: (params) =>
        isUpdateMode === params.row.id ? (
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
      field: "sectionid",
      headerName: "Section Id",
      flex: 1,
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
      field: "sectionname",
      headerName: "Section Name",
      flex: 3,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.section_name,
      renderCell: (params) =>
        isUpdateMode === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.section_name || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                section_name: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.section_name}</div>
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
      {console.log("all data ", alljoindata)}
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
            rows={alljoindata}
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
          <Select
            label="Class"
            id="class_id"
            value={newData.class_id || 1}
            onChange={(e) => {
              console.log(e.target.value);
              setNewData({ ...newData, class_id: e.target.value });
            }}
          >
            {allclassesdata.map((row) => (
              <MenuItem key={row.id} value={row.id}>
                {row.class_name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Section"
            id="section_id"
            value={newData.section_id || 1}
            onChange={(e) => {
              console.log(e.target.value);
              setNewData({ ...newData, section_id: e.target.value });
            }}
          >
            {allsectionsdata.map((row) => (
              <MenuItem key={row.id} value={row.id}>
                {row.section_name}
              </MenuItem>
            ))}
          </Select>
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
    </Box>
  ) }</div>);
};

export default ClassSection;
