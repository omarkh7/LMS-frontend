import { Box, TextField, Button, Stack, Input } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../Header";
// import InputBase from "@mui/material/InputBase";
import imgs from "../user.png";
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
  const [loading, setLoading] = useState(true);

  const [newData, setNewData] = useState({
    student_id: "",
    teacher_id: "",
    class_section_id: "",
    status: "",
    date: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const attendanceURL = "https://lms-backend-production-0616.up.railway.app/api/attendances";

  const fetchallData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(attendanceURL, {
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

  const deleteUser = async (student_id) => {
    const token = localStorage.getItem("token");
    axios.delete(`https://lms-backend-production-0616.up.railway.app/api/attendances/${student_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Deleted Successfully", 2000);
    fetchallData();
  };

  const handleUpdate = async (student_id, field, value) => {
    const updatedData = alldata.map((row) => {
      if (row.student_id === student_id) {
        console.log("row ", row);
        return { ...row, [field]: value };
      }
      return row;
    });

    console.log("updated data ", updatedData);
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${attendanceURL}/${student_id}`,
        {
          student_id: selectedInfo.student_id,
          teacher_id: selectedInfo.teacher_id,
          class_section_id: selectedInfo.class_section_id,
          status: selectedInfo.status,
          date: selectedInfo.date,
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
    { field: "student_id", headerName: "student_id" },

    {
      field: "teacher_id",
      headerName: "teacher_id",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.teacher_id,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.teacher_id === params.row.teacher_id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.teacher_id || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                teacher_id: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.teacher_id}</div>
        ),
    },

    {
      field: "class_section_id",
      headerName: "class_section_id",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.class_section_id,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.class_section_id === params.row.class_section_id ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.class_section_id || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                class_section_id: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.class_section_id}</div>
        ),
    },
    {
      field: "status",
      headerName: "status",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.status,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.status === params.row.status ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.status || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                status: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.status}</div>
        ),
    },
    {
      field: "date",
      headerName: "date",
      flex: 2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.date,
      renderCell: (params) =>
        isUpdateMode && selectedInfo.date === params.row.date ? (
          <TextField
            fullWidth
            variant="standard"
            value={selectedInfo.status || ""}
            onChange={(e) =>
              setSelectedInfo({
                ...selectedInfo,
                date: e.target.value,
              })
            }
          />
        ) : (
          <div>{params.row.date}</div>
        ),
    },
  ];
  return (
    <Box m="20px">
      {console.log("all data ", alldata)}
      <Header title="Student" subtitle="Attendance" />
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
          rows={alldata}
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