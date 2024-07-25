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
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography, Box } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Cookies from 'js-cookie';

const Watpc = ({ searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [data, setData] = useState([]);
  const userIdFromCookie = Cookies.get('token');

  const filteredData = data.filter((row) =>
    row.pcHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.ref.toString().includes(searchQuery)
  );

  

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
    { id: 'actions', label: 'Actions', minWidth: 30 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 

  const getBstatus = async (status) => {
    try {
      const response = await axios.get(`https://api.deviceshopleader.com/api/pc/status/${userIdFromCookie}/${status}`);
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de statut :', error);
    }
  };


  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://api.deviceshopleader.com/api/pc/statusup/${userIdFromCookie}/${id}`, { status });
      getBstatus('waiting'); // Refresh data after status update
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  useEffect(() => {
    getBstatus('waiting');
  }, []);

  const ActionsButtons = ({ id, updateStatus }) => (
    <>
      <IconButton color="error" aria-label="Refuse" size="small" onClick={() => updateStatus(id, 'Refused')}>
        <CancelIcon />
      </IconButton>
      <IconButton color="success" aria-label="Fix" size="small" onClick={() => updateStatus(id, 'Fixed')}>
        <CheckCircleIcon />
      </IconButton>
    </>
  );

  return (
    <div style={{ backgroundColor: '#FCF6F5FF' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Kanit', fontWeight: 500, margin: 'auto', boxShadow: 2, textAlign: 'center', border: '1px solid grey', color: '#FCF6F5FF', backgroundColor: '#89ABE3FF', borderRadius: 15, width: '55%', padding: 1 }}>
       PC EN ATTENTE <HourglassEmptyIcon />
      </Typography>

      <Paper sx={{ width: '95%', overflowX: 'auto', margin: 'auto', marginTop: 10, boxShadow: 9, borderRadius: 5 }}>
        <TableContainer sx={{ fontFamily: 'Kanit', fontWeight: 500, maxHeight: '70vh' }}>
          <Table stickyHeader aria-label="tableau fixe">
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
                    <TableCell align="center">{row.price} DT</TableCell>
                    <TableCell align="center">{row.delivredOn.slice(0, 10)}</TableCell>
                    <TableCell align="center" style={{ backgroundColor: '#fbef53', borderRadius: '30px', fontWeight: 'bold', color: 'black' }}>
                      {row.status}
                    </TableCell>
                    <TableCell align="center">{row.createdAt.slice(0, 10)}</TableCell>
                    <TableCell align="center">
                      <ActionsButtons id={row.ref} updateStatus={updateStatus} />
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

export default Watpc;
