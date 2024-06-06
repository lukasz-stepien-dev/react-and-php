import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const userId = localStorage.getItem('userId');
  fetch(`http://localhost:8000/api/task/read.php?userId=${userId}`)
    .then(response => response.json())
    .then(data => setTasks(data.records))
    .catch(error => console.error('Error:', error));
}, []);

  const handleAddTask = () => {
    navigate('/add-task');
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