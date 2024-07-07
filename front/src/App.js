// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './home/signup';
import Login from './home/login';
import User from './user/user';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />

          {/* Use ProtectedRoute for routes that require authentication */}
          <ProtectedRoute path="/user" element={<User />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
