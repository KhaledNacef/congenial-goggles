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

const Allvetrine = ({ searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  // const [openDialog, setOpenDialog] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'brand', label: 'Marque', minWidth: 70 },
    { id: 'serie', label: 'Série', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'problem', label: 'Problème', minWidth: 100 },
    { id: 'cout', label: 'Coût', minWidth: 30 },
    { id: 'maindoeuvre', label: "Main d'œuvre", minWidth: 30 },
    { id: 'price', label: 'Prix', minWidth: 30 },
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
      const response = await axios.get(`${baseUrl}/vetrine/vetrinesgetall/${userIdFromCookie}`);
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les données :', error);
    }
  };

  useEffect(() => {
    getall();
  }, []);

  // const handleOpenDialog = (id) => {
  //   setDeleteId(id);
  //   setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  //   setDeleteId(null);
  // };

  // const confirmDeletePhone = async () => {
  //   try {
  //     await axios.delete(`${baseUrl}/vetrine/delete/${userIdFromCookie}/${deleteId}`);
  //     getall();
  //   } catch (error) {
  //     console.error('Error while deleting the phone record:', error);
  //   } finally {
  //     handleCloseDialog();
  //   }
  // };

  const filteredData = data.filter((row) =>
    row.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.toString().includes(searchQuery)
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
          Tous Les Produits 
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
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.brand}</TableCell>
                    <TableCell align="center">{row.serie}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell
                    align="center"
                    style={{
                      whiteSpace: 'normal',  // Allow text to wrap to the next line
                      wordBreak: 'break-word',  // Break long words to fit within the cell
                      overflow: 'hidden',  // Hide overflow text
                      textOverflow: 'ellipsis'  // Add ellipsis for overflowed text
                    }}
                  >
                    {row.problem}
                  </TableCell>
                    <TableCell align="center">{row.cout} DT</TableCell>
                    <TableCell align="center">{row.maindoeuvre} DT</TableCell>
                    <TableCell align="center">{row.price} DT</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor:
                          row.status === 'Refused'
                            ? '#f44336'
                            : row.status === 'Fixed'
                            ? '#99cc99'
                            : '#fbef53',
                        borderRadius: 30,
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell align="center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                   
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

      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce produit ?
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
      </Dialog> */}
    </div>
  );
};

export default Allvetrine;
