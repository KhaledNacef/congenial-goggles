import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography, IconButton, Slider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';

const Allproduct = ({ filteredData, setDataA }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [sellQuantity, setSellQuantity] = useState('');
  const [upQuantity, setUpQuantity] = useState('');
  const [pricee, setPricee] = useState('');
  const [priceU, setPriceU] = useState('');
  const [discount, setDiscount] = useState(1); // Default discount of 1

  const [view, setView] = useState('non');
  const [selectedId, setSelectedId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'name', label: 'Nom', minWidth: 70 },
    { id: 'price', label: 'Prix', minWidth: 70 },
    { id: 'priceU', label: 'Prix-U', minWidth: 70 },
    { id: 'quantity', label: 'Quantité', minWidth: 70 },
    { id: 'image', label: 'Image', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 300 },
  ];

  const userIdFromCookie = Cookies.get('token');

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/product/products/${userIdFromCookie}`);
      setDataA(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sellProduct = async (id, quantity, discount) => {
    if (quantity === 0 || quantity === '') {
      setView('non');
    } else {
      try {
        await axios.put(`https://api.deviceshopleader.com/api/product/sell/${id}/${userIdFromCookie}/${quantity}/${discount}`);
        setSellQuantity('');
        setDiscount(1); // Reset discount after selling
        setView('non');
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity === 0 || quantity === '') {
      setView('non');
    } else {
      try {
        await axios.put(`https://api.deviceshopleader.com/api/product/products/${id}/${userIdFromCookie}/${quantity}`);
        setUpQuantity('');
        setView('non');
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updatePrice = async (id, price) => {
    if (price === 0 || price === '') {
      setView('non');
    } else {
      try {
        await axios.put(`https://api.deviceshopleader.com/api/product/price/${id}/${userIdFromCookie}/${price}`);
        setPricee('');
        setView('non');
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updatePriceu = async (id, priceU) => {
    if (priceU === 0 || priceU === '') {
      setView('non');
    } else {
      try {
        await axios.put(`https://api.deviceshopleader.com/api/product/priceu/${id}/${userIdFromCookie}/${priceU}`);
        setPriceU('');
        setView('non');
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://api.deviceshopleader.com/api/product/deleteproduct/${userIdFromCookie}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error while deleting the product record:', error);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedId(null);
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    deleteProduct(selectedId);
    handleCloseDeleteDialog();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ backgroundColor: '#FCF6F5FF' }}>
      <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, boxShadow: 12, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', fontWeight: 'bold', border: '1px solid grey', color: '#FCF6F5FF', backgroundColor: '#89ABE3FF', borderRadius: 15, width: '55%', padding: 1, marginBottom: 2 }}>
        TOUS LES PRODUITS
      </Typography>
      <Paper sx={{ boxShadow: 15, width: '90%', overflowX: 'auto', marginLeft: 'auto', marginRight: 'auto', borderRadius: 5 }}>
        <TableContainer sx={{ fontFamily: 'Kanit', fontWeight: 500, maxHeight: '55.56vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center" style={{ fontFamily: 'Kanit', fontWeight: 'bold', minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="center">{row.ref}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.price}DT</TableCell>
                    <TableCell align="center">{row.priceU}DT</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      <img src={row.image} alt="Product" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => { setSelectedId(row.ref); setView('up'); }} variant="contained" sx={{ backgroundColor: '#89ABE3FF', color: '#FCF6F5FF', fontWeight: 500 }} size="small">
                        Mettre à jour la quantité
                      </Button>
                      <Button onClick={() => { setSelectedId(row.ref); setView('sell'); }} variant="contained" size="small" sx={{ marginLeft: 1, backgroundColor: '#89ABE3FF', color: '#FCF6F5FF', fontWeight: 500 }}>
                        Vendre
                      </Button>
                      <Button onClick={() => { setSelectedId(row.ref); setView('price'); }} variant="contained" color="info" size="small" sx={{ marginLeft: 1, fontWeight: 500 }}>
                        Modifier le prix
                      </Button>
                      <Button onClick={() => { setSelectedId(row.ref); setView('priceu'); }} variant="contained" color="secondary" size="small" sx={{ marginLeft: 1, fontWeight: 500 }}>
                        Modifier Prix-U
                      </Button>
                      <IconButton onClick={() => handleOpenDeleteDialog(row.id)} aria-label="delete" color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    {(view === 'sell' && selectedId === row.ref) && (
                      <TableCell align="center" style={{ margin: '10px' }}>
                        <TextField
                          label="Quantité à vendre"
                          type="number"
                          value={sellQuantity}
                          onChange={(e) => setSellQuantity(e.target.value)}
                        />
                        <Slider
                          value={discount}
                          onChange={(e, newValue) => setDiscount(newValue)}
                          aria-labelledby="discount-slider"
                          valueLabelDisplay="auto"
                          step={1}
                          min={0}
                          max={5}
                          marks
                          sx={{ marginTop: '20px', marginBottom: '10px' }}
                        />
                        <Button onClick={() => sellProduct(row.ref, sellQuantity, discount)} variant="contained" color="success" size="small">
                          Confirmer la vente
                        </Button>
                      </TableCell>
                    )}
                    {(view === 'up' && selectedId === row.ref) && (
                      <TableCell align="center" style={{ margin: '10px' }}>
                        <TextField
                          label="Quantité mise à jour"
                          type="number"
                          value={upQuantity}
                          onChange={(e) => setUpQuantity(e.target.value)}
                        />
                        <Button onClick={() => updateQuantity(row.ref, upQuantity)} variant="contained" color="success" size="small">
                          Confirmer
                        </Button>
                      </TableCell>
                    )}
                    {(view === 'price' && selectedId === row.ref) && (
                      <TableCell align="center" style={{ margin: '10px' }}>
                        <TextField
                          label="Prix mis à jour"
                          type="number"
                          value={pricee}
                          onChange={(e) => setPricee(e.target.value)}
                        />
                        <Button onClick={() => updatePrice(row.ref, pricee)} variant="contained" color="success" size="small">
                          Confirmer
                        </Button>
                      </TableCell>
                    )}
                    {(view === 'priceu' && selectedId === row.ref) && (
                      <TableCell align="center" style={{ margin: '10px' }}>
                        <TextField
                          label="Prix-U mis à jour"
                          type="number"
                          value={priceU}
                          onChange={(e) => setPriceU(e.target.value)}
                        />
                        <Button onClick={() => updatePriceu(row.ref, priceU)} variant="contained" color="success" size="small">
                          Confirmer
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 200, 300]}
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

export default Allproduct;
