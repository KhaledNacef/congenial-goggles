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

const Wat = ({ searchQuery }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const userIdFromCookie = Cookies.get('token');

  const filteredData = data.filter(
    (row) =>
      row.phoneHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.holderNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const columns = [
    { id: 'id', label: 'ID', minWidth: 20 },
    { id: 'brand', label: 'Brand', minWidth: 70 },
    { id: 'phoneHolder', label: 'Client Name', minWidth: 100 },
    { id: 'holderNumber', label: 'Client Number', minWidth: 70 },
    { id: 'problem', label: 'Problem', minWidth: 100 },
    { id: 'delivredOn', label: 'Delivered On', minWidth: 70 },
    { id: 'status', label: 'Status', minWidth: 30 },
    { id: 'createdAt', label: 'Created At', minWidth: 70 },
    { id: 'actions', label: 'Actions', minWidth: 30 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://195.200.15.61/phone/status/${userIdFromCookie}/${id}`, { status });
      // Update the status of the stopped account directly in the state
      getWaiting();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getWaiting = async () => {
    try {
      const response = await axios.get(`http://195.200.15.61/phone/waiting/${userIdFromCookie}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching waiting data:', error);
    }
  };

  useEffect(() => {
    getWaiting();
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ fontFamily: 'Kanit', fontWeight: 500, margin:'auto', boxShadow: 2, textAlign: 'center', border: '1px Solid grey', backgroundColor: 'white', borderRadius: 15, width: '55%', padding: 1 }}>WAITING <HourglassEmptyIcon /></Typography>

      <Paper sx={{ width: '95%', boxShadow: 9, overflowX: 'auto', margin: 'auto', marginTop: 3, borderRadius: 5 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center" style={{ fontFamily: 'Kanit', fontWeight: 500, minWidth: column.minWidth, fontWeight: 'bold' }}>
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
                    <TableCell align="center">{row.brand}</TableCell>
                    <TableCell align="center">{row.phoneHolder}</TableCell>
                    <TableCell align="center">{row.holderNumber}</TableCell>
                    <TableCell align="center">{row.problem}</TableCell>
                    <TableCell align="center">{row.delivredOn}</TableCell>
                    <TableCell align="center" style={{ backgroundColor: '#fbef53', borderRadius: '30px', fontWeight: 'bold', color: 'black' }}>{row.status}</TableCell>
                    <TableCell align="center">{row.createdAt}</TableCell>
                    <TableCell align="center">
                      <ActionsButtons id={row.id} updateStatus={updateStatus} />
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

export default Wat;
