import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required/>
        </label>
        <br/>
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)}/>
        </label>
        <br/>
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}/>
        </label>
        <br/>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}