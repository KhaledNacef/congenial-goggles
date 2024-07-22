import React, {  useState } from 'react';

import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Createv from './createv.jsx';
import Fixeddv from './fixedv.jsx';
import Allvetrine from './allvetrine.jsx';
import Watv from './watingv.jsx';


export default function Vetrine() {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('waiting');


  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

 
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FCF6F5FF', borderRadius: 20, marginLeft: 3, border: '1px solid black' }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <Button onClick={() => handleViewChange('create')} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Ajouter un Produit</Button>
        <Button onClick={() => { handleViewChange('fixed') }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Produit réparé</Button>
        <Button onClick={() => { handleViewChange('waiting') }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Produit en attente</Button>
        <Button onClick={() => {handleViewChange('all'); }} variant="contained"  style={{ fontFamily: 'Kanit', fontWeight: 600, margin: '10px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF' }}>Tous les Produit</Button>

        <input type="text" onChange={handleSearchChange} placeholder="Rechercher par nom ou numéro" style={{ margin: '10px', padding: '8px', minWidth: '200px' }} />
      </Box>

      {view === 'create' ? <Createv /> : null}
      {view === 'waiting' ? <Watv searchQuery={searchQuery} /> : null}
      {view === 'fixed' ? <Fixeddv  searchQuery={searchQuery} /> : null}
      {view === 'all' ? <Allvetrine searchQuery={searchQuery} /> : null}
    </div>
  );
}
