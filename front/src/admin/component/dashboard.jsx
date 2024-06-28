import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState([]);
  const [inActive, setInActive] = useState([]);

  const fetchinActive = async (status) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/act/${status}`);
      
        setInActive(response.data);
     
     

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
    fetchinActive('InActive')
    fetchActive('Active')
    
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
      
        setActive(response.data);
     
     

    } catch (error) {
      console.log(error);
    }
  };



  // Generate month labels
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Generate data for each month (e.g., number of users)
  const monthlyUserData = monthLabels.map(month => {
    const year=new Date().getFullYear()
    // Filter data to get users created in the current month
    const usersCreatedInMonth = data.filter(user => {
      const userCreationMonth = new Date(user.createdAt);
      return userCreationMonth.getMonth() === monthLabels.indexOf(month) && userCreationMonth.getFullYear()===year;
    });
    // Return the length of users created in the current month
    return usersCreatedInMonth.length;
  });

  return (
    <div style={{ display: 'flex', flexDirection: "column", width: '80%', height: "90vh", margin: 'auto' }}>

      <Box sx={{ padding: 4, width: '80%', display: 'flex', flexDirection: "row",marginLeft:5, height: 110 }}>


        <Box sx={{ padding: 1, width: '30%', height: 100, margingLeft: 5, border: '1px solid grey', borderRadius: 3, backgroundColor: 'white', marginLeft: 5, textAlign: 'center', boxShadow: 5 }}>
          <Typography variant='h4' sx={{ color: 'grey' }} > Active Users</Typography>
          <Typography variant='h4'> {active.length}</Typography>
        </Box>
        <Box sx={{ padding: 1, width: '30%', height: 100, margingLeft: 5, border: '1px solid grey', borderRadius: 3, backgroundColor: 'white', marginLeft: 5, textAlign: 'center', boxShadow: 5 }}>
          <Typography variant='h4' sx={{ color: 'grey' }} > InActive Users</Typography>
          <Typography variant='h4'> {inActive.length}</Typography>
        </Box>
        <Box sx={{ padding: 1, width: '30%', height: 100, margingLeft: 5, border: '1px solid grey', borderRadius: 3, backgroundColor: 'white', marginLeft: 5, textAlign: 'center', boxShadow: 5 }}>
          <Typography variant='h4' sx={{ color: 'grey' }} > ALL Users</Typography>
          <Typography variant='h4'> {data.length}</Typography>
        </Box>

      </Box>

      <Box sx={{ width: 700, height: 400, border: '1px solid grey', borderRadius: 3,backgroundColor:'white', marginTop: 10 }}>
      
    <BarChart
      xAxis={[{ scaleType: 'band', data: monthLabels   }]}
      series={[{data:monthlyUserData}]}
      width={700}
      height={400}
    />
      </Box>
    </div>
  );
}
