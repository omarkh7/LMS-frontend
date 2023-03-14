import { Button } from '@mui/material';
import React from 'react'

function Logout() {


  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/login";

  };

  return (
    <div>
      <Button onClick={logOut}/>
    </div>
  )
}

export default Logout
