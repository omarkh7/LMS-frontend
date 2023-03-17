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

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    image: null,
    phonenb: null,
  });

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

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const createuser = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    data.append("role", formData.role);
    if (formData.image) {
      data.append("image", formData.image);
    }
    if (formData.phonenb) {
      data.append("phonenb", formData.phonenb);
    }

    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8000/api/users", data, {
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
        toast.success("User created successfully!");
        setFormData({
          username: "",
          password: "",
          email: "",
          firstname: "",
          lastname: "",
          role: "",
          image: null,
          phonenb: null,
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
      <form encType="multipart/form-data" onSubmit={createuser}>
        <Box display="flex" flexDirection="column" gap="20px">
          <div style={{ marginBottom: 10 }}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
              error={Boolean(errors.username)}
              helpertext={errors.username}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              error={Boolean(errors.username)}
              helpertext={errors.username}
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
                <MenuItem value={3}>Student</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              error={Boolean(errors.username)}
              helpertext={errors.username}
              fullWidth
              name="phonenb"
              label="Phone Number"
              type="tel"
              value={formData.phonenb}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              error={Boolean(errors.username)}
              helpertext={errors.username}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
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

export default CreateUser;