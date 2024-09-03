import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  lists: [],
  users: [],
  status: 'idle',
};

const shoppingListSlice = createSlice({
  name: 'shoppingLists',
  initialState,
  reducers: {
    setLists(state, action) {
      state.lists = action.payload;
    },
    addList(state, action) {
      state.lists.push(action.payload);
    },
    updateList(state, action) {
      const index = state.lists.findIndex(list => list.id === action.payload.id);
      if (index !== -1) state.lists[index] = action.payload;
    },
    deleteList(state, action) {
      state.lists = state.lists.filter(list => list.id !== action.payload.id);
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    updateUser(state, action) {  // Reducer to update user in state
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
    },
    deleteUser(state, action) {  // Reducer to delete user from state
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const {
  setLists,
  addList,
  updateList,
  deleteList,
  setUsers,
  addUser,
  updateUser,  // Reducer
  deleteUser,  // Reducer
} = shoppingListSlice.actions;

// Thunks for Shopping Lists
export const fetchLists = () => async dispatch => {
  const response = await axios.get('http://localhost:5000/lists');
  dispatch(setLists(response.data));
};

export const createList = (list) => async dispatch => {
  const response = await axios.post('http://localhost:5000/lists', list);
  dispatch(addList(response.data));
};

export const editList = (list) => async dispatch => {
  const response = await axios.put(`http://localhost:5000/lists/${list.id}`, list);
  dispatch(updateList(response.data));
};

export const removeList = (id) => async dispatch => {
  await axios.delete(`http://localhost:5000/lists/${id}`);
  dispatch(deleteList({ id }));
};

// Thunks for User Management
export const fetchUsers = () => async dispatch => {
  const response = await axios.get('http://localhost:5000/users');
  dispatch(setUsers(response.data));
};

export const createUser = (user) => async dispatch => {
  const response = await axios.post('http://localhost:5000/users', user);
  dispatch(addUser(response.data));
};

export const updateUserThunk = (user) => async dispatch => {  // Renamed thunk
  const response = await axios.put(`http://localhost:5000/users/${user.id}`, user);
  dispatch(updateUser(response.data));  // Dispatches the reducer
};

export const deleteUserThunk = (id) => async dispatch => {  // Renamed thunk
  await axios.delete(`http://localhost:5000/users/${id}`);
  dispatch(deleteUser(id));  // Dispatches the reducer
};

export default shoppingListSlice.reducer;
