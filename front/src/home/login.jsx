import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './nav.jsx';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from './AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post("https://api.deviceshopleader.com/api/user/login", formData);
            localStorage.setItem('token', response.data.user.id);
            login(response.data.user.id); // Pass the token to the login function
            navigate('/user');
        } catch (error) {
            console.error("Échec de la connexion", error);
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Nav />
            <Box sx={{ width: '100%', maxWidth: 400, padding: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>CONNEXION</Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleLogin({ Password: password, Email: email })}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                >
                    SE CONNECTER
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
