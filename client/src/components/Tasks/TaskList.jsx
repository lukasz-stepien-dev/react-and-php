import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc'); // Add this line
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
    setSortOrder(prevSortOrder => prevSortOrder === 'desc' ? 'asc' : 'desc'); // Toggle the sortOrder
    setTasks(prevTasks => {
      return [...prevTasks].sort((a, b) => sortOrder === 'desc' ? new Date(b.due_date) - new Date(a.due_date) : new Date(a.due_date) - new Date(b.due_date));
    });
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
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleProfile}>Profile</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => handleFilterByStatus('completed')}>Show only Completed</button>
      <button onClick={() => handleFilterByStatus('not_completed')}>Show only Not Completed</button>
      <button onClick={handleFilterByDueDate}>Filter by Due Date</button>
      <table style={{tableLayout: 'fixed', width: '100%'}}>
        <thead>
        <tr>
          <th style={{width: '25%'}}>Title</th>
          <th style={{width: '25%'}}>Description</th>
          <th style={{width: '25%'}}>Due Date</th>
          <th style={{width: '25%'}}>Status</th>
          <th style={{width: '25%'}}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {taskItems}
        </tbody>
      </table>
    </div>
  );
}