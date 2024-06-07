import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:8000/api/task/read.php?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        let filteredTasks = data.records;
        if (filterStatus) {
          filteredTasks = filteredTasks.filter(task => task.status === filterStatus);
        }
        setTasks(filteredTasks);
      })
      .catch(error => console.error('Error:', error));
  }, [filterStatus]);

  const handleAddTask = () => {
    navigate('/add-task');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');

    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleFilterByStatus = (status) => {
    setFilterStatus(status);
  };

  const handleFilterByDueDate = () => {
    setSortOrder(prevSortOrder => prevSortOrder === 'desc' ? 'asc' : 'desc');
    setTasks(prevTasks => {
      return [...prevTasks].sort((a, b) => sortOrder === 'desc' ? new Date(b.due_date) - new Date(a.due_date) : new Date(a.due_date) - new Date(b.due_date));
    });
  };

  const handleResetFilters = () => {
    setFilterStatus(null);
    setSortOrder('desc');
  };

  let taskItems = [];
  if (Array.isArray(tasks)) {
    for (let i = 0; i < tasks.length; i++) {
      taskItems.push(<TaskItem key={tasks[i].id} task={tasks[i]} />);
    }
  }

  return (
    <div>
      <h1>Task List</h1>
      <Button variant="contained" color="primary" onClick={handleAddTask}>Add Task</Button>
      <Button variant="contained" color="primary" onClick={handleProfile}>Profile</Button>
      <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
      <Button variant="contained" color="primary" onClick={() => handleFilterByStatus('completed')}>Show only Completed</Button>
      <Button variant="contained" color="primary" onClick={() => handleFilterByStatus('not_completed')}>Show only Not Completed</Button>
      <Button variant="contained" color="primary" onClick={handleFilterByDueDate}>Filter by Due Date</Button>
      <Button variant="contained" color="primary" onClick={handleResetFilters}>Reset Filters</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskItems}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}