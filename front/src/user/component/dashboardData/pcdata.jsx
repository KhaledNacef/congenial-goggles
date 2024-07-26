import React, { useState,useEffect } from 'react'
import Cookies from 'js-cookie';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, Grid } from '@mui/material';
import axios from 'axios';

const Pcdata = () => {

    const [pc,setPc]=useState([])
    const baseUrl = 'https://api.deviceshopleader.com/api';
    const [dailyPhoneRevenue, setDailyPhoneRevenue] = useState([]);
    const [dailyPhoneBenefits, setDailyPhoneBenefits] = useState([]);
    const [monthlyPhoneRevenue, setMonthlyPhoneRevenue] = useState([]);
    const [monthlyPhoneBenefits, setMonthlyPhoneBenefits] = useState([]);
    const [coutd, setCoutd] = useState(0);
    const [modd, setModd] = useState(0);
    const [coutm, setCoutm] = useState(0);
    const [modm, setModm] = useState(0);
    const userIdFromCookie = Cookies.get('token');


    const getallpc = async () => {
        try {
          const response = await axios.get(`${baseUrl}/pc/all/${userIdFromCookie}`);
          setPc(response.data);
          calculatePhoneRevenueAndBenefits(response.data);
          calculateMonthlyRevenueAndBenefits(response.data);
          calculateModAndCout(response.data)
        } catch (error) {
          console.error('Erreur lors de la récupération de toutes les données :', error);
        }
      };


      useEffect(() => {
        
        getallpc()
    }, []);




    const calculateModAndCout = (phones) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentday=currentDate.getDate()
            let monthlyTotalCout = 0;
            let monthlyTotalMaindoeuvre = 0;
           let dailyTotalCout= 0;
           let  dailyTotalMaindoeuvre =0;
            phones.forEach(phone => {
                const cout = phone.cout || 0;
                const maindoeuvre = phone.maindoeuvre || 0;
                const phoneUpdatedDate = new Date(phone.updatedAt);
               
                if (phoneUpdatedDate.getFullYear() === currentYear &&
                    phoneUpdatedDate.getMonth() + 1 === currentMonth &&
                    phoneUpdatedDate.getDate() === currentday) {
                    
                       
                        if (phone.status !== 'refused' && phone.status !== 'waiting') {
                            dailyTotalCout += cout;
                            dailyTotalMaindoeuvre += maindoeuvre;
                        }
                        
                }
                if (phoneUpdatedDate.getFullYear() === currentYear &&
                phoneUpdatedDate.getMonth() + 1 === currentMonth 
               ) {
                
                   
                    if (phone.status !== 'refused' && phone.status !== 'waiting') {
                        monthlyTotalCout += cout;
                        monthlyTotalMaindoeuvre += maindoeuvre;
                    }
                    
            }
            });
            
            

            return (
                setCoutm(monthlyTotalCout),
                setModm(monthlyTotalMaindoeuvre),
                setCoutd(dailyTotalCout),
                setModd(dailyTotalMaindoeuvre)
            )
        
       
    };
    




    const calculateBenefits = (accompte, cout, price) => {
        return (accompte +price)- cout;
    };

    const dayLabels = [...Array(31).keys()].map(i => i + 1);
    const monthLabels = [...Array(12).keys()].map(i => i + 1);

    const calculatePhoneRevenueAndBenefits = (phones) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
    
        // Daily Revenue Calculation
        const dailyRevenue = dayLabels.map(day => {
            let totalAccompte = 0;
            let totalSoldPrice = 0;
    
            phones.forEach(phone => {
                const phoneUpdatedDate = new Date(phone.updatedAt);
                const phoneCreatedDate = new Date(phone.createdAt);
    
                // Calculate totalSoldPrice for 'soldé' phones
                if (phoneUpdatedDate.getFullYear() === currentYear &&
                    phoneUpdatedDate.getMonth() + 1 === currentMonth &&
                    phoneUpdatedDate.getDate() === day &&
                    phone.status === 'soldé') {
                    totalSoldPrice += phone.price || 0;
                }
    
                // Calculate totalAccompte for created phones
                if (phoneCreatedDate.getFullYear() === currentYear &&
                    phoneCreatedDate.getMonth() + 1 === currentMonth &&
                    phoneCreatedDate.getDate() === day) {
                    totalAccompte += phone.accompte || 0;
                }
            });
    
            return totalAccompte + totalSoldPrice;
        });
    
        setDailyPhoneRevenue(dailyRevenue);
    
        // Daily Benefits Calculation
        const dailyBenefits = dayLabels.map(day => {
            let totalAccompte = 0;
            let totalCout = 0;
            let totalMaindoeuvre = 0;
            let totalSoldPrice = 0;
           
            phones.forEach(phone => {
                const price = phone.price || 0;
                const cout = phone.cout || 0;
                const accompte = phone.accompte || 0;
                const maindoeuvre = phone.maindoeuvre || 0;
                const createdDate = new Date(phone.createdAt);
                const phoneUpdatedDate = new Date(phone.updatedAt);
               
                // Accumulate accompte for phones created on the day
                if (createdDate.getFullYear() === currentYear &&
                    createdDate.getMonth() + 1 === currentMonth &&
                    createdDate.getDate() === day) {
                    totalAccompte += accompte;
                }
    
                // Accumulate costs and maindoeuvre for 'fixed' and 'soldé' phones
                if (phoneUpdatedDate.getFullYear() === currentYear &&
                    phoneUpdatedDate.getMonth() + 1 === currentMonth &&
                    phoneUpdatedDate.getDate() === day) {
                    
                       
                        if (phone.status !== 'refused' && phone.status !== 'waiting') {
                            totalSoldPrice += price;
                            totalCout += cout;
                            totalMaindoeuvre += maindoeuvre;
                        }
                }
            });
    
            return calculateBenefits(totalAccompte, totalCout + totalMaindoeuvre, totalSoldPrice);
        });
    
        setDailyPhoneBenefits(dailyBenefits);
    };
    const calculateMonthlyRevenueAndBenefits = (phones) => {
        const currentYear = new Date().getFullYear();
    
        // Monthly Revenue
        const monthlyRevenue = monthLabels.map(month => {
            let totalAccompte = 0;
            let totalSoldPrice = 0;
    
            phones.forEach(phone => {
                const price = phone.price || 0;
                const accompte = phone.accompte || 0;
                const createdDate = new Date(phone.createdAt);
                const phoneUpdatedDate = new Date(phone.updatedAt);
    
                if (createdDate.getFullYear() === currentYear && createdDate.getMonth() + 1 === month) {
                    totalAccompte += accompte;
                }
    
                if (phone.status === 'soldé' && phoneUpdatedDate.getFullYear() === currentYear && phoneUpdatedDate.getMonth() + 1 === month) {
                    totalSoldPrice += price;
                }
            });
    
            return totalAccompte + totalSoldPrice;
        });
    
        setMonthlyPhoneRevenue(monthlyRevenue);
    
        // Monthly Benefits
        const monthlyBenefits = monthLabels.map(month => {
            let totalAccompte = 0;
            let totalCout = 0;
           
            let totalMaindoeuvre = 0;
            let totalSoldPrice = 0;
    
            phones.forEach(phone => {
                const price = phone.price || 0;
                const cout = phone.cout || 0;
                const accompte = phone.accompte || 0;
                const maindoeuvre = phone.maindoeuvre || 0;
                const createdDate = new Date(phone.createdAt);
                const phoneUpdatedDate = new Date(phone.updatedAt);
                
                if (createdDate.getFullYear() === currentYear && createdDate.getMonth() + 1 === month) {
                    totalAccompte += accompte;
                }
    
                if (phoneUpdatedDate.getFullYear() === currentYear && phoneUpdatedDate.getMonth() + 1 === month) {
                   
                    if (phone.status !== 'refused' && phone.status !== 'waiting') {
                        totalSoldPrice += price;
                        totalCout += cout;
                        totalMaindoeuvre += maindoeuvre;
                    }
                }
            });
    
            return calculateBenefits(totalAccompte, totalCout + totalMaindoeuvre, totalSoldPrice);
        });
    
        setMonthlyPhoneBenefits(monthlyBenefits);
    };
    





  return (
    <Grid container spacing={4} sx={{ marginBottom: 4 }}>   

<Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Coût quotidien des PC: {coutd} DT
                </Typography>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Main d'œuvre quotidienne des PC: {modd} DT
                </Typography>
            </Box>
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Coût mensuel des PC: {coutm} DT
                </Typography>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Main d'œuvre mensuelle des PC: {modm} DT
                </Typography>
            </Box>
        </Grid>

<Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
    <Box sx={{ height: 500 }}>
        <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
            Bénéfices quotidiens des PCs
        </Typography>
        <BarChart
            xAxis={[{ scaleType: 'band', data: dayLabels }]}
            series={[{ data: dailyPhoneBenefits, label: 'Bénéfices quotidiens des PCs', color: ['#FFD700'] }]}
            width={800}
            sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
            height={250}
        />
        <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
            Revenu quotidien des PCs
        </Typography>
        <BarChart
            xAxis={[{ scaleType: 'band', data: dayLabels }]}
            series={[{ data: dailyPhoneRevenue, label: 'Revenu quotidien des PCs', color: ['#FFD700'] }]}
            width={800}
            sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
            height={250}
        />
    </Box>
</Grid>


<Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices mensuels des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPhoneBenefits, label: 'Bénéfices mensuels des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu mensuel des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPhoneRevenue, label: 'Revenu mensuel des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>



            </Grid>
  )
}

export default Pcdata