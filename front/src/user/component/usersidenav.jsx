import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneIcon from '@mui/icons-material/Phone';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const logo = require('../../logo1.png');

const UserSidebar = ({ changevie }) => {
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const boxes = [
    { text: 'Tableau de bord', icon: <DashboardIcon sx={{ fontSize: 40 }} />, action: () => changevie('dashboard') },
    { text: 'Téléphones', icon: <PhoneIcon sx={{ fontSize: 40 }} />, action: () => changevie('phone') },
    { text: 'Magasin', icon: <StorefrontIcon sx={{ fontSize: 40 }} />, action: () => changevie('Product') },
    { text: 'Profil', icon: <PersonIcon sx={{ fontSize: 40 }} />, action: () => changevie('Uprofile') },
  ];

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/user/${id}`);
      setData(response.data.Name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userIdFromCookie = Cookies.get('token');
    fetchData(userIdFromCookie);
  }, []);

  const handleLogout = () => {
    // Supprimer le token des cookies
    localStorage.removeItem('token');

    // Rediriger vers la page de connexion
    navigate('/');
  };

  return (
    <Container sx={{ boxShadow: 20, bgcolor: 'grey', height: 'auto', maxWidth: 250, borderRadius: 10, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ height: 'auto', width: 200, marginTop: 3, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', borderRadius: 10 }}>
        <img src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/phone-repair-services-icon-logo-template-desi-design-4468ce8917b6b0bb6c8bb9e2148c384c_screen.jpg?ts=1670103536' style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 30 }} alt="logo" />
      </Box>

      <Box sx={{ height: 'auto', width: '100%', marginTop: 6, justifyContent: 'center', alignItems: 'center' }}>
        {/* Mapper sur le tableau "boxes" pour afficher chaque boîte */}
        {boxes.map((box, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              marginBottom: 2,
              width: '100%',
              justifyContent: 'center',
              transition: 'background-color 0.3s',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#89c4f4',
                borderRadius: 10
              }
            }}
            onClick={box.action}
          >
            <IconButton sx={{ width: 80, height: 60 }} color="primary" aria-label={box.text.toLowerCase()}>
              {box.icon}
            </IconButton>
            <Typography sx={{ fontSize: 18, textAlign: 'center', marginLeft: 2 }}>{box.text}</Typography>
          </Box>
        ))}

      </Box>
      <Box sx={{ height: 'auto', width: 200, marginTop: 3, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', borderRadius: 10 }}>
        <Button variant="contained" color="primary" onClick={handleLogout}>Déconnexion</Button>
        <img src={logo} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 30 }} alt="logo" />
      </Box>
    </Container>
  );
}

export default UserSidebar;
