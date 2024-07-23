import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import Cookies from 'js-cookie';

const Createpc = () => {
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
  const [id, setId] = useState(1); // Initialize ID to 0

 

  const handleSubmit = async () => {
    const data = {
      ref: id,
      brand: brand,
      pcHolder: clientName,
      holderNumber: clientNumber,
      serie: serie,
      problem: problem,
      remarque: remarque,
      cout: cout,
      maindoeuvre: maindoeuvre,
      accompte: accompte,
      price: price,
      delivredOn: deliveryDate,
      status: status,
      userId: userIdFromCookie
    };

    try {
      await axios.post('https://api.deviceshopleader.com/api/pc/create', data);
      // Clear form fields after successful submission
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

      // Increment ID for the next record
      setId(id + 1);

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
          Créer un PC <PhoneIcon />
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

export default Createpc;
