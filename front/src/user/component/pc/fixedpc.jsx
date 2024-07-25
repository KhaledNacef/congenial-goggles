import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Cookies from 'js-cookie';

const Fixeddpc = ({ searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [view, setView] = useState(false);
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = () => {
    setView(!view);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://api.deviceshopleader.com/api/pc/statusup/${userIdFromCookie}/${id}`, { status });
       // Refresh data after status update
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  const updatePrice = async () => {
    try {
      await axios.put(`https://api.deviceshopleader.com/api/pc/price/${userIdFromCookie}/${selectedId}`, { price: price });
      setSelectedId(null);
      setPrice(0);
      
      updateStatus(selectedId,'soldé');
      getBstatus('Fixed');
    } catch (error) {
      console.log(error);
    }
  };


  const getBstatus = async (status) => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/pc/status/${userIdFromCookie}/${status}`);
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de statut :', error);
    }
  };

  useEffect(() => {
    getBstatus('Fixed');
  }, []);

  const filteredData = data.filter((row) =>
    row.pcHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.ref.toString().includes(searchQuery)
  );

  return (
    <div style={{ backgroundColor: '#FCF6F5FF' }}>
      <Box sx={{ justifyContent: 'center', boxShadow: 2, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginBottom: 1, backgroundColor: '#89ABE3FF', borderRadius: 5, width: '55%', padding: 1, border: '1px solid grey' }}>
        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', color: '#FCF6F5FF', width: '100%' }}>PC FIXÉS</Typography>
      </Box>
      <Paper sx={{ width: '95%', overflowX: 'auto', margin: 'auto', marginTop: 10, boxShadow: 9, borderRadius: 5 }}>
        <TableContainer sx={{ fontFamily: 'Kanit', fontWeight: 500, maxHeight: '70vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align='center' style={{ fontFamily: 'Kanit', fontWeight: 500, minWidth: column.minWidth, padding: '12px' }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align='center' style={{ fontFamily: 'Kanit', fontWeight: 500, padding: '12px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align='center'>{row.ref}</TableCell>
                    <TableCell align='center'>{row.brand}</TableCell>
                    <TableCell align='center'>{row.pcHolder}</TableCell>
                    <TableCell align='center'>{row.holderNumber}</TableCell>
                    <TableCell align='center'>{row.serie}</TableCell>
                    <TableCell align='center'>{row.problem}</TableCell>
                    <TableCell align='center'>{row.remarque}</TableCell>
                    <TableCell align='center'>{row.cout}</TableCell>
                    <TableCell align='center'>{row.maindoeuvre}DT</TableCell>
                    <TableCell align='center'>{row.accompte}DT</TableCell>
                    <TableCell align='center'>{row.price}DT</TableCell>
                    <TableCell align='center'>{row.delivredOn.slice(0, 10)}</TableCell>
                    <TableCell align='center' sx={{ bgcolor: '#99cc99', borderRadius: 30, fontWeight: 'bold' }}>{row.status}</TableCell>
                    <TableCell align='center'>{row.createdAt.slice(0, 10)}</TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => { setSelectedId(row.ref); handleView(); }} aria-label="Edit" size="small">
                        <EditIcon />
                      </IconButton>
                      {(view && selectedId === row.ref) && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                          <TextField
                            label="Prix"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            sx={{ marginRight: '10px' }}
                          />
                          <Button onClick={updatePrice} variant="contained" >
                            OK
                          </Button>
                        </Box>
                      )}
                    </TableCell>
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

export default Fixeddpc;
