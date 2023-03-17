// import Students from '../Users/Students/Students';


// import * as React from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// export default function Attendance() {
//   return (
//     <FormControl>
//       <FormLabel id="demo-row-radio-buttons-group-label">Attendance</FormLabel>
//       <RadioGroup
//         row
//         aria-labelledby="demo-row-radio-buttons-group-label"
//         name="row-radio-buttons-group"
//       >
//         <FormControlLabel value="1" control={<Radio />} label="Present" />
//         <FormControlLabel value="2" control={<Radio />} label="Late" />
//         <FormControlLabel value="3" control={<Radio />} label="Absent" />
//       </RadioGroup>
//     </FormControl>
//   );
// }
//////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { Box, Stack, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const Attendance = ({ students, onSubmit }) => {
  const [attendance, setAttendance] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(attendance);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" sx={{ m: 3 }}>
          <FormLabel component="legend">Attendance</FormLabel>
          <RadioGroup
            aria-label="attendance"
            name="attendance"
            value={attendance.attendance}
            onChange={handleChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Present"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Absent"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Late"
            />
          </RadioGroup>
        </FormControl>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Attendance;

// import React from "react";
// import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

// const Attendance = ({ attendance, handleAttendanceChange }) => {
//   return (
//     <FormControl component="fieldset">
//       <RadioGroup
//         row
//         aria-label="attendance"
//         name="attendance"
//         value={attendance}
//         onChange={handleAttendanceChange}
//       >
//         <FormControlLabel value="1" control={<Radio />} label="Present" />
//         <FormControlLabel value="2" control={<Radio />} label="Absent" />
//         <FormControlLabel value="3" control={<Radio />} label="Late" />
//       </RadioGroup>
//     </FormControl>
//   );
// };

// export default Attendance;

