import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList, editList } from '../features/shoppingListSlice';
import styles from './ShoppingListForm.module.css';

export default function ShoppingListForm({ list = null, onSave }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('authToken'));
  const [formData, setFormData] = useState({
    name: list ? list.name : '',
    quantity: list ? list.quantity : '',
    notes: list ? list.notes : '',
    category: list ? list.category : '',
    image: list ? list.image : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listData = {
      ...formData,
      userId: user.id,  // Associate the list with the logged-in user
    };

    if (list) {
      dispatch(editList({ ...listData, id: list.id }));
    } else {
      dispatch(createList(listData));
    }
    onSave();
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="List Name" onChange={handleChange} value={formData.name} required />
      <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} value={formData.quantity} required />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} value={formData.category} required />
      <textarea name="notes" placeholder="Notes" onChange={handleChange} value={formData.notes} />
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">Save List</button>
    </form>
  );
}
