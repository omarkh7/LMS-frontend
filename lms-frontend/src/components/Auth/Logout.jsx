import { Button } from '@mui/material';
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Logout() {

 
  fetch('http://localhost:8000/api/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('loggedIn');
        window.location.href = '/login';
        toast.success('Logged out', {autoClose: 2000});
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.', {autoClose: 2000});
    });
}

  return (
    <div>
      <Button onClick={Logout}/>
    </div>
  )


export default Logout
