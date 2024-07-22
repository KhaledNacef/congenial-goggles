import React, {  useState } from 'react';

import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Createpc from './createpc.jsx';
import Fixeddpc from './fixedpc.jsx';
import Allpc from './allpc.jsx';
import Watpc from './watingpc.jsx';
import Delivpc from './delivpc.jsx';
import Refusedpc from './refupc.jsx';


export default function Pc() {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('paper');


  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

 
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FCF6F5FF', borderRadius: 20, marginLeft: 3, border: '1px solid black' }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <Button onClick={() => handleViewChange('create')} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Ajouter un téléphone</Button>
        <Button onClick={() => { handleViewChange('paper') }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Aujourd'hui</Button>
        <Button onClick={() => {  handleViewChange('ref')}} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Téléphone refusé</Button>
        <Button onClick={() => { handleViewChange('fixed') }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Téléphone réparé</Button>
        <Button onClick={() => { handleViewChange('waiting') }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Téléphone en attente</Button>
        <Button onClick={() => {handleViewChange('all'); }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Tous les téléphones</Button>

        <input type="text" onChange={handleSearchChange} placeholder="Rechercher par nom ou numéro" style={{ margin: '10px', padding: '8px', minWidth: '200px' }} />
      </Box>

      {view === 'create' ? <Createpc /> : null}
      {view === 'waiting' ? <Watpc searchQuery={searchQuery} /> : null}
      {view === 'ref' ? <Refusedpc searchQuery={searchQuery} /> : null}
      {view === 'paper' ? <Delivpc  searchQuery={searchQuery}/> : null }
      {view === 'fixed' ? <Fixeddpc  searchQuery={searchQuery} /> : null}
      {view === 'all' ? <Allpc searchQuery={searchQuery} /> : null}
    </div>
  );
}
