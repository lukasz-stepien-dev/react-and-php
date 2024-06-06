import React, { useState } from 'react';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      due_date: dueDate,
    };

    fetch('http://localhost:8000/api/task/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(data => console.log(data))
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