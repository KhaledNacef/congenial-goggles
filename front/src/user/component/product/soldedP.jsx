import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import axios from 'axios';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import QuantityIcon from '@mui/icons-material/AttachMoney';
import Cookies from 'js-cookie';

const SoldedP = ({ filteredData, setDataA }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [mostBoughtProduct, setMostBoughtProduct] = useState(null);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const userIdFromCookie = Cookies.get('token');

  const columns = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'name', label: 'Nom', minWidth: 70 },
    { id: 'price', label: 'Prix', minWidth: 70 },
    { id: 'quantity', label: 'Quantité', minWidth: 70 },
    { id: 'image', label: 'Image', minWidth: 100 },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/sold/soldproducts/${userIdFromCookie}`);
      setDataA(response.data);
      // Calculate most bought product, total products sold, and total income
      let maxQuantity = 0;
      let totalQuantitySold = 0;
      let totalIncome = 0;
      let mostBoughtProduct = null;
      response.data.forEach((product) => {
        totalQuantitySold += product.quantity;
        totalIncome += product.price * product.quantity;
        if (product.quantity > maxQuantity) {
          maxQuantity = product.quantity;
          mostBoughtProduct = product;
        }
      });
      setTotalProductsSold(totalQuantitySold);
      setMostBoughtProduct(mostBoughtProduct);
      setTotalIncome(totalIncome);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{backgroundColor:'#FCF6F5FF'}}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '95%', margin: 'auto'}}>
        <Paper sx={{ boxShadow: 20, width: '70%', marginTop: 5, marginRight: 1, borderRadius: 5 }}>
          <TableContainer sx={{ fontFamily: 'Kanit', fontWeight: 500, maxHeight: '75vh'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align='left' style={{ fontFamily: 'Kanit', fontWeight: 500, minWidth: column.minWidth, fontWeight: 'bold' }}>
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
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.price}DT</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>{row.quantity}</TableCell>
                      <TableCell sx={{ justifyContent: 'center' }}>
                        <img src={row.image} alt="Product Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
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

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%', marginTop: 10 }}>
        <Typography variant='h4' sx={{ color: '#FCF6F5FF',backgroundColor:'#89ABE3FF',fontFamily: 'Kanit', fontWeight: 500, boxShadow: 4, textAlign: 'center', fontWeight: 'bold', border: '1px Solid grey',  borderRadius: 15, width: '85%', padding: 1 }}>REVENUS</Typography>

          <Box sx={{color: '#FCF6F5FF', width: '95%', border: '1px solid grey', height: 100, fontSize: 30, padding: 1, margin: 'auto', marginBottom: 1, marginTop: 1, borderRadius: 5, boxShadow: 2,backgroundColor: '#89ABE3FF', }}>TOTAL DES REVENUS :
            <Typography sx={{ color: '#FCF6F5FF', fontFamily: 'Kanit', fontWeight: 600 }} variant='h4'><MonetizationOnIcon /> {totalIncome} DT</Typography>
          </Box>
          <Box sx={{color: '#FCF6F5FF', width: '95%', border: '1px solid grey', height: 100, fontSize: 30, padding: 1, margin: 'auto', marginBottom: 1, borderRadius: 5, backgroundColor: '#89ABE3FF', boxShadow: 2 }}>Produit le plus vendu :
            {mostBoughtProduct && <Typography sx={{ color: '#FCF6F5FF', marginLeft: 2, fontFamily: 'Kanit', fontWeight: 600 }} variant='h5'> {mostBoughtProduct.name} - {mostBoughtProduct.price} DT <SmartphoneIcon /></Typography>}
          </Box>
          <Box sx={{ color: '#FCF6F5FF',width: '95%', border: '1px solid grey', height: 100, fontSize: 30, padding: 1, margin: 'auto', backgroundColor: '#89ABE3FF', borderRadius: 5, boxShadow: 2 }}>Total des produits vendus :
            <Typography sx={{ marginLeft: 2, color: '#FCF6F5FF', fontFamily: 'Kanit', fontWeight: 600 }} variant='h4'> {totalProductsSold} Qunatité</Typography>
          </Box>
        </Box>

      </Box>
    </div>
  )
}

export default SoldedP;
