import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import axios from 'axios';
import Cookies from 'js-cookie';
import Vetrinedata from './dashboardData/vetrine.jsx';
import Phonedata from './dashboardData/phonedata.jsx';
import Pcdata from './dashboardData/pcdata.jsx';
import Proddata from './dashboardData/proddata.jsx';

export default function Dashboard() {
    const [active, setActive] = useState([]);
    const [inActive, setInActive] = useState([]);
    const [wating, setWating] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totPro, setTotpro] = useState(0);
    const [productdata, setProductdata] = useState([]);
    const userIdFromCookie = Cookies.get('token');
    const baseUrl = 'https://api.deviceshopleader.com/api';


    

    const fetchinActive = async (status) => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/status/${userIdFromCookie}/${status}`);
            
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
    
            const phonesUpdatedToday = response.data.filter(phone => {
                const updatedDate = new Date(phone.updatedAt); // Assuming `updatedAt` is the date field
                return (
                    updatedDate.getFullYear() === todayYear &&
                    updatedDate.getMonth() === todayMonth &&
                    updatedDate.getDate() === todayDate
                );
            });
    
            setInActive(phonesUpdatedToday);
        } catch (error) {
            console.error("Error fetching active phones:", error);
        }
    };

 

    const watingg = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/waiting/${userIdFromCookie}`);
            setWating(response.data);
        } catch (error) {
            console.log(error);
        }
    };

   
    



    const fetchActive = async (status) => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/status/${userIdFromCookie}/${status}`);
            
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
    
            const phonesUpdatedToday = response.data.filter(phone => {
                const updatedDate = new Date(phone.updatedAt); // Assuming `updatedAt` is the date field
                return (
                    updatedDate.getFullYear() === todayYear &&
                    updatedDate.getMonth() === todayMonth &&
                    updatedDate.getDate() === todayDate
                );
            });
    
            setActive(phonesUpdatedToday);
        } catch (error) {
            console.error("Error fetching active phones:", error);
        }
    };
    

    useEffect(() => {
        
        fetchinActive('Refused');
        fetchActive('Fixed');
        watingg();
    }, []);

    // Labels des mois








    return (
        <div style={{ padding: 10, backgroundColor: '#FCF6F5FF' }}>
        <Typography variant='h3' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginTop: 3 }}>
            Tableau de bord
        </Typography>

        <Grid container spacing={3} sx={{ marginTop: 3 }} >
            {/* Overview Boxes */}
            <Grid item xs={12} md={4} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 100 }}>
                    <Box
                        sx={{
                            padding: 2,
                            height: '100%',
                            border: '1px solid grey',
                            borderRadius: 3,
                            backgroundColor: '#89ABE3FF',
                            textAlign: 'center',
                            boxShadow: 15,
                        }}
                    >
                        <PhoneIcon />
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            Téléphones réparés aujourd'hui
                        </Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            {active.length}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 100 }}>
                    <Box
                        sx={{
                            padding: 2,
                            height: '100%',
                            border: '1px solid grey',
                            borderRadius: 3,
                            backgroundColor: '#89ABE3FF',
                            textAlign: 'center',
                            boxShadow: 15,
                        }}
                    >
                        <CancelIcon />
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            Téléphones refusés aujourd'hui
                        </Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            {inActive.length}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 100 }}>
                    <Box
                        sx={{
                            padding: 2,
                            height: '100%',
                            border: '1px solid grey',
                            borderRadius: 3,
                            backgroundColor: '#89ABE3FF',
                            textAlign: 'center',
                            boxShadow: 15,
                        }}
                    >
                        <HourglassEmptyIcon />
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            En attente de traitement
                        </Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            {wating.length}
                        </Typography>
                    </Box>
                </Box>
            </Grid>

           <Proddata/>
           
            <Pcdata/>
           
            <Phonedata/>

           <Vetrinedata/>

        </Grid>
    </div>
    );
}
