// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, adminOnly, ...props }) => {
  const { userRole } = useAuth();

  if (adminOnly && userRole !== 'admin') {
    // Redirect to login or another route if not an admin
    return <Navigate to="/login" />;
  }

  return <Route {...props} element={element} />;
};

export default PrivateRoute;
