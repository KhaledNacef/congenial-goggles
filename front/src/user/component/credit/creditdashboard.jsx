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
        setError('Failed to fetch credits');
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
      alert('Credit updated successfully');
      window.location.reload(); // Refresh the page to reflect updates
    } catch (err) {
      alert('Failed to update credit');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Credit Dashboard
        </Typography>

        {/* First Section: All Credits */}
        <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            All Credits
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Numéro</TableCell>
                  <TableCell>Credit</TableCell>
                  <TableCell>Pay</TableCell>
                  <TableCell>Rest</TableCell>
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
            Today's Credits
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Client</TableCell>
                  <TableCell>Numéro</TableCell>
                  <TableCell>Credit</TableCell>
                  <TableCell>Pay</TableCell>
                  <TableCell>Rest</TableCell>
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
                        placeholder="New Pay"
                        size="small"
                        sx={{ mr: 2 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateCredit(credit.id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Third Section: Future Section */}
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Future Section
          </Typography>
          <Typography>This section can be used for additional features.</Typography>
        </Paper> 
      </Box>
    </Container>
  );
};

export default Creditdashboard;
