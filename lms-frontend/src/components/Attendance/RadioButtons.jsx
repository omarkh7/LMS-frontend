import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
export default function RadioButtons() {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="1" control={<Radio />} label="Present" />
        <FormControlLabel value="2" control={<Radio />} label="Absent" />
        <FormControlLabel value="3" control={<Radio />} label="Late" />
      </RadioGroup>
    </FormControl>
  );
}