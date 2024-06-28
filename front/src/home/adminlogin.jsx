import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './nav.jsx';
import Grid from '@mui/material/Grid';
import { useTheme, useMediaQuery, Typography, Box } from '@mui/material';

const Logina = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post("http://195.200.15.61/admin/login", formData);
            Cookies.set('token', response.data.user.id);
            navigate('/admin');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            <Nav />
            <Grid container style={{ height: '100vh' }} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                    <img
                        style={{
                            width: isSmallScreen ? '100%' : 800,
                            height: 'auto',
                            border: '1px solid black',
                            borderRadius: 20,
                            margin: 'auto'
                        }}
                        src="https://i.pinimg.com/736x/03/14/a0/0314a00783171a72b5bdbd5004675a43.jpg"
                        alt=""
                    />
                </Grid>
                <Grid item xs={12} md={6} style={{ padding: isSmallScreen ? '20px' : '180px' }}>
                    <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px' }}>LOGIN</Typography>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        sx={{
                            marginBottom: 2
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        sx={{
                            marginBottom: 2
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleLogin({
                            Password: password,
                            Email: email,
                        })}
                        sx={{
                            marginBottom: 2
                        }}
                    >
                        LOGIN
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Logina;
