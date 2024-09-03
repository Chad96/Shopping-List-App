import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../features/shoppingListSlice';
import ShoppingList from '../components/ShoppingList';
import ShoppingListForm from '../components/ShoppingListForm';
import styles from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingLists.lists);
  const user = JSON.parse(localStorage.getItem('authToken'));

  // State for filter options
  const [searchName, setSearchName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('name');

  // Unique categories for the dropdown
  const categories = [...new Set(lists.map(list => list.category))];

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  // Handle changes in filters
  const handleSearchNameChange = (e) => setSearchName(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSortOptionChange = (e) => setSortOption(e.target.value);

  // Filtering the lists based on search and selected category
  const filteredLists = lists
    .filter(list => 
      list.userId === user.id &&
      list.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (selectedCategory === '' || list.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'quantity') {
        return a.quantity - b.quantity;
      }
      return 0;
    });

  return (
    <div className={styles.homePage}>
      <h1>Shopping Lists</h1>
      
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={handleSearchNameChange}
          className={styles.searchInput}
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.filterDropdown}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={handleSortOptionChange}
          className={styles.filterDropdown}
        >
          <option value="name">Sort by Name</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
      </div>
      
      <ShoppingListForm onSave={() => dispatch(fetchLists())} />
      
      <div className={styles.lists}>
        {filteredLists.length > 0 ? (
          filteredLists.map((list) => (
            <ShoppingList key={list.id} list={list} />
          ))
        ) : (
          <p>No shopping lists found. Try adjusting your filters or add a new list above!</p>
        )}
      </div>
    </div>
  );
}
