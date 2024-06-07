import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    fetch(`http://localhost:8000/api/user/getProfile.php?userId=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUserData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (!userData) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="body1">First Name: {userData.firstName}</Typography>
      <Typography variant="body1">Last Name: {userData.lastName}</Typography>
      <Typography variant="body1">Email: {userData.email}</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/tasks')}>Go back</Button>
    </Box>
  );
};

export default Profile;