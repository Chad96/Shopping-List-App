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

  const renderImage = () => {
    if (typeof list.image === 'string') {
      // If image is a URL string, use it directly
      return <img src={list.image} alt={list.name} />;
    } else if (list.image instanceof Blob || list.image instanceof File) {
      // If image is a File or Blob, use createObjectURL
      return <img src={URL.createObjectURL(list.image)} alt={list.name} />;
    }
    return null; // If image is not set or of an unsupported type, return null
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
          {renderImage()}
          <div className={styles.buttons}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
