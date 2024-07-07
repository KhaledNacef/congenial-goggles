import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
          
          <Route path='/Signup' element={<Signup />} />
          <Route path='/' element={<Login />} />
          

          {/* Use ProtectedRoute for routes that require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path='/user' element={<User />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
