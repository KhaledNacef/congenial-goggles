import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, Grid } from '@mui/material';

const Proddata = () => {
    const [productdata, setProductdata] = useState([]);
    const userIdFromCookie = Cookies.get('token');

    const fetchIncome = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/sold/soldproducts/${userIdFromCookie}`);
            setProductdata(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    useEffect(() => {
        fetchIncome();
    }, []);

    const monthLabels = useMemo(() => [...Array(12).keys()].map(i => i + 1), []);
    const dayLabels = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

    const calculateBenefits = (buyprice, quantity, price) => (price * quantity) - (buyprice * quantity);

    const calculateDaily = (data, day) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const filteredData = data.filter(item => {
            const itemDate = new Date(item.updatedAt);
            return (
                itemDate.getFullYear() === currentYear &&
                itemDate.getMonth() + 1 === currentMonth &&
                itemDate.getDate() === day
            );
        });

        const totalRevenue = filteredData.reduce((total, item) => total + (item.price * item.quantity), 0);
        const totalBenefits = filteredData.reduce((total, item) => {
            const price = item.price || 0;
            const buyprice = item.buyprice || 0;
            const quantity = item.quantity || 0;
            return total + calculateBenefits(buyprice, quantity, price);
        }, 0);

        return { totalRevenue, totalBenefits };
    };

    const calculateMonthly = (data, month) => {
        const currentYear = new Date().getFullYear();

        const filteredData = data.filter(item => {
            const itemDate = new Date(item.updatedAt);
            return (
                itemDate.getFullYear() === currentYear &&
                itemDate.getMonth() + 1 === month
            );
        });

        const totalRevenue = filteredData.reduce((total, item) => total + (item.price * item.quantity), 0);
        const totalBenefits = filteredData.reduce((total, item) => {
            const price = item.price || 0;
            const buyprice = item.buyprice || 0;
            const quantity = item.quantity || 0;
            return total + calculateBenefits(buyprice, quantity, price);
        }, 0);

        return { totalRevenue, totalBenefits };
    };

    const dailyCalculations = dayLabels.map(day => calculateDaily(productdata, day));
    const monthlyCalculations = monthLabels.map(month => calculateMonthly(productdata, month));

    const dailyProdRev = dailyCalculations.map(calc => calc.totalRevenue);
    const dailyProdBenefits = dailyCalculations.map(calc => calc.totalBenefits);
    const monthlyProdRevenue = monthlyCalculations.map(calc => calc.totalRevenue);
    const monthlyProdBenefits = monthlyCalculations.map(calc => calc.totalBenefits);

    return (
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices quotidiens des produits
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dailyProdBenefits, label: 'Bénéfices quotidiens des produits', color: ['#1E90FF'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu quotidien des produits
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dailyProdRev, label: 'Revenu quotidien des produits', color: ['#4682B4'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices mensuels des produits
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyProdBenefits, label: 'Bénéfices mensuels des produits', color: ['#1E90FF'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu mensuel des produits
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyProdRevenue, label: 'Revenu mensuel des produits', color: ['#4682B4'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Proddata;
