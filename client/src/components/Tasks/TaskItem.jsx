import React from 'react';

export default function TaskItem({ task }) {
  const handleEdit = () => {
    // Edit logic here
  };

  const handleMarkAsCompleted = () => {
    fetch(`http://localhost:8000/api/task/update.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
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
    // Delete logic here
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.due_date}</td>
      <td>{task.status}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleMarkAsCompleted}>Mark as Completed</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}