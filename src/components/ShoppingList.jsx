import React from 'react';
import { useDispatch } from 'react-redux';
import { removeList } from '../features/shoppingListSlice';
import ShoppingListForm from './ShoppingListForm';
import styles from './ShoppingList.module.css';

export default function ShoppingList({ list }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleDelete = () => {
    dispatch(removeList(list.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.listItem}>
      {isEditing ? (
        <ShoppingListForm list={list} onSave={handleSave} />
      ) : (
        <>
          <h3>{list.name}</h3>
          <p>Quantity: {list.quantity}</p>
          <p>Category: {list.category}</p>
          <p>Notes: {list.notes}</p>
          {list.image && <img src={URL.createObjectURL(list.image)} alt={list.name} />}
          <div className={styles.buttons}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
