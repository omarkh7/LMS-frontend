

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loader.css';

export default function Loader() {
  return (
    <div className='loader'>
      <Box sx={{ display: 'flex', color: '' }}>
      <CircularProgress />
    </Box>
    </div>
  );
}
