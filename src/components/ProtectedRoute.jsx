import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth'; // replace with your actual auth hook

function ProtectedRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth(); // replace with your actual auth state

  return (
    <Route {...rest} element={isAuthenticated ? element : <Navigate to="/login" />} />
  );
}

export default ProtectedRoute;