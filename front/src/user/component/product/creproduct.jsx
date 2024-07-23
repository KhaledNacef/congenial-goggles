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
  const [priceU, setPriceU] = useState(0);
  const [id, setId] = useState(1); // Initialize auto-increment ID

  const userIdFromCookie = Cookies.get('token');

  // Function to handle form submission
  const handleSubmit = async () => {
    const formData = {
      ref:id,
      name: name,
      price: price,
      buyprice:priceU,
      quantity: quantity,
      image: image,
      userId: userIdFromCookie
    };

    try {
      await axios.post('https://api.deviceshopleader.com/api/product/products', formData);
      // Reset form fields after successful submission
      setName('');
      setPrice(0);
      setQuantity(0);
      setImage('');
      setPriceU(0)
      setId(id + 1); // Increment the ID for the next record

      // You may want to add logic to handle success/failure feedback to the user
    } catch (error) {
      console.log(error);
      // You may want to add logic to handle error feedback to the user
    }
  };

  return (
    <Container maxWidth="sm" sx={{ fontFamily: 'Kanit', fontWeight: 500, boxShadow: 20, marginTop: 5, backgroundColor: '#FCF6F5FF', borderRadius: 8, border: '1px solid grey', padding: '20px' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h4' sx={{ marginBottom: 3, marginTop: 3 }}>Créer un Produit <ProductIcon /></Typography>
        <TextField
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Prix U"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          type="number"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Prix d'Achat U"
          value={priceU}
          onChange={(e) => setPriceU(e.target.value)}
          fullWidth
          type="number"
          required
          sx={{ marginBottom: 2 }}
        />
       
        <TextField
          label="Quantité"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          type="number"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="URL de l'Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <Button onClick={handleSubmit} variant="contained"  fullWidth style={{ marginTop: '16px',backgroundColor: '#89ABE3FF',color:'#FCF6F5FF',fontWeight:500 }}>
          Creé
        </Button>
      </Box>
    </Container>
  );
}
