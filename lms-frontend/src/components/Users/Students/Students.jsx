import { Box, TextField, Button, Stack, Input } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
// import InputBase from "@mui/material/InputBase";
import imgs from "../../user.png";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "react-toastify/dist/ReactToastify.css";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

import { useTheme } from "@mui/material";

const Students = () => {
  const [selectedInfo, setSelectedInfo] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [alldata, setAllData] = useState([]);
  const [imageFile, setImageFile] = useState(null);
const [loading, setLoading] = useState(true);

  const [newData, setNewData] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    image: "",
    phonenb: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const apiURL = "http://localhost:8000/api/users";

  const fetchallData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch data ", response.data);
      setAllData(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:8000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Deleted Successfully", 2000);
    fetchallData();
  };

  const handleUpdate = async (id, field, value) => {
    const updatedData = alldata.map((row) => {
      if (row.id === id) {
        console.log("row ", row);
        return { ...row, [field]: value };
      }
      return row;
    });

    console.log("updated data ", updatedData);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${apiURL}/${id}`,
        {
          username: selectedInfo.username,
          email: selectedInfo.email,
          firstname: selectedInfo.firstname,
          lastname: selectedInfo.lastname,
          role: selectedInfo.role,
          image: selectedInfo.image,
          phonenb: selectedInfo.phonenb,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Updated Successfully ", response);
      setAllData(response.data);
      setIsUpdateMode(false);
      setSelectedInfo({});
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
      field: "image",
      headerName: "Image",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.image,
      renderCell: (params) => {
        const handleImageChange = (event) => {
          setSelectedInfo({
            ...selectedInfo,
            image: event.target.files[0],
          });
        };

        return isUpdateMode && selectedInfo.id === params.row.id ? (
          <Box display="flex" alignItems="center">
            <Input
              type="file"
              disableUnderline
              fullWidth
              onChange={handleImageChange}
            />
          </Box>
        ) : params.row.image ? (
          <img
            src={`http://localhost:8000/images/${params.row.image}`}
            alt={params.row.image}
            width={50}
            height={50}
          />
        ) : (
          <RemoveOutlinedIcon />
        );
      },
    },
    {
      field: "username",
      headerName: "UserName",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.username,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.username || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                username: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.username}</div>
        ),
    },

    {
      field: "firstname",
      headerName: "First Name",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.firstname,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.firstname || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                firstname: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.firstname}</div>
        ),
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.lastname,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.lastname || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                lastname: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.lastname}</div>
        ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.email,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.email || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                email: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.email}</div>
        ),
    },
    {
      field: "phonenb",
      headerName: " Phone Number",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.phonenb,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.id === params.row.id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.phonenb || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                phonenb: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.phonenb}</div>
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
                  "image" ||
                    "username" ||
                    "firstname" ||
                    "lastname" ||
                    "email" ||
                    "phonenb",
                  selectedInfo.image ||
                    selectedInfo.username ||
                    selectedInfo.firstname ||
                    selectedInfo.lastname ||
                    selectedInfo.email ||
                    selectedInfo.phonenb
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
      {console.log("all data ", alldata)}
      <Header title="Student" subtitle="List of Students" />
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
        <DataGrid
          rows={alldata.filter((data) => data.role == 3)}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          // rowsPerPageOptions={[5, 10, 25]}
          autoHeight
          disableSelectionOnClick
        />

        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Students;