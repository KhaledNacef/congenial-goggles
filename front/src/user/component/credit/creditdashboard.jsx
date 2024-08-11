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
  CircularProgress,
  Box,
} from '@mui/material';

const Creditdashboard = () => {
  const userIdFromCookie = Cookies.get('token');
  const baseUrl = 'https://api.deviceshopleader.com/api/credit';

  const [credits, setCredits] = useState([]);
  const [todayCredits, setTodayCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedPay, setUpdatedPay] = useState('');
  const [newCredit, setNewCredit] = useState({
    client: '',
    num: '',
    credit: '',
    pay: 0,
    date: '',
  });

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getcredit/${userIdFromCookie}`);
        setCredits(response.data);
        setLoading(false);

        const today = new Date().toISOString().split('T')[0];
        const filteredCredits = response.data.filter(credit => credit.date === today);
        setTodayCredits(filteredCredits);
      } catch (err) {
        setError('Échec du chargement des crédits');
        setLoading(false);
      }
    };

    fetchCredits();
  }, [userIdFromCookie]);

  const handleUpdateCredit = async (creditId) => {
    if (updatedPay === 0) return; // Skip update if pay is 0

    try {
      await axios.put(`${baseUrl}/updatedate/${userIdFromCookie}/${creditId}`, { date: updatedDate });
      await axios.put(`${baseUrl}/updatepay/${userIdFromCookie}/${creditId}`, { pay: updatedPay });
      alert('Crédit mis à jour avec succès');
      window.location.reload(); // Refresh the page to reflect updates
    } catch (err) {
      alert('Échec de la mise à jour du crédit');
    }
  };

  const handleCreateCredit = async () => {
    try {
      await axios.post(`${baseUrl}/createc`, { ...newCredit, userId: userIdFromCookie });
      alert('Crédit créé avec succès');
      window.location.reload(); // Refresh the page to reflect updates
    } catch (err) {
      alert('Échec de la création du crédit');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        {/* Create Credit Section */}
        <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Créer un nouveau crédit
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Client"
              value={newCredit.client}
              onChange={(e) => setNewCredit({ ...newCredit, client: e.target.value })}
              required
            />
            <TextField
              label="Numéro"
              value={newCredit.num}
              onChange={(e) => setNewCredit({ ...newCredit, num: e.target.value })}
              required
            />
            <TextField
              label="Crédit"
              value={newCredit.credit}
              onChange={(e) => setNewCredit({ ...newCredit, credit: e.target.value })}
              required
              type="number"
            />
           
           
            <TextField
              label="Date"
              type="date"
              value={newCredit.date}
              onChange={(e) => setNewCredit({ ...newCredit, date: e.target.value })}
              required
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" color="primary" onClick={handleCreateCredit}>
              Créer
            </Button>
          </Box>
        </Paper>

        {/* First Section: All Credits */}
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
                  <TableCell>Crédit</TableCell>
                  <TableCell>Payé</TableCell>
                  <TableCell>Reste</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {credits.map((credit) => (
                  <TableRow key={credit.id}>
                    <TableCell>{credit.client}</TableCell>
                    <TableCell>{credit.num}</TableCell>
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

        {/* Second Section: Today's Credits */}
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
      </Box>
    </Container>
  );
};

export default Creditdashboard;
