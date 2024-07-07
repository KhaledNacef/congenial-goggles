import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route {...rest} element={isAuthenticated ? <Component /> : <Navigate to="/" />} />
  );
};

export default ProtectedRoute;
