import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import ProductIcon from '@mui/icons-material/LocalMall';
import Cookies from 'js-cookie';

export default function Creproduct() {
  // State variables to store form inputs
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState('');
  const userIdFromCookie = Cookies.get('token');

  // Function to handle form submission
  const handleSubmit = async () => {
    const formData = {
      name: name,
      price: price,
      quantity: quantity,
      image: image,
      userId: userIdFromCookie
    };

    try {
      await axios.post('http://195.200.15.61/product/products', formData);
      // Reset form fields after successful submission
      setName('');
      setPrice(0);
      setQuantity(0);
      setImage('');
      // You may want to add logic to handle success/failure feedback to the user
    } catch (error) {
      console.log(error);
      // You may want to add logic to handle error feedback to the user
    }
  };

  return (
    <Container maxWidth="sm" sx={{ fontFamily: 'Kanit', fontWeight: 500, boxShadow: 20, marginTop: 5, backgroundColor: 'white', borderRadius: 8, border: '1px solid grey', padding: '20px' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h4' sx={{ marginBottom: 3, marginTop: 3 }}>Create Product <ProductIcon /></Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          type="number"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          type="number"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}
