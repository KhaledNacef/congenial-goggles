import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home.jsx';
import Signup from './home/signup.jsx';
import Login from './home/login.jsx';
import Admin from './admin/admin.jsx';
import User from './user/user.jsx';
import Logina from './home/adminlogin.jsx';
import Subs from './home/subs.jsx';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/loginA' element={<Logina />} />
                    <Route path='/payment' element={<Subs />} />
                    
                    {/* Use ProtectedRoute for routes that require authentication */}
                    <Route element={<ProtectedRoute />}>
                        <Route path='/admin' element={<Admin />} />
                        <Route path='/user' element={<User />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
