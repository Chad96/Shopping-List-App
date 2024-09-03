import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../features/shoppingListSlice'; // Ensure deleteUser is imported
import axios from 'axios';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authToken')));
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      // Fetch the latest user data from the JSON server
      axios.get(`http://localhost:5000/users/${user.id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/users/${user.id}`, formData)
      .then(response => {
        dispatch(updateUser(response.data));
        localStorage.setItem('authToken', JSON.stringify(response.data));
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/users/${user.id}`)
      .then(() => {
        dispatch(deleteUser(user.id));
        localStorage.removeItem('authToken');
        navigate('/login');
        alert('Account deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting user account:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className={styles.profilePage}>
      <h1>Your Profile</h1>
      <div className={styles.profileForm}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className={styles.inputField}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={formData.surname || ''}
            onChange={handleChange}
            className={styles.inputField}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className={styles.inputField}
          />
        </label>
        <label>
          Cell Number:
          <input
            type="text"
            name="cellNumber"
            value={formData.cellNumber || ''}
            onChange={handleChange}
            className={styles.inputField}
          />
        </label>
        <div className={styles.buttons}>
          <button onClick={handleUpdate} className={styles.updateButton}>Update Profile</button>
          <button onClick={handleDelete} className={styles.deleteButton}>Delete Account</button>
        </div>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}
