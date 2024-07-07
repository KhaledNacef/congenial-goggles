import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default ProtectedRoute;