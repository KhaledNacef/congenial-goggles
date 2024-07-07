// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './home/signup.jsx';
import Login from './home/login.jsx';
import User from './user/user.jsx';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          

          {/* Use ProtectedRoute for routes that require authentication */}
          <ProtectedRoute path="/user" element={<User />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
