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
      await axios.post('http://195.200.15.61/phone/crate', data);
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
          Create Phone <PhoneIcon />
        </Typography>

        <TextField
          label="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Client Number"
          value={clientNumber}
          onChange={(e) => setClientNumber(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Delivered On"
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
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Create;
