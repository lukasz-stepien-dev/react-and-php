import React from 'react';

export default function TaskItem({ task }) {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.due_date}</td>
      <td>{task.status}</td>
      {/* Add your action buttons here */}
    </tr>
  );
}