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
} from '@mui/material';

const Creditdashboard = () => {
  const userIdFromCookie = Cookies.get('token');

  const [credits, setCredits] = useState([]);
  const [todayCredits, setTodayCredits] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [updateField, setUpdateField] = useState(''); // 'date' or 'pay'
  const [selectedCreditId, setSelectedCreditId] = useState(null);
  const [view, setView] = useState('create'); // State for view

  const fetchCredits = async () => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/credit/getcredit/${userIdFromCookie}`);
      const allCredits = response.data;
      setCredits(allCredits);
  
      // Get current date components
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
  
      // Filter credits for today
      const filteredCredits = allCredits.filter(credit => {
        const creditDate = new Date(credit.date);
        return creditDate.getDate() === currentDate.getDate() &&
               creditDate.getMonth() + 1 === currentMonth &&
               creditDate.getFullYear() === currentYear;
      });
  
      setTodayCredits(filteredCredits);
    } catch (err) {
      console.error('Error fetching credits:', err);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const handleUpdate = async () => {
    if (!selectedCreditId || !inputValue) {
      alert('Tous les champs sont requis.');
      return;
    }

    try {
      if (updateField === 'date') {
        await axios.put(`https://api.deviceshopleader.com/api/credit/updatedate/${userIdFromCookie}/${selectedCreditId}`, { data: inputValue });
      } else if (updateField === 'pay') {
        await axios.put(`https://api.deviceshopleader.com/api/credit/updatepay/${userIdFromCookie}/${selectedCreditId}`, { data: inputValue });
      }
      alert('Mise à jour réussie');
      setInputValue('');
      setSelectedCreditId(null);
      setUpdateField('');
      fetchCredits();
    } catch (err) {
      alert('Échec de la mise à jour');
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
      datee: date,
      desc: desc,
      userId: userIdFromCookie
    };
    try {
      await axios.post(`https://api.deviceshopleader.com/api/credit/createc`, data);
      alert('Crédit créé avec succès');
      fetchCredits();
    } catch (err) {
      alert('Échec de la création du crédit');
    }
  };

  const handleDeleteCredit = async (creditId) => {
    try {
      await axios.delete(`https://api.deviceshopleader.com/api/credit/deletec/${userIdFromCookie}/${creditId}`);
      setCredits(credits.filter(credit => credit.id !== creditId));
      setTodayCredits(todayCredits.filter(credit => credit.id !== creditId));
      alert('Crédit supprimé avec succès');
      fetchCredits();
    } catch (err) {
      alert('Échec de la suppression du crédit');
    }
  };

  const handleUpdateClick = (creditId, field) => {
    setSelectedCreditId(creditId);
    setUpdateField(field);
    setInputValue(''); // Clear the input field
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant={view === 'create' ? 'contained' : 'outlined'}
            onClick={() => setView('create')}
            sx={{ mr: 2 }}
          >
            Créer un Crédit
          </Button>
          <Button
            variant={view === 'all' ? 'contained' : 'outlined'}
            onClick={() => setView('all')}
            sx={{ mr: 2 }}
          >
            Voir Tous les Crédits
          </Button>
          <Button
            variant={view === 'today' ? 'contained' : 'outlined'}
            onClick={() => setView('today')}
          >
            Voir Crédits d'Aujourd'hui
          </Button>
        </Box>

        {view === 'create' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Créer un nouveau crédit
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Add your TextFields here for creating a credit */}
                  <Button variant="contained" color="primary" onClick={handleCreateCredit}>
                    Créer
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {view === 'all' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                          <TableCell>{credit.credit - credit.pay}</TableCell>
                          <TableCell>{credit.datee}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDeleteCredit(credit.id)}
                            >
                              Supprimer
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateClick(credit.id, 'date')}
                              sx={{ ml: 2 }}
                            >
                              Modifier Date
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleUpdateClick(credit.id, 'pay')}
                              sx={{ ml: 2 }}
                            >
                              Modifier Payé
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
        )}

        {view === 'today' && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                          <TableCell>{credit.credit - credit.pay}</TableCell>
                          <TableCell>{credit.datee}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateClick(credit.id, 'date')}
                            >
                              Modifier Date
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleUpdateClick(credit.id, 'pay')}
                              sx={{ ml: 2 }}
                            >
                              Modifier Payé
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
        )}

        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {updateField === 'date' ? 'Modifier Date' : 'Modifier Payé'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label={updateField === 'date' ? 'Nouvelle Date' : 'Montant Payé'}
              type={updateField === 'date' ? 'date' : 'number'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Mettre à Jour
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Creditdashboard;
