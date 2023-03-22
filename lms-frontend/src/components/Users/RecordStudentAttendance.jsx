import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CreateAttendance = () => {
  const [formData, setFormData] = useState({
    student_id: "",
    teacher_id: "", // add a default value for teacher_id
    class_section_id: "",
    status: "",  });
  const [userIds, setUserIds] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value ? "" : "This field is required" });
  };
 
  const createattendance = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("student_id", formData.student_id);
    data.append("teacher_id", formData.teacher_id);
    data.append("class_section_id", formData.class_section_id);
    data.append("status", formData.status);
   
    const token = localStorage.getItem("token");
    axios
      .post("https://lms-backend-production-0616.up.railway.app/api/attendances", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        validateStatus: function (status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Attendance recorded successfully!");
        setFormData({
          student_id: "",
          teacher_id: "",
          class_section_id: "",
          status: "",
        });
       
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to record attendance.");
      });
  
  };
 
  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://lms-backend-production-0616.up.railway.app/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const studentUserIds = response.data.filter(
          (user) => user.role === 3
        ).map((user) => user.id);
        setUserIds(studentUserIds);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch user IDs.");
      });
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setFormData({ ...formData, status: event.target.value });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  

  return (
    <Box m="20px">
      <form onSubmit={createattendance}>
        <Box display="flex" flexDirection="column" gap="20px">
          <div style={{ marginBottom: 10 }}>
            <FormControl fullWidth required>
              <InputLabel id="student-id-label">Student ID</InputLabel>
              <Select
                labelId="student-id-label"
                id="student-id"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                error={Boolean(errors.student_id)}
                helpertext={errors.student_id}
              >
                {userIds.map((userId) => (
                  <MenuItem key={userId} value={userId}>
                    {userId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ marginBottom: 10 }}>
          <TextField
  fullWidth
  name="teacher_id"
  label="Teacher ID"
  // defaultValue="1" // set a default value for teacher_id
  value={formData.teacher_id}
  onChange={handleInputChange}
  required
  error={Boolean(errors.teacher_id)}
  helpertext={errors.teacher_id}
/>
 </div>
 <div style={{ marginBottom: 10 }}>
   <TextField
     fullWidth
     name="class_section_id"
     label="Class Section ID"
     value={formData.class_section_id}
     onChange={handleInputChange}
     required
     error={Boolean(errors.class_section_id)}
     helpertext={errors.class_section_id}
   />
 </div>

 <div style={{ marginBottom: 10 }}>
   {/* <TextField
     fullWidth
     name="status"
     label="Status"
     value={formData.status}
     onChange={handleInputChange}
     required
     error={Boolean(errors.status)}
     helpertext={errors.status}
   /> */}
    <FormControl fullWidth>
    <InputLabel id="status-label">Status</InputLabel>
    <Select
    name="status"
    value={formData.status}
    onChange={handleStatusChange}
    required
    error={Boolean(errors.status)}
    helpertext={errors.status}
  >
    <MenuItem value={1}>Present</MenuItem>
    <MenuItem value={2}>Late</MenuItem>
    <MenuItem value={3}>Absent</MenuItem>
  </Select>
  </FormControl> 
 </div>

          <Button fullWidth variant="contained" color="primary" type="submit">
            Record Attendance
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default CreateAttendance;
