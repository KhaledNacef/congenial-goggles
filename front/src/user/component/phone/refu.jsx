import React,{useState,useEffect} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Cookies from 'js-cookie';
import axios from 'axios';


const Refused = ({searchQuery}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const columns = [
        { id: 'id', label: 'ID', minWidth: 70 },
        { id: 'name', label: 'Marque', minWidth: 70 },
        { id: 'email', label: 'Nom du client', minWidth: 100 },
        { id: 'password', label: 'Numéro du client', minWidth: 100 },
        { id: 'createdAt', label: 'Problème', minWidth: 100 },
        { id: 'deliveredOn', label: 'Livré le', minWidth: 100 },
        { id: 'status', label: 'Statut', minWidth: 70 },
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
    
      const fetchData = async (status) => {
        try {
          const response = await axios.get(`${baseUrl}/phone/status/${userIdFromCookie}/${status}`);
          setData(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données de statut :', error);
        }
      };
    
      useEffect(() => {
        fetchData('Refused');
      }, []);
    
      
    




    const filteredData = data.filter((row) =>
        row.phoneHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.holderNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );




  return (
    <div>

<Paper sx={{ width: '95%', overflowX: 'auto', margin: 'auto', marginTop: 10, boxShadow: 9, borderRadius: 5 }}>
          <TableContainer sx={{ fontFamily: 'Kanit', fontWeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
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
                      <TableCell align="center">{row.delivredOn.slice(0, 10)}</TableCell>
                      <TableCell align="center" style={{ backgroundColor: row.status === 'Refused' ? '#f44336' : row.status === 'Fixed' ? '#99cc99' : '#fbef53', borderRadius: '30px', fontWeight: 'bold', color: 'black' }}>{row.status}</TableCell>
                      <TableCell align="center">{row.createdAt}</TableCell>
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
  )
}

export default Refused