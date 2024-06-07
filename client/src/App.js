import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Tasks/TaskList';
import AddTask from './components/Tasks/AddTask';
import EditTask from './components/Tasks/EditTask';
import Profile from './components/Auth/Profile';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
      <Route path="/tasks" element={isLoggedIn ? <TaskList /> : <Login />} />
        <Route path="/add-task" element={isLoggedIn ? <AddTask /> : <Login />} />
      <Route path="/edit/:id" element={isLoggedIn ? <EditTask /> : <Login />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;