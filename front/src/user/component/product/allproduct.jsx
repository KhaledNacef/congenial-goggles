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
import { Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';

const Allproduct = ({ filteredData, setDataA }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [sellQuantity, setSellQuantity] = useState(0);
  const [upQuantity, setUpQuantity] = useState(0);
  const [pricee, setPricee] = useState(0);
  const [priceU, setPriceU] = useState(0);
  const [discount, setDiscount] = useState(1); // Default discount of 5%

  const [view, setView] = useState('non');
  const [selectedId, setSelectedId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDiscountDialog, setOpenDiscountDialog] = useState(false);
  const [openSellDialog, setOpenSellDialog] = useState(false);

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

  const handleOpenDiscountDialog = () => {
    setOpenDiscountDialog(true);
  };

  const handleCloseDiscountDialog = () => {
    setOpenDiscountDialog(false);
  };

  const handleConfirmDiscount = () => {
    sellProduct(selectedId, sellQuantity, discount);
    handleCloseDiscountDialog();
  };

  const handleOpenSellDialog = (id) => {
    setSelectedId(id);
    setOpenSellDialog(true);
  };

  const handleCloseSellDialog = () => {
    setSelectedId(null);
    setSellQuantity('');
    setOpenSellDialog(false);
  };

  const handleConfirmSell = () => {
    handleCloseSellDialog();
    handleOpenDiscountDialog();
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
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.price}DT</TableCell>
                    <TableCell align="center">{row.buyprice}DT</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      <img src={row.image} alt="Product" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => { setSelectedId(row.id); setView('up'); }} variant="contained" sx={{ backgroundColor: '#89ABE3FF', color: '#FCF6F5FF', fontWeight: 500 }} size="small">
                        Mettre à jour la quantité
                      </Button>
                      <Button onClick={() => handleOpenSellDialog(row.id)} variant="contained" size="small" sx={{ marginLeft: 1, backgroundColor: '#89ABE3FF', color: '#FCF6F5FF', fontWeight: 500 }}>
                        Vendre
                      </Button>
                      <Button onClick={() => { setSelectedId(row.id); setView('price'); }} variant="contained" color="info" size="small" sx={{ marginLeft: 1, fontWeight: 500 }}>
                        Modifier le prix
                      </Button>
                      <IconButton onClick={() => handleOpenDeleteDialog(row.id)} aria-label="delete" color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    {(view === 'sell' && selectedId === row.id) && (
                      <TableCell align="center" style={{ margin: '10px' }}>
                        <TextField
                          label="Quantité à vendre"
                          type="number"
                          value={sellQuantity}
                          onChange={(e) => setSellQuantity(e.target.value)}
                        />
                        <Button onClick={() => handleOpenDiscountDialog(row.id)} variant="contained" style={{ marginLeft: '10px', backgroundColor: '#89ABE3FF', color: '#FCF6F5FF', fontWeight: 500 }}>Choisir Discount</Button>
                      </TableCell>
                    )}
                    {(view === 'up' && selectedId === row.id) && (
                      <TableCell align="center" style={{ margin: '10px' }}>
                        <TextField
                          label="Quantité à mettre à jour"
                          type="number"
                          value={upQuantity}
                          onChange={(e) => setUpQuantity(e.target.value)}
                        />
                        <Button onClick={() => { updateQuantity(row.id, upQuantity); }} variant="contained" style={{ marginLeft: '10px', backgroundColor: '#89ABE3FF', color: '#FCF6F5FF', fontWeight: 500 }}>OK</Button>
                      </TableCell>
                    )}
                    {(view === 'price' && selectedId === row.id) && (
                      <TableCell align="center" style={{ margin: '10px' }}>
                        <TextField
                          label="Prix"
                          type="number"
                          value={pricee}
                          onChange={(e) => setPricee(e.target.value)}
                        />
                        <Button onClick={() => { updatePrice(row.id, pricee); }} variant="contained" style={{ marginLeft: '10px', backgroundColor: '#89ABE3FF', color: '#FCF6F5FF', fontWeight: 500 }}>OK</Button>
                        <TextField
                          label="Prix-U"
                          type="number"
                          value={priceU}
                          onChange={(e) => setPriceU(e.target.value)}
                          sx={{ marginLeft: '10px' }}
                        />
                        <Button onClick={() => { updatePriceu(row.id, priceU); }} variant="contained" style={{ marginLeft: '10px', backgroundColor: '#89ABE3FF', color: '#FCF6F5FF', fontWeight: 500 }}>OK</Button>
                      </TableCell>
                    )}
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
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmer la suppression"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer ce produit ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openSellDialog}
        onClose={handleCloseSellDialog}
        aria-labelledby="sell-dialog-title"
        aria-describedby="sell-dialog-description"
      >
        <DialogTitle id="sell-dialog-title">{"Vendre le produit"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="sell-dialog-description">
            Entrez la quantité que vous souhaitez vendre.
          </DialogContentText>
          <TextField
            label="Quantité à vendre"
            type="number"
            fullWidth
            value={sellQuantity}
            onChange={(e) => setSellQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSellDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmSell} color="primary" autoFocus>
            Continuer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDiscountDialog}
        onClose={handleCloseDiscountDialog}
        aria-labelledby="discount-dialog-title"
        aria-describedby="discount-dialog-description"
      >
        <DialogTitle id="discount-dialog-title">{"Choisir un discount"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="discount-dialog-description">
            Sélectionnez un discount pour le produit que vous souhaitez vendre.
          </DialogContentText>
          <Slider
            value={discount}
            onChange={(e, newValue) => setDiscount(newValue)}
            aria-labelledby="discount-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={5}
            marks
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDiscountDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDiscount} color="primary" autoFocus>
            Appliquer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Allproduct;
