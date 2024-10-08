import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import Cookies from 'js-cookie';

const Create = () => {
  const userIdFromCookie = Cookies.get('token');

  const [brand, setBrand] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [serie, setSerie] = useState('');
  const [problem, setProblem] = useState('');
  const [remarque, setRemarque] = useState('');
  const [cout, setCout] = useState(0);
  const [maindoeuvre, setMaindoeuvre] = useState(0);
  const [accompte, setAccompte] = useState(0);
  const [price, setPrice] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState('waiting');
  const [id, setId] = useState(1);
  const [data, setData] = useState([]);

  const getall = async () => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/phone/all/${userIdFromCookie}`);
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
      ref: id,
      brand,
      phoneHolder: clientName,
      holderNumber: clientNumber,
      serie,
      problem,
      remarque,
      cout,
      maindoeuvre,
      accompte,
      price,
      delivredOn: deliveryDate,
      status,
      userId: userIdFromCookie
    };

    try {
      await axios.post('https://api.deviceshopleader.com/api/phone/tel/crate', data);

      setBrand('');
      setClientName('');
      setClientNumber('');
      setSerie('');
      setProblem('');
      setRemarque('');
      setCout(0);
      setMaindoeuvre(0);
      setAccompte(0);
      setPrice(0);
      setDeliveryDate(new Date().toISOString().slice(0, 10));
      setStatus('waiting');

      getall();


    } catch (error) {
      console.log(error);
      // Handle error feedback to the user if needed
    }
  };

  return (
    <Container sx={{ marginTop: 5, width: '100%', maxWidth: 600, backgroundColor: '#FCF6F5FF' }}>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
        <Typography variant='h3' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 3, textAlign: 'center' }}>
          Créer un téléphone <PhoneIcon />
        </Typography>
        <TextField
          label="ID"
          value={id}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
          type="number"
          InputProps={{ readOnly: true }}
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
          label="Nom du client"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Numéro du client"
          value={clientNumber}
          onChange={(e) => setClientNumber(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Serie"
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
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Remarque"
          value={remarque}
          onChange={(e) => setRemarque(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Cout"
          value={cout}
          onChange={(e) => setCout(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Main d'oeuvre"
          value={maindoeuvre}
          onChange={(e) => setMaindoeuvre(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Accompte"
          value={accompte}
          onChange={(e) => setAccompte(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Date de livraison"
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          fullWidth
          required
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

export default Create;
