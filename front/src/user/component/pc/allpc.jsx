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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Typography, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'js-cookie';
import axios from 'axios';

const Allpc = ({ searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'brand', label: 'Marque', minWidth: 70 },
    { id: 'pcHolder', label: 'Nom du Client', minWidth: 100 },
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

  const getall = async () => {
    try {
      const response = await axios.get(`${baseUrl}/pc/all/${userIdFromCookie}`);
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les données :', error);
    }
  };

  useEffect(() => {
    getall();
  }, []);

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const confirmDeletePhone = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/pc/delete/${userIdFromCookie}/${deleteId}`);
      console.log('Phone deleted successfully:', response.data);
      getall();
    } catch (error) {
      console.error('Error while deleting the phone record:', error);
    } finally {
      handleCloseDialog();
    }
  };

  const filteredData = data.filter((row) =>
    row.pcHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.ref.toString().includes(searchQuery)
  );

  return (
    <div style={{ backgroundColor: '#FCF6F5FF' }}>
      <Box
        sx={{
          justifyContent: 'center',
          boxShadow: 2,
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 1,
          backgroundColor: '#89ABE3FF',
          borderRadius: 5,
          width: '55%',
          padding: 1,
          border: '1px solid grey',
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontFamily: 'Kanit',
            fontWeight: 500,
            textAlign: 'center',
            color: '#FCF6F5FF',
            width: '100%',
          }}
        >
          TOUS LES PC
        </Typography>
      </Box>

      <Paper
        sx={{
          width: '95%',
          overflowX: 'auto',
          margin: 'auto',
          marginTop: 10,
          boxShadow: 9,
          borderRadius: 5,
        }}
      >
        <TableContainer
          sx={{
            fontFamily: 'Kanit',
            fontWeight: 500,
            maxHeight: '70vh',
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ minWidth: 30, fontWeight: 'bold' }}>
                  Actions
                </TableCell>
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
                    <TableCell align="center">{row.cout}DT</TableCell>
                    <TableCell align="center">{row.maindoeuvre}DT</TableCell>
                    <TableCell align="center">{row.accompte}</TableCell>
                    <TableCell align="center" sx={{ color: '#007300', fontWeight: 'bold' }}>
                      {row.price}DT
                    </TableCell>
                    <TableCell align="center">{row.delivredOn.slice(0, 10)}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor:
                        row.status === 'Refused'
                        ? '#f44336'
                        : row.status === 'Fixed'
                        ? '#99cc99'
                        : row.status === 'soldé'
                        ? '#89ABE3FF'
                        : '#fbef53',
                        borderRadius: 30,
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell align="center">{row.createdAt}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="edit" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDialog(row.ref)}
                        aria-label="delete"
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce pc?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDeletePhone} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Allpc;
