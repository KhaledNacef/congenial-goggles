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
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { TextField,Box } from '@mui/material';
import { Link, useNavigate   } from 'react-router-dom';


const columns = [
  { id: 'image', label: 'Image', minWidth: 70 },
  { id: 'name', label: 'Name', minWidth: 70 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'password', label: 'Password', minWidth: 70 },
  { id: 'status', label: 'Account Status', minWidth: 70 },
  { id: 'CreatedAt', label: 'CreatedAt', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];



export default function UserTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage the edit modal visibility
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  
const ActionsButtons = ({ id, stop,del,setIsEditModalOpen }) => (
    <>
      <IconButton onClick={()=>setIsEditModalOpen(!isEditModalOpen)} aria-label="edit" size="small">
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => del(id)} aria-label="delete" size="small">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => stop(id)} aria-label="view" size="small">
        <VisibilityIcon />
      </IconButton>
    </>
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/all");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActive = async (status) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/act/${status}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const stop = async (id) => {
    try {
      await axios.put(`http://localhost:3000/user/stop/${id}`);
      // Update the status of the stopped account directly in the state
     
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const UPDATE = async (id) => {
    try {
      await axios.put(`http://localhost:3000/user/${id}`,{Name:name,Email:email,Password:password});
      // Update the status of the stopped account directly in the state
     
      fetchData();
      setIsEditModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      // Update the status of the stopped account directly in the state
     
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((row) =>
    row.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.Email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const Navigate  = useNavigate ();

  return (
    <div style={{ display: 'flex', flexDirection: "column", width: '100%', height: "100vh" }}>
<Box sx={{display:'felx',flexDirection:'row', marginTop:10,marginLeft:10,border: '1px solid grey', borderRadius: 10,padding:5,backgroundColor:'white',margin:'auto',height:60}} >   
   <Button onClick={() =>Navigate('signup') } variant="contained" color="primary" style={{ margin: '20px' }}>ADD User</Button>

        <Button onClick={() => fetchActive('Active')} variant="contained" color="primary" style={{ margin: '20px' }}>Active Account</Button>
        <Button onClick={() => fetchActive('InActive')} variant="contained" color="secondary" style={{ margin: '20px' }}>InActive Account</Button>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by name or email" style={{ margin: '20px', padding: '8px' }} />
      </Box>
      <Paper sx={{ width: '95%', overflow: 'hidden', height: 700, margin: 'auto' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
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
                    <TableCell>
                      <img src={row.image} alt="Profile" style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                    </TableCell>
                    <TableCell>{row.Name}</TableCell>
                    <TableCell>{row.Email}</TableCell>
                    <TableCell>{row.Password}</TableCell>
                    <TableCell>{row.AccountStatus}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>
                      <ActionsButtons id={row.id} stop={stop} del={del} setIsEditModalOpen={setIsEditModalOpen} />
                    </TableCell>
                    {isEditModalOpen ? <div style={{marginRight:10,marginTop:10}}> 
                    <TextField onChange={(e)=>setName(e.target.value)} label='Name'></TextField>
                    <TextField onChange={(e)=>setEmail(e.target.value)} label='Email'></TextField>
                    <TextField onChange={(e)=>setPassword(e.target.value)} label='Password'></TextField>
                    <Button onClick={()=>UPDATE(row.id)} variant="contained" color="primary" style={{ margin: '20px' }}>Update</Button>
                     </div>: null}
                   
                    
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
}
