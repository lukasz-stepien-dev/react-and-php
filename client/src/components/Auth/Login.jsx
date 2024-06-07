import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    fetch('http://localhost:8000/api/user/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          navigate('/tasks');
          window.location.reload();
        } else {
          console.error('Login failed:', data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  );
}