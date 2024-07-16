import React, {  useState } from 'react';

import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Create from './create.jsx';
import Fixedd from './fixed.jsx';
import Allphone from './allphone.jsx';
import Wat from './wating.jsx';
import Deliv from './deliv.jsx';
import Refused from './refu.jsx';


export default function Phone() {
  
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
        <Button onClick={() => handleViewChange('create')} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px',backgroundColor: '#89ABE3FF',color:'black' }}>Ajouter un téléphone</Button>
        <Button onClick={() => { handleViewChange('paper') }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px',backgroundColor: '#89ABE3FF',color:'black' }}>Aujourd'hui</Button>
        <Button onClick={() => {  handleViewChange('ref')}} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px',backgroundColor: '#89ABE3FF',color:'black' }}>Téléphone refusé</Button>
        <Button onClick={() => { handleViewChange('fixed') }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px',backgroundColor: '#89ABE3FF',color:'black' }}>Téléphone réparé</Button>
        <Button onClick={() => { handleViewChange('waiting') }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px',backgroundColor: '#89ABE3FF',color:'black' }}>Téléphone en attente</Button>
        <Button onClick={() => {handleViewChange('all'); }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px',backgroundColor: '#89ABE3FF',color:'black' }}>Tous les téléphones</Button>

        <input type="text" onChange={handleSearchChange} placeholder="Rechercher par nom ou numéro" style={{ margin: '10px', padding: '8px', minWidth: '200px' }} />
      </Box>

      {view === 'create' ? <Create /> : null}
      {view === 'waiting' ? <Wat searchQuery={searchQuery} /> : null}
      {view === 'ref' ? <Refused searchQuery={searchQuery} /> : null}
      {view === 'paper' ? <Deliv  searchQuery={searchQuery}/> : null }
      {view === 'fixed' ? <Fixedd  searchQuery={searchQuery} /> : null}
      {view === 'all' ? <Allphone searchQuery={searchQuery} /> : null}
    </div>
  );
}
