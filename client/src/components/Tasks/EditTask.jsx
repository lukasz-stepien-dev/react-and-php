import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={task.title} onChange={handleChange} required/>
        </label>
        <label>
          Description:
          <textarea name="description" value={task.description} onChange={handleChange} required/>
        </label>
        <label>
          Due Date:
          <input type="date" name="due_date" value={task.due_date} onChange={handleChange} required/>
        </label>
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange} required>
            <option value="not_completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="submit">Update Task</button>
        <button type="button" onClick={() => navigate('/tasks')}>Cancel</button>
      </form>
    </div>
  );
}