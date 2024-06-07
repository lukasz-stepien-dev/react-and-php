import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
  event.preventDefault();

  fetch('http://localhost:8000/api/user/register.php', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  })
  .then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
    return response.json();
  })
  .then((data) => {
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      navigate('/tasks');
      window.location.reload();
    } else {
      console.error(data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

  return (
    <Box>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" required/>
        </FormControl>
        <Box display="flex" justifyContent="space-between" marginTop="16px">
          <Button variant="contained" color="primary" type="submit">Register</Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>Login</Button>
        </Box>
      </form>
    </Box>
  );
}