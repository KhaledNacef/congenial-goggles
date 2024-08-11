import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';

const Creditdashboard = () => {
  const userIdFromCookie = Cookies.get('token');
  const baseUrl = 'https://api.deviceshopleader.com/api/credit';

  const [credits, setCredits] = useState([]);
  const [todayCredits, setTodayCredits] = useState([]);
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedPay, setUpdatedPay] = useState(0);
  const [client, setClient] = useState('');
  const [num, setNum] = useState('');
  const [credit, setCredit] = useState(0);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getcredit/${userIdFromCookie}`);
        setCredits(response.data);

        const today = new Date().toISOString().split('T')[0];
        const filteredCredits = response.data.filter(credit => credit.date === today);
        setTodayCredits(filteredCredits);
      } catch (err) {
        console.error('Error fetching credits:', err);
      }
    };

    fetchCredits();
  }, [userIdFromCookie]);

  const handleUpdateCredit = async (creditId) => {
    if (updatedDate) {
        try {
            await axios.put(`${baseUrl}/updatedate/${userIdFromCookie}/${creditId}`, { date: updatedDate });
            
            alert('Crédit mis à jour avec succès');
          } catch (err) {
            alert('Échec de la mise à jour du crédit');
          }
    }

    try {
      if (updatedPay > 0) {
        await axios.put(`${baseUrl}/updatepay/${userIdFromCookie}/${creditId}`, { pay: updatedPay });
      }
      alert('Crédit mis à jour avec succès');
    } catch (err) {
      alert('Échec de la mise à jour du crédit');
    }
  };

  const handleCreateCredit = async () => {
    if (!client || !num || !credit || !date) {
      alert('Tous les champs sont requis.');
      return;
    }

    const data = {
      client: client,
      num: num,
      credit: credit,
      pay: 0,
      rest: 0,
      date: date,
      desc: desc,
      userId: userIdFromCookie
    };
    try {
      await axios.post(`${baseUrl}/createc`, data);
      alert('Crédit créé avec succès');
    } catch (err) {
      alert('Échec de la création du crédit');
    }
  };

  const handleDeleteCredit = async (creditId) => {
    try {
      await axios.delete(`${baseUrl}/deletec/${userIdFromCookie}/${creditId}`);
      
      alert('Crédit supprimé avec succès');
    } catch (err) {
      alert('Échec de la suppression du crédit');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          {/* Create Credit Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Créer un nouveau crédit
              </Typography>
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Client"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  required
                />
                <TextField
                  label="Numéro"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                  required
                />
                <TextField
                  label="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
                <TextField
                  label="Crédit"
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                  required
                  type="number"
                />
                <TextField
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <Button variant="contained" color="primary" onClick={handleCreateCredit}>
                  Créer
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* First Section: All Credits */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tous les crédits
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Client</TableCell>
                      <TableCell>Numéro</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Crédit</TableCell>
                      <TableCell>Payé</TableCell>
                      <TableCell>Reste</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {credits.map((credit) => (
                      <TableRow key={credit.id}>
                        <TableCell>{credit.client}</TableCell>
                        <TableCell>{credit.num}</TableCell>
                        <TableCell>{credit.desc}</TableCell>
                        <TableCell>{credit.credit}</TableCell>
                        <TableCell>{credit.pay}</TableCell>
                        <TableCell>{credit.rest}</TableCell>
                        <TableCell>{credit.date}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteCredit(credit.id)}
                          >
                            Supprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Second Section: Today's Credits */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Crédits d'aujourd'hui
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Client</TableCell>
                      <TableCell>Numéro</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Crédit</TableCell>
                      <TableCell>Payé</TableCell>
                      <TableCell>Reste</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayCredits.map((credit) => (
                      <TableRow key={credit.id}>
                        <TableCell>{credit.client}</TableCell>
                        <TableCell>{credit.num}</TableCell>
                        <TableCell>{credit.desc}</TableCell>
                        <TableCell>{credit.credit}</TableCell>
                        <TableCell>{credit.pay}</TableCell>
                        <TableCell>{credit.rest}</TableCell>
                        <TableCell>{credit.date}</TableCell>
                        <TableCell>
                          <TextField
                            type="date"
                            value={updatedDate}
                            onChange={(e) => setUpdatedDate(e.target.value)}
                            size="small"
                            sx={{ mr: 2 }}
                          />
                          <TextField
                            type="number"
                            value={updatedPay}
                            onChange={(e) => setUpdatedPay(e.target.value)}
                            placeholder="Nouveau paiement"
                            size="small"
                            sx={{ mr: 2 }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdateCredit(credit.id)}
                          >
                            Mettre à jour
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Creditdashboard;
