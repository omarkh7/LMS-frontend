import { Box, TextField, Button, Stack, Input } from "@mui/material";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "react-toastify/dist/ReactToastify.css";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { IconButton } from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import RadioButtons from "./RadioButtons";

const StudentAttendance = () => {
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

  const studentAttendance = async (id) => {
    const token = localStorage.getItem("token");
    axios.post(`http://localhost:8000/api/attendances/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Attendance Recorded Successfully", 2000);
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
            <Box sx={{paddingRight: '10px', paddingLeft: '10px'}}
display="flex" alignItems="center"
 justifyContent="space-around" >

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
      field: "Attendances",
      headerName: "Delete",
      flex: 1, 
      sortable: false,
      disableColumnMenu: true, 
      renderCell: (params) => (
        <IconButton onChange={() => studentAttendance(params.row.id)}>
<RadioButtons />
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
        //   rowsPerPageOptions={[5, 10, 25]}
          autoHeight
          disableSelectionOnClick
        />

        <ToastContainer />
      </Box>
    </Box>
  );
};

export default StudentAttendance;
