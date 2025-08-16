import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminProtectedRoutes = () => {
  const { user, token } = useContext(AuthContext);

  // Check if user is authenticated and is admin
  if (!user || !token) {
    return <Navigate to="/login-page" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoutes;