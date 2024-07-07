import React, { useState } from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';

const TousLesTelephones = ({ filteredData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'Brand', label: 'Marque', minWidth: 70 },
    { id: 'Client Name', label: 'Nom du Client', minWidth: 100 },
    { id: 'Client Number', label: 'Numéro du Client', minWidth: 70 },
    { id: 'Problem', label: 'Problème', minWidth: 100 },
    { id: 'Delivered On', label: 'Livré le', minWidth: 70 },
    { id: 'Price', label: 'Prix', minWidth: 30 },
    { id: 'Status', label: 'Statut', minWidth: 30 },
    { id: 'Created At', label: 'Créé le', minWidth: 70 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', boxShadow: 2, width: 300, margin: 'auto', backgroundColor: 'white', border: '1px solid grey', padding: 0.5, borderRadius: 4, marginTop: 5 }}>
        TOUS LES TÉLÉPHONES
      </Typography>
      <Paper sx={{ fontFamily: 'Kanit', fontWeight: 500, width: '95%', overflow: 'hidden', boxShadow: 8, margin: 'auto', marginTop: 5, borderRadius: 5 }}>
        <TableContainer sx={{ fontFamily: 'Kanit', fontWeight: 500, maxHeight: '70vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
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
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.brand}</TableCell>
                    <TableCell align="center">{row.phoneHolder}</TableCell>
                    <TableCell align="center">{row.holderNumber}</TableCell>
                    <TableCell align="center">{row.problem}</TableCell>
                    <TableCell align="center">{row.deliveredOn}</TableCell>
                    <TableCell align="center" sx={{ color: '#007300', fontWeight: 'bold' }}>{row.price}</TableCell>
                    <TableCell align="center" sx={{ bgcolor: row.status === 'Refused' ? '#f44336' : row.status === 'Fixed' ? '#99cc99' : '#fbef53', borderRadius: 30, fontWeight: 'bold', color: 'black' }}>{row.status}</TableCell>
                    <TableCell align="center">{row.createdAt}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="edit" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" color="secondary">
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
    </div>
  );
};

export default TousLesTelephones;
