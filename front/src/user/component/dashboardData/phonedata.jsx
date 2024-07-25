import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Grid, Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const userIdFromCookie = Cookies.get('token');

const Phonedata = () => {
    const [dailyPhoneRevenue, setDailyPhoneRevenue] = useState([]);
    const [dailyPhoneBenefits, setDailyPhoneBenefits] = useState([]);
    const [monthlyPhoneRevenue, setMonthlyPhoneRevenue] = useState([]);
    const [monthlyPhoneBenefits, setMonthlyPhoneBenefits] = useState([]);
    const [data, setData] = useState([]);
    const [coutd, setCoutd] = useState(0);
    const [modd, setModd] = useState(0);
    const [coutm, setCoutm] = useState(0);
    const [modm, setModm] = useState(0);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/all/${userIdFromCookie}`);
            setData(response.data);
            calculatePhoneRevenueAndBenefits(response.data);
            calculateMonthlyRevenueAndBenefits(response.data);
            calculatePhonemodAndBenefits(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            let monthlyTotalCout = 0;
            let monthlyTotalMaindoeuvre = 0;
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
                            monthlyTotalCout += cout;
                            monthlyTotalMaindoeuvre += maindoeuvre;
                        }
                        
                }
            });
            
            

            return calculateBenefits(totalAccompte, monthlyTotalCout + monthlyTotalMaindoeuvre, totalSoldPrice);
        });
       
        setDailyPhoneBenefits(dailyBenefits);
    };
    const calculateMonthlyRevenueAndBenefits = (phones) => {
        const currentYear = new Date().getFullYear();
    
        // Initialize totals
        let totalCout = 0;
        let totalMaindoeuvre = 0;
    
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
            let monthlyTotalCout = 0;
            let monthlyTotalMaindoeuvre = 0;
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
                        monthlyTotalCout += cout;
                        monthlyTotalMaindoeuvre += maindoeuvre;
                    }
                }
            });
    
            // Accumulate totals
         
           
            return calculateBenefits(totalAccompte, monthlyTotalCout + monthlyTotalMaindoeuvre, totalSoldPrice);
        });
    
        setMonthlyPhoneBenefits(monthlyBenefits);
    
        // Set the total cout and main d'oeuvre
        
    };





    const calculatePhonemodAndBenefits = (phones) => {
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
    
    

    return (
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Coût quotidien des téléphones: {coutd} DT
                </Typography>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Main d'œuvre quotidienne des téléphones: {modd} DT
                </Typography>
            </Box>
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Coût mensuel des téléphones: {coutm} DT
                </Typography>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Main d'œuvre mensuelle des téléphones: {modm} DT
                </Typography>
            </Box>
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Bénéfices quotidiens des téléphones
                </Typography>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: dayLabels }]}
                    series={[{ data: dailyPhoneBenefits, label: 'Bénéfices quotidiens des téléphones', color: ['#DC143C'] }]}
                    width={800}
                    sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                    height={250}
                />
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Revenu quotidien des téléphones
                </Typography>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: dayLabels }]}
                    series={[{ data: dailyPhoneRevenue, label: 'Revenu quotidien des téléphones', color: ['#FF4500'] }]}
                    width={800}
                    sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                    height={250}
                />
            </Box>
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
            <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Bénéfices mensuels des téléphones
                </Typography>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: monthLabels }]}
                    series={[{ data: monthlyPhoneBenefits, label: 'Bénéfices mensuels des téléphones', color: ['#DC143C'] }]}
                    width={800}
                    sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                    height={250}
                />
                <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                    Revenu mensuel des téléphones
                </Typography>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: monthLabels }]}
                    series={[{ data: monthlyPhoneRevenue, label: 'Revenu mensuel des téléphones', color: ['#FF4500'] }]}
                    width={800}
                    sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                    height={250}
                />
            </Box>
        </Grid>
    </Grid>
    
    
    );
};

export default Phonedata;
