import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  const task = {
    title,
    description,
    due_date: dueDate,
    status: 'not_completed',
    user_id: localStorage.getItem('userId'),
  };

  fetch('http://localhost:8000/api/task/create.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(response => response.json())
    .then(data => navigate('/tasks'))
    .catch((error) => {
      console.error('Error:', error);
    });
};

  return (
    <Box>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required/>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline/>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField label="Due Date" value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" InputLabelProps={{ shrink: true }}/>
        </FormControl>
        <Box display="flex" justifyContent="space-between" marginTop="16px">
          <Button variant="contained" color="primary" type="submit">Add Task</Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/tasks')}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
}