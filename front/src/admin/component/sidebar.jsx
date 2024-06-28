import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';

const Sidebar = ({changevie}) => {
  return (
    <Container sx={{ bgcolor: 'white', height: '95vh', width: 300, borderRadius: 10, boxShadow: 2, marginLeft: 3, marginTop: 2 }}>
      <Box sx={{ border: '2px solid grey', borderRadius: 10, height: 200, width: 260, marginTop: 3, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <img src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/phone-repair-services-icon-logo-template-desi-design-4468ce8917b6b0bb6c8bb9e2148c384c_screen.jpg?ts=1670103536' style={{ width: 260, height: 200,backgroundColor:'black', objectFit: 'cover',borderRadius:30 }}  />   

      </Box>


      

      <Box sx={{ height: '50vh', width: 300, marginTop: 6, justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, border: '2px solid grey', borderRadius: 5, width: '80%', justifyContent: 'center' }}>
          <IconButton sx={{ width: 80, height: 80 }} color="primary" aria-label="dashboard" onClick={()=>changevie('dashboard')}>
            <DashboardIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography sx={{ fontSize: 18 }}>Dashboard</Typography>
        </Box>
       
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, border: '2px solid grey', borderRadius: 5, width: '80%', justifyContent: 'center' }}>
          <IconButton sx={{ width: 80, height: 80 }} color="primary" aria-label="users" onClick={()=>changevie('user')}>
            <PeopleIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography sx={{ fontSize: 18, marginLeft: 3 }}>Users</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, border: '2px solid grey', borderRadius: 5, width: '80%', justifyContent: 'center' }}>
          <IconButton sx={{ width: 80, height: 80 }} color="primary" aria-label="profile" onClick={()=>changevie('profile')}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography sx={{ fontSize: 18, marginLeft: 3 }}>Profile</Typography>
        </Box>
       
      </Box>

    </Container>
  );
}

export default Sidebar;
