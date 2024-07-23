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
import WidgetsIcon from '@mui/icons-material/Widgets'; // New icon for PC
import StoreIcon from '@mui/icons-material/Store'; // New icon for Vetrine
const logo = require('../../logo1.png');

const UserSidebar = ({ changevie }) => {
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const boxes = [
    { text: 'Tableau de bord', icon: <DashboardIcon sx={{ fontSize: 40 }} />, action: () => changevie('dashboard') },
    { text: 'Téléphones', icon: <PhoneIcon sx={{ fontSize: 40 }} />, action: () => changevie('phone') },
    { text: 'PC', icon: <WidgetsIcon sx={{ fontSize: 40 }} />, action: () => changevie('pc') }, // Updated icon for PC
    { text: 'Vitrine', icon: <StoreIcon sx={{ fontSize: 40 }} />, action: () => changevie('vetrine') }, // Updated icon for Vetrine

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
    Cookies.remove('token');

    // Rediriger vers la page de connexion
    navigate('/');
  };

  return (
    <Container sx={{ boxShadow: 20, bgcolor: '#89ABE3FF', height: 'auto', maxWidth: 250, borderRadius: 10, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ height: 'auto', width: 200, marginTop: 3, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', borderRadius: 10 }}>
        <img src={logo} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 30 }} alt="logo" />
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
              backgroundColor:'#FCF6F5FF',
              '&:hover': {
                backgroundColor: '#89ABE3FF',
                borderRadius: 6,
                color:'#FCF6F5FF'
              },
              color:'#89ABE3FF',
              borderRadius:6,
              fontWeight:600
            }}
            onClick={box.action}
          >
            <IconButton sx={{ width: 80, height: 60 }} color="#89ABE3FF" aria-label={box.text}>
              {box.icon}
            </IconButton>
            <Typography sx={{ fontSize: 19, textAlign: 'center', marginLeft: 2 }}>{box.text}</Typography>
          </Box>
        ))}

      </Box>
      <Box sx={{ height: 'auto', width: 200, marginTop: 3, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', borderRadius: 10 }}>
        <Button variant="contained" sx={{backgroundColor: '#FCF6F5FF',color:'#89ABE3FF',fontWeight:600}} onClick={handleLogout}>Déconnexion</Button>
      </Box>
    </Container>
  );
}

export default UserSidebar;
