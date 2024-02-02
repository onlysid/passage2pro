import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Login'; // Import AuthContext from Login.jsx

const AdminPage = () => {
  const { password } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  if (password !== 'your-hardcoded-password') { // replace with your actual hardcoded password
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the admin page
  return (
    // Your admin page code goes here
    <h1>HI</h1>
  );
};

export default AdminPage;