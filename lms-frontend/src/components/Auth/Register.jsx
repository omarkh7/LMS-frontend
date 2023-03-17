import React, { useState , useEffect} from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,

} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    firstname: "",
    lastname: "",  });

  const userRoles = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Teacher" },
    { value: 3, label: "Student" },
  ];

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value ? "" : "This field is required" });
  };

 


  const register = (event) => {
    event.preventDefault();

  // Add this if statement to check if the passwords match
  if (formData.password !== formData.password_confirmation) {
    toast.error("Password confirmation error");
    return;
  }


    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("password_confirmation", formData.password_confirmation);
    data.append("role", formData.role);
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8000/api/register", data, {
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
        toast.success("Admin created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          role: "",
          firstname: "",
          lastname: "",
        });
        
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to create user.");
      });
   
  };
  

  useEffect(() => {
    
  }, []);

  return (
    <Box m="20px">
      <form encType="multipart/form-data" onSubmit={register}>
        <Box display="flex" flexDirection="column" gap="20px">
          <div style={{ marginBottom: 10 }}>
            <TextField
              fullWidth
              name="name"
              label="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              error={Boolean(errors.name)}
              helpertext={errors.name}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              error={Boolean(errors.username)}
              helpertext={errors.username}
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              error={Boolean(errors.name)}
              helpertext={errors.name}
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>          
          <div style={{ marginBottom: 10 }}>
            <TextField
              error={Boolean(errors.name)}
              helpertext={errors.name}
              fullWidth
              name="password_confirmation"
              label="PasswordConfirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                error={Boolean(errors.username)}
                helpertext={errors.username}
                labelId="role-label"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Teacher</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              error={Boolean(errors.username)}
              helpertext={errors.username}
              fullWidth
              name="firstname"
              label="First name"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              error={Boolean(errors.username)}
              helpertext={errors.username}
              fullWidth
              name="lastname"
              label="Last name"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
         
          <Button fullWidth variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Register;
