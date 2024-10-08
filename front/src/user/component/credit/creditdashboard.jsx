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
  const [inputValues, setInputValues] = useState(""); // Stores input values for each row
  const [updateField, setUpdateField] = useState(''); // 'date' or 'pay'
  const [selectedCreditId, setSelectedCreditId] = useState(null);
  const [view, setView] = useState('create'); // State for view
  const [client, setClient] = useState('');
  const [num, setNum] = useState(0);
  const [credit, setCredit] = useState(0);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [searchQuery, setSearchQuery] = useState('');




  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const fetchCredits = async () => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/credit/getcredit/${userIdFromCookie}`);
      const allCredits = response.data;
      
      // Filter credits where pay is not equal to credit
      const filteredCredits = allCredits.filter((credit) => credit.pay !== credit.credit);
  
      // Set the filtered credits to state
      setCredits(filteredCredits);
  
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
  
      // Filter credits for today
      const todayCredits = filteredCredits.filter((credit) => {
        const creditDate = new Date(credit.datee);
        return (
          creditDate.getDate() === currentDate.getDate() &&
          creditDate.getMonth() + 1 === currentMonth &&
          creditDate.getFullYear() === currentYear&&
          credit.pay !== credit.credit
        );
      });
  
      // Set today's credits to state
      setTodayCredits(todayCredits);
    } catch (err) {
      console.error('Error fetching credits:', err);
    }
  };
  

  useEffect(() => {
    fetchCredits();
  }, []);

  const handleUpdateDate = async (creditId) => {
    try {
      await axios.put(`https://api.deviceshopleader.com/api/credit/updatedate/${userIdFromCookie}/${creditId}/${inputValues}`);
      alert('Date mise à jour avec succès');
      setInputValues('');
      setSelectedCreditId(null);
      setUpdateField('');
      fetchCredits();
    } catch (err) {
      alert('Échec de la mise à jour de la date');
    }
  };

  const handleUpdatePay = async (creditId) => {
    try {
      await axios.put(`https://api.deviceshopleader.com/api/credit/updatepay/${userIdFromCookie}/${creditId}/${inputValues}` );
      alert('Montant payé mis à jour avec succès');
      setInputValues('');
      setSelectedCreditId(null);
      setUpdateField('');
      fetchCredits();
    } catch (err) {
      alert('Échec de la mise à jour du montant payé');
    }
  };

  const handleCreateCredit = async () => {
    if (!client || !num || !credit || !date) {
      alert('Tous les champs sont requis.');
      return;
    }

    const data = {
      client,
      num,
      credit,
      pay: 0,
      rest: 0,
      datee: date,
      desc,
      userId: userIdFromCookie,
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
      setCredits(credits.filter((credit) => credit.id !== creditId));
      setTodayCredits(todayCredits.filter((credit) => credit.id !== creditId));
      alert('Crédit supprimé avec succès');
      fetchCredits();
    } catch (err) {
      alert('Échec de la suppression du crédit');
    }
  };

  const handleUpdateClick = (creditId, field) => {
    setSelectedCreditId(creditId);
    setUpdateField(field);
  };

  const filteredData = credits.filter((row) =>
    row.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.num.toString().includes(searchQuery)
  );
    const filteredDataT = todayCredits.filter((row) =>
    row.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.num.toString().includes(searchQuery)
  );
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
        <input type="text" onChange={handleSearchChange} placeholder="Rechercher par nom ou numéro" style={{ margin: '10px', padding: '8px', minWidth: '200px' }} />

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
                      {filteredData.map((credit) => (
                        <TableRow key={credit.id}>
                          <TableCell>{credit.client}</TableCell>
                          <TableCell>{credit.num}</TableCell>
                          <TableCell>{credit.desc}</TableCell>
                          <TableCell>{credit.credit} DT</TableCell>
                          <TableCell>{credit.pay} DT</TableCell>
                          <TableCell>{credit.credit - credit.pay} DT</TableCell>
                          <TableCell>{credit.datee}</TableCell>
                          <TableCell>
                            {selectedCreditId === credit.id ? (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                  label={updateField === 'date' ? 'Nouvelle Date' : 'Montant Payé'}
                                  type={updateField === 'date' ? 'date' : 'number'}
                                  value={inputValues}
                                  onChange={(e) => setInputValues(e.target.value)}
                                  size="small"
                                  sx={{ mr: 2 }}
                                />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => updateField === 'date' ? handleUpdateDate(credit.id) : handleUpdatePay(credit.id)}
                                >
                                  Mettre à Jour
                                </Button>
                              </Box>
                            ) : (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleUpdateClick(credit.id, 'date')}
                                  sx={{ mr: 1 }}
                                >
                                  Modifier Date
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleUpdateClick(credit.id, 'pay')}
                                  sx={{ mr: 1 }}
                                >
                                  Modifier Paiement
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDeleteCredit(credit.id)}
                                >
                                  Supprimer
                                </Button>
                              </>
                            )}
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
                      {filteredDataT.map((credit) => (
                        <TableRow key={credit.id}>
                          <TableCell>{credit.client}</TableCell>
                          <TableCell>{credit.num}</TableCell>
                          <TableCell>{credit.desc}</TableCell>
                          <TableCell>{credit.credit} DT</TableCell>
                          <TableCell>{credit.pay} DT</TableCell>
                          <TableCell>{credit.credit - credit.pay} DT</TableCell>
                          <TableCell>{credit.datee}</TableCell>
                          <TableCell>
                            {selectedCreditId === credit.id ? (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                  label={updateField === 'date' ? '' : 'Montant Payé'}
                                  type={updateField === 'date' ? 'date' : 'number'}
                                  value={inputValues}
                                  onChange={(e) => setInputValues( e.target.value)}
                                  size="small"
                                  sx={{ mr: 2 }}
                                />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => updateField === 'date' ? handleUpdateDate(credit.id) : handleUpdatePay(credit.id)}
                                >
                                  Mettre à Jour
                                </Button>
                              </Box>
                            ) : (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleUpdateClick(credit.id, 'date')}
                                  sx={{ mr: 1 }}
                                >
                                  Modifier Date
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleUpdateClick(credit.id, 'pay')}
                                  sx={{ mr: 1 }}
                                >
                                  Modifier Paiement
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDeleteCredit(credit.id)}
                                >
                                  Supprimer
                                </Button>
                              </>
                            )}
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
      </Box>
    </Container>
  );
};

export default Creditdashboard;
