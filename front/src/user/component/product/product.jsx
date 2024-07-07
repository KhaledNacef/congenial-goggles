import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Creproduct from './creproduct.jsx';
import Allproduct from './allproduct.jsx';
import SoldedP from './soldedP.jsx';

const Product = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dataA, setDataA] = useState([]);
  const [view, setView] = useState('all');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = dataA.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const changeview = (name) => {
    setView(name);
  };

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: 'white', borderRadius: 20, marginLeft: 3, border: '1px solid black' }}>
      <Box sx={{ boxShadow: 20, display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', border: '1px solid grey', borderRadius: 10, padding: 1, backgroundColor: 'white', margin: 'auto', height: 65, marginBottom: 5, width: '95%', maxWidth: 1200, marginTop: 10 }}>
        <Button onClick={() => changeview('create')} variant="contained" color="primary" style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px', flex: 1 }}>AJOUTER UN PRODUIT</Button>
        <Button onClick={() => changeview('all')} variant="contained" color="primary" style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px', flex: 1 }}>TOUS LES PRODUITS</Button>
        <Button onClick={() => changeview('sold')} variant="contained" color="primary" style={{ fontFamily: 'Kanit', fontWeight: 500, margin: '10px', flex: 1 }}>PRODUITS VENDUS</Button>
        <input type="text" onChange={handleSearchChange} placeholder="Rechercher par nom" style={{ margin: '10px', padding: '8px', flex: 2 }} />
      </Box>

      {view === 'create' ? <Creproduct /> : null}
      {view === 'all' ? <Allproduct filteredData={filteredData} setDataA={setDataA} /> : null}
      {view === 'sold' ? <SoldedP filteredData={filteredData} setDataA={setDataA} /> : null}
    </div>
  );
};

export default Product;
