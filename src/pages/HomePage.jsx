import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../features/shoppingListSlice';
import ShoppingList from '../components/ShoppingList';
import ShoppingListForm from '../components/ShoppingListForm';
import styles from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingLists.lists);
  const user = JSON.parse(localStorage.getItem('authToken'));

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const userLists = lists.filter(list => list.userId === user.id);

  console.log("User Lists:", userLists); // Debugging output to ensure lists are being filtered correctly

  return (
    <div className={styles.homePage}>
      <h1>Shopping Lists</h1>
      <ShoppingListForm onSave={() => dispatch(fetchLists())} />
      <div className={styles.lists}>
        {userLists.length > 0 ? (
          userLists.map((list) => (
            <ShoppingList key={list.id} list={list} />
          ))
        ) : (
          <p>No shopping lists found. Add a new list above!</p>
        )}
      </div>
    </div>
  );
}
