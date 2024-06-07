import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function TaskItem({ task }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${task.id}`);
  };

  const handleMarkAsCompleted = () => {
    fetch(`http://localhost:8000/api/task/update.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status: 'completed',
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.reload();
      } else {
        console.error('Failed to mark task as completed:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/api/task/delete.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.reload();
      } else {
        console.error('Failed to delete task:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
      <TableRow>
        <TableCell>{task.title}</TableCell>
        <TableCell>{task.description}</TableCell>
        <TableCell>{task.due_date}</TableCell>
        <TableCell>{task.status}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
          <Button variant="contained" color="primary" onClick={handleMarkAsCompleted}>Mark as Completed</Button>
          <Button variant="contained" color="primary" onClick={handleDelete}>Delete</Button>
        </TableCell>
      </TableRow>
  );
}