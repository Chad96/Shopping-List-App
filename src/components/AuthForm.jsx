import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, fetchUsers } from '../features/shoppingListSlice';
import axios from 'axios';
import styles from './AuthForm.module.css';

export default function AuthForm({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    cellNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'register') {
      // Create user and store in JSON server
      await dispatch(createUser(formData));
      alert('Registration successful! Please log in.');
      navigate('/login');
    } else {
      // Fetch users from JSON server and validate login
      await dispatch(fetchUsers());
      const updatedUsers = await axios.get('http://localhost:5000/users');
      const user = updatedUsers.data.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        localStorage.setItem('authToken', JSON.stringify(user));
        navigate('/');
      } else {
        alert('Invalid login credentials');
      }
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      {type === 'register' && (
        <>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
          <input type="text" name="cellNumber" placeholder="Cell Number" onChange={handleChange} required />
        </>
      )}
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
    </form>
  );
}
