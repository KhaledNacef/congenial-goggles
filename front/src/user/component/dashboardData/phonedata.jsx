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
    const [coutd, setCoutd] = useState([]);
    const [modd, setModd] = useState([]);
    const [coutm, setCoutm] = useState([]);
    const [modm, setModm] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/all/${userIdFromCookie}`);
            setData(response.data);
            calculatePhoneRevenueAndBenefits(response.data);
            calculateMonthlyRevenueAndBenefits(response.data);
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
            setCoutd(totalCout);
            setModd(totalMaindoeuvre);
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
            setCoutm(totalCout);
            setModm(totalMaindoeuvre);
            return calculateBenefits(totalAccompte, totalCout + totalMaindoeuvre, totalSoldPrice);
        });
    
        setMonthlyPhoneBenefits(monthlyBenefits);
    };
    
    

    return (
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Box sx={{ height: 500 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
              Bénéfices quotidiens des téléphones
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
              Coût quotidien des téléphones: {coutd} DT
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
              Main d'œuvre quotidienne des téléphones: {modd} DT
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: dayLabels }]}
              series={[{ data: dailyPhoneBenefits, label: 'Bénéfices quotidiens des téléphones', color: ['#DC143C'] }]}
              width={350}
              height={250}
              sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box sx={{ height: 500 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
              Revenu quotidien des téléphones
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: dayLabels }]}
              series={[{ data: dailyPhoneRevenue, label: 'Revenu quotidien des téléphones', color: ['#FF4500'] }]}
              width={350}
              height={250}
              sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box sx={{ height: 500 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
              Bénéfices mensuels des téléphones
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
              Coût mensuel des téléphones: {coutm} DT
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
              Main d'œuvre mensuelle des téléphones: {modm} DT
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: monthLabels }]}
              series={[{ data: monthlyPhoneBenefits, label: 'Bénéfices mensuels des téléphones', color: ['#DC143C'] }]}
              width={350}
              height={250}
              sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box sx={{ height: 500 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
              Revenu mensuel des téléphones
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: monthLabels }]}
              series={[{ data: monthlyPhoneRevenue, label: 'Revenu mensuel des téléphones', color: ['#FF4500'] }]}
              width={350}
              height={250}
              sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
            />
          </Box>
        </Grid>
      </Grid>
    );
};

export default Phonedata;
