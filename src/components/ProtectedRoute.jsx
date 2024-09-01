import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.shoppingLists.users.length > 0);
  return isAuthenticated ? children : <Navigate to="/login" />;
}
