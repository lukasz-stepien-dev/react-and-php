import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/task/read.php')
      .then(response => response.json())
      .then(data => setTasks(data.records))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleAddTask = () => {
    navigate('/add-task');
  };

  return (
    <div>
      <h1>Task List</h1>
      <button onClick={handleAddTask}>Add Task</button>
      {Array.isArray(tasks) && tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}