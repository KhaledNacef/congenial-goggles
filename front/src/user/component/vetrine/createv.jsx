import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import Cookies from 'js-cookie';

const Createv = () => {
  const userIdFromCookie = Cookies.get('token');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [serie, setSerie] = useState('');
  const [problem, setProblem] = useState('');
  const [cout, setCout] = useState(0);
  const [maindoeuvre, setMaindoeuvre] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState('waiting');
  const [id, setId] = useState(1); // Initialize auto-increment ID
  const [data, setData] = useState([]);

  const baseUrl = 'https://api.deviceshopleader.com/api';
  const getall = async () => {
    try {
      const response = await axios.get(`${baseUrl}/vetrine/vetrinesgetall/${userIdFromCookie}`);
      setData(response.data);
      const maxId = response.data.reduce((max, pc) => (pc.ref > max ? pc.ref : max), 0);
      setId(maxId + 1);
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les données :', error);
    }
  };

  useEffect(() => {
    getall();
  }, []);

  const handleSubmit = async () => {
    const data = {
      ref:id,
      brand:brand,
      type:type,
      serie:serie,
      problem:problem,
      cout: cout,
      maindoeuvre:maindoeuvre,
      price:price,
      status:status,
      userId: userIdFromCookie
    };

    try {
      await axios.post('https://api.deviceshopleader.com/api/vetrine/vetrines', data);
      setBrand('');
      setType('');
      setSerie('');
      setProblem('');
      setCout('');
      setMaindoeuvre('');
      setPrice('');
      setStatus('waiting');
      getall();

      // Handle success feedback to the user if needed
    } catch (error) {
      console.log(error);
      // Handle error feedback to the user if needed
    }
  };

  return (
    <Container sx={{ marginTop: 5, width: '100%', maxWidth: 600, backgroundColor: '#FCF6F5FF' }}>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
        <Typography variant='h3' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 3, textAlign: 'center' }}>
          Créer un produit <PhoneIcon />
        </Typography>
        <TextField
          label="ID"
          value={id}
          onChange={(e) => setId(parseInt(e.target.value, 10))}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
          type="number"
        />

        <TextField
          label="Marque"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Série"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Problème"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          fullWidth
          required
          multiline
          rows={4} // Adjust the number of rows as needed
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Coût"
          value={cout}
          onChange={(e) => setCout(e.target.value)}
          fullWidth
          required
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Main d'oeuvre"
          value={maindoeuvre}
          onChange={(e) => setMaindoeuvre(e.target.value)}
          fullWidth
          required
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ marginBottom: 2 }}
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{ marginTop: 3, backgroundColor: '#89ABE3FF', color: '#FCF6F5FF' }}
        >
          Soumettre
        </Button>
      </Box>
    </Container>
  );
};

export default Createv;
