import React, { useState } from 'react';
import Sidebar from './component/usersidenav.jsx';
import Phone from './component/phone/phone.jsx';
import Dashboard from './component/udashboad.jsx';
import Profile from './component/profile.jsx';
import Product from './component/product/product.jsx';
import Forum from './component/forum.jsx';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Pc from './component/pc/pc.jsx';
import Vetrine from './component/vetrine/vetrine.jsx';
import Creditdashboard from './component/credit/creditdashboard.jsx';

const User = () => {
  const [vie, setVie] = useState('dashboard');

  const changevie = (name) => {
    setVie(name);
  };

  return (
    <Container maxWidth="xxl" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FCF6F5FF', padding: 0 }}>
      {/* Sidebar fixed on the left */}
      <Box style={{ width: 250, flexShrink: 0 }}>
        <Sidebar changevie={changevie} />
      </Box>

      {/* Main content area taking up remaining space */}
      <Box style={{ flex: 1, padding: '20px',backgroundColor:'#FCF6F5FF' }}>
        {vie === 'Uprofile' && <Profile />}
        {vie === 'phone' && <Phone />}
        {vie === 'dashboard' && <Dashboard />}
        {vie === 'Product' && <Product />}
        {vie === 'pc' && <Pc />}
        {vie === 'vetrine' && <Vetrine />}
        {vie === 'Credit' && <Creditdashboard />}

      </Box>
    </Container>
  );
}

export default User;
