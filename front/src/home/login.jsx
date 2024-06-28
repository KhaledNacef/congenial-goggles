import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './nav.jsx';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post("http://51.178.80.154:3000/user/login", formData);
            Cookies.set('token', response.data.user.id);
            Navigate('/user');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Nav />
            <Grid container justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6} sx={{ display: isSmallScreen ? 'none' : 'block' }}>
                    <img
                        style={{
                            height: 'auto',
                            width: '100%',
                            maxHeight: 600,
                            backgroundSize: 'cover',
                            border: '1px solid black',
                            borderRadius: 20
                        }}
                        src="https://i.pinimg.com/736x/03/14/a0/0314a00783171a72b5bdbd5004675a43.jpg"
                        alt=""
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ padding: isSmallScreen ? 2 : 10 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>LOGIN</Typography>
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
                        label="Password"
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
                        LOGIN
                    </Button>
                    <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                        Admin? <Link to="/loginA">Login</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;
