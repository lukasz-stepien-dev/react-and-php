import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
  event.preventDefault();

  fetch('http://localhost:8000/api/user/register.php', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  })
  .then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
    return response.json();
  })
  .then((data) => {
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      navigate('/tasks');
    } else {
      console.error(data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required/>
        </label>
        <br/>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        </label>
        <br/>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        </label>
        <br/>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}