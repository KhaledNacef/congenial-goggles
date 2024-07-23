import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

const Delivpc = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'brand', label: 'Marque', minWidth: 70 },
    { id: 'phoneHolder', label: 'Nom du Client', minWidth: 100 },
    { id: 'holderNumber', label: 'Numéro du Client', minWidth: 70 },
    { id: 'serie', label: 'Serie', minWidth: 100 },
    { id: 'problem', label: 'Problème', minWidth: 100 },
    { id: 'remarque', label: 'Remarque', minWidth: 100 },
    { id: 'cout', label: 'Cout', minWidth: 30 },
    { id: 'maindoeuvre', label: "Main d'oeuvre", minWidth: 30 },
    { id: 'accompte', label: 'Accompte', minWidth: 30 },
    { id: 'price', label: 'Prix', minWidth: 30 },
    { id: 'delivredOn', label: 'Livré le', minWidth: 70 },
    { id: 'status', label: 'Statut', minWidth: 30 },
    { id: 'createdAt', label: 'Créé le', minWidth: 70 },
  ];

  const userIdFromCookie = Cookies.get('token');
  const baseUrl = 'https://api.deviceshopleader.com/api'; // Base URL for API

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/pc/deliveredtoday/${userIdFromCookie}`);
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((row) =>
    row.pcHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.ref.toString().includes(searchQuery)
  );

  return (
    <div style={{ backgroundColor: '#FCF6F5FF' }}>
      <Box sx={{ justifyContent: 'center', boxShadow: 2, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginBottom: 1, backgroundColor: '#89ABE3FF', borderRadius: 5, width: '55%', padding: 1, border: '1px solid grey' }}>
        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', color: '#FCF6F5FF', width: '100%' }}>
          AUJOURD'HUI
        </Typography>
      </Box>
      <Paper sx={{ width: '95%', overflowX: 'auto', margin: 'auto', marginTop: 10, boxShadow: 9, borderRadius: 5 }}>
        <TableContainer sx={{ fontFamily: 'Kanit', fontWeight: 500, maxHeight: '70vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center">{row.ref}</TableCell>
                    <TableCell align="center">{row.brand}</TableCell>
                    <TableCell align="center">{row.pcHolder}</TableCell>
                    <TableCell align="center">{row.holderNumber}</TableCell>
                    <TableCell align="center">{row.serie}</TableCell>
                    <TableCell align="center">{row.problem}</TableCell>
                    <TableCell align="center">{row.remarque}</TableCell>
                    <TableCell align="center">{row.cout}</TableCell>
                    <TableCell align="center">{row.maindoeuvre}DT</TableCell>
                    <TableCell align="center">{row.accompte}DT</TableCell>
                    <TableCell align="center">{row.price}DT</TableCell>
                    <TableCell align="center">{row.delivredOn.slice(0, 10)}</TableCell>
                    <TableCell align="center" style={{ backgroundColor: row.status === 'Refused' ? '#f44336' : row.status === 'Fixed' ? '#99cc99' : '#fbef53', borderRadius: '30px', fontWeight: 'bold', color: 'black' }}>{row.status}</TableCell>
                    <TableCell align="center">{row.createdAt.slice(0, 10)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Delivpc;
