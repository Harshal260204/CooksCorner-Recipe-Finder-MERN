import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserProtectedRoutes = () => {
  const { user, token } = useContext(AuthContext);

  // Check if user is authenticated
  if (!user || !token) {
    return <Navigate to="/login-page" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoutes;