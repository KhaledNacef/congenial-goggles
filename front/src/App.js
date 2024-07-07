// App.jsx
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './home/signup.jsx';
import Login from './home/login.jsx';
import User from './user/user.jsx';
import ProtectedRoute from './ProtectedRoute.js';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    // You might want to set some authentication token or state here
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Clear authentication token or state here if needed
  };


  return (
    
      <Router>
        <Routes>
        <Route path="/" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup />} />
          

          <ProtectedRoute
          path="/user"
          element={<User />}
          isAuthenticated={isAuthenticated}
        />
        </Routes>
      </Router>
  
  );
};

export default App;
