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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const [selectedCreditId, setSelectedCreditId] = useState(null);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [openPayDialog, setOpenPayDialog] = useState(false);
  const [view, setView] = useState('create'); // New state for view

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

  useEffect(() => {
    fetchCredits();
  }, [userIdFromCookie]);

  const handleUpdateDate = async () => {
    if (updatedDate) {
      try {
        await axios.put(`${baseUrl}/updatedate/${userIdFromCookie}/${selectedCreditId}`, { date: updatedDate });
        alert('Date mise à jour avec succès');
        setOpenDateDialog(false);
        setUpdatedDate('');
        fetchCredits();
      } catch (err) {
        alert('Échec de la mise à jour de la date');
      }
    } else {
      alert('La date est requise.');
    }
  };

  const handleUpdatePay = async () => {
    if (updatedPay >= 0) {
      try {
        await axios.put(`${baseUrl}/updatepay/${userIdFromCookie}/${selectedCreditId}`, { pay: updatedPay });
        alert('Montant payé mis à jour avec succès');
        setOpenPayDialog(false);
        setUpdatedPay(0);
        fetchCredits();
      } catch (err) {
        alert('Échec de la mise à jour du montant payé');
      }
    } else {
      alert('Le montant payé ne peut pas être négatif.');
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
      fetchCredits();
    } catch (err) {
      alert('Échec de la création du crédit');
    }
  };

  const handleDeleteCredit = async (creditId) => {
    try {
      await axios.delete(`${baseUrl}/deletec/${userIdFromCookie}/${creditId}`);
      setCredits(credits.filter(credit => credit.id !== creditId));
      setTodayCredits(todayCredits.filter(credit => credit.id !== creditId));
      alert('Crédit supprimé avec succès');
      fetchCredits();
    } catch (err) {
      alert('Échec de la suppression du crédit');
    }
  };

  const openDateDialogHandler = (creditId) => {
    setSelectedCreditId(creditId);
    setOpenDateDialog(true);
  };

  const openPayDialogHandler = (creditId) => {
    setSelectedCreditId(creditId);
    setOpenPayDialog(true);
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
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => openDateDialogHandler(credit.id)}
                              sx={{ ml: 2 }}
                            >
                              Modifier Date
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => openPayDialogHandler(credit.id)}
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* Date Update Dialog */}
      <Dialog open={openDateDialog} onClose={() => setOpenDateDialog(false)}>
        <DialogTitle>Modifier la Date</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDateDialog(false)}>Annuler</Button>
          <Button onClick={handleUpdateDate} color="primary">
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pay Update Dialog */}
      <Dialog open={openPayDialog} onClose={() => setOpenPayDialog(false)}>
        <DialogTitle>Modifier le Montant Payé</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            value={updatedPay}
            onChange={(e) => setUpdatedPay(e.target.value)}
            fullWidth
            placeholder="Nouveau montant payé"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPayDialog(false)}>Annuler</Button>
          <Button onClick={handleUpdatePay} color="primary">
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Creditdashboard;
