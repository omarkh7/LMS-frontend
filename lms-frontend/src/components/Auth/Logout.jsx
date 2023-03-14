import { Button } from '@mui/material';
import React from 'react'

function Logout() {


  const logOut = () => {
    window.localStorage.clear();
  };

  return (
    <div>
      <Button onClick={logOut}/>
    </div>
  )
}

export default Logout
