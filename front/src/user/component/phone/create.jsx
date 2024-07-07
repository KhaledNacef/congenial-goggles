import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import Cookies from 'js-cookie';

const Create = () => {
  const userIdFromCookie = Cookies.get('token');
  const [brand, setBrand] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [problem, setProblem] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = async () => {
    const data = {
      brand: brand,
      phoneHolder: clientName,
      holderNumber: clientNumber,
      price: 0,
      problem: problem,
      delivredOn: deliveryDate,
      status: 'waiting',
      userId: userIdFromCookie
    };

    try {
      await axios.post('https://api.deviceshopleader.com/api/phone/crate', data);
      setBrand('');
      setClientName('');
      setClientNumber('');
      setProblem('');
      setDeliveryDate(new Date().toISOString().slice(0, 10));
      // Handle success feedback to the user if needed
    } catch (error) {
      console.log(error);
      // Handle error feedback to the user if needed
    }
  };

  return (
    <Container sx={{ marginTop: 5, width: '100%', maxWidth: 600 }}>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
        <Typography variant='h3' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 3, textAlign: 'center' }}>
          Créer un téléphone <PhoneIcon />
        </Typography>

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
          label="Problème"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
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
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
        >
          Soumettre
        </Button>
      </Box>
    </Container>
  );
};

export default Create;
