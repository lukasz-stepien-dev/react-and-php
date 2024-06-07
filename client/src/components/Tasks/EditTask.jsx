import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', due_date: '', status: '' });

  useEffect(() => {
    fetch(`http://localhost:8000/api/task/read_single.php?id=${id}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/task/update.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigate('/tasks');
      } else {
        console.error('Failed to update task:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
      <Box>
        <h1>Edit Task</h1>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField label="Title" name="title" value={task.title} onChange={handleChange} required/>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField label="Description" name="description" value={task.description} onChange={handleChange} multiline required/>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField label="Due Date" name="due_date" value={task.due_date} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} required/>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={task.status} onChange={handleChange} required>
              <MenuItem value="not_completed">Not Completed</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="space-between" marginTop="16px">
            <Button variant="contained" color="primary" type="submit">Update Task</Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/tasks')}>Cancel</Button>
          </Box>
        </form>
      </Box>
  );
}