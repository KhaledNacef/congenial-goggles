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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Cookies from 'js-cookie';

const Fixeddv = ({ searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [view, setView] = useState(false);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (id) => {
    if (view && selectedId === id) {
      setView(false);
      setSelectedId(null);
    } else {
      setView(true);
      setSelectedId(id);
    }
  };

  const handleBuy = () => {
    setOpenDialog(true);
  };

  const confirmBuy = async () => {
    if (selectedId === null) return;
    try {
      await axios.put(`https://api.deviceshopleader.com/api/vetrine/vetrinesell/${selectedId}/${userIdFromCookie}`);
      getBstatus('Fixed'); // Refresh data after status update
      setView(false); // Close the view after buying
      setOpenDialog(false); // Close the dialog
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  const cancelBuy = () => {
    setOpenDialog(false);
  };

  const getBstatus = async (status) => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/vetrine/vetrinesgetstatus/${userIdFromCookie}/${status}`);
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de statut :', error);
    }
  };

  useEffect(() => {
    getBstatus('Fixed');
  }, []);

  const filteredData = data.filter((row) =>
    row.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.toString().includes(searchQuery)
  );

  return (
    <div style={{ backgroundColor: '#FCF6F5FF' }}>
      <Box sx={{ justifyContent: 'center', boxShadow: 2, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginBottom: 1, backgroundColor: '#89ABE3FF', borderRadius: 5, width: '55%', padding: 1, border: '1px solid grey' }}>
        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', color: '#FCF6F5FF', width: '100%' }}>Tous Les Produits Reconditionnés</Typography>
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
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align='center'>{row.id}</TableCell>
                    <TableCell align='center'>{row.brand}</TableCell>
                    <TableCell align='center'>{row.serie}</TableCell>
                    <TableCell align='center'>{row.type}</TableCell>
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
                    <TableCell align='center'>{row.cout} DT</TableCell>
                    <TableCell align='center'>{row.maindoeuvre} DT</TableCell>
                    <TableCell align='center'>{row.price} DT</TableCell>
                    <TableCell align='center' sx={{ bgcolor: '#99cc99', borderRadius: 30, fontWeight: 'bold' }}>{row.status}</TableCell>
                    <TableCell align='center'>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => handleView(row.id)} aria-label="Edit" size="small">
                        <EditIcon />
                      </IconButton>
                      {view && selectedId === row.id && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                          <Button onClick={handleBuy} variant="contained" >
                            Buy
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

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelBuy}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to buy this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelBuy} color="primary">No</Button>
          <Button onClick={confirmBuy} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Fixeddv;
