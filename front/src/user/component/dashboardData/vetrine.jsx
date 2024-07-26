import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Cookies from 'js-cookie';

const Vetrinedata = () => {
    const [vetrine, setVetrine] = useState([]);
    const [dataa, setDataa] = useState([]);
    const [dailyPcRevenue, setDailyPcRevenue] = useState([]);
    const [dailyPcBenefits, setDailyPcBenefits] = useState([]);
    const [monthlyPcRevenue, setMonthlyPcRevenue] = useState([]);
    const [monthlyPcBenefits, setMonthlyPcBenefits] = useState([]);
    const [dailyPCCost, setDailyPCCost] = useState(0);
    const [dailyPCMaindoeuvre, setDailyPCMaindoeuvre] = useState(0);
    const [monthlyPCCost, setMonthlyPCCost] = useState(0);
    const [monthlyPCMaindoeuvre, setMonthlyPCMaindoeuvre] = useState(0);

    const userIdFromCookie = Cookies.get('token');
    const baseUrl = 'https://api.deviceshopleader.com/api';

    const getallvetrine = async () => {
        try {
            const response = await axios.get(`${baseUrl}/soldedvetrine/soldvetrine/${userIdFromCookie}`);
            setVetrine(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les données :', error);
        }
    };

    const getall = async () => {
        try {
            const response = await axios.get(`${baseUrl}/vetrine/vetrinesgetall/${userIdFromCookie}`);
            setDataa(response.data);
            calculateModAndCout(response.data);
            calculatePhoneRevenueAndBenefits(response.data);
            calculateMonthlyRevenueAndBenefits(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les données :', error);
        }
    };

    useEffect(() => {
        getallvetrine();
        getall();
    }, []);

    const dayLabels = [...Array(31).keys()].map(i => i + 1); // Example day labels
    const monthLabels = [...Array(12).keys()].map(i => i + 1); // Example month labels

    const calculateBenefits = (maindoeuvre, cout, price) => {
        return price - (maindoeuvre + cout);
    };

    const calculateModAndCout = (data) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        
        let monthlyTotalCout = 0;
        let monthlyTotalMaindoeuvre = 0;
        let dailyTotalCout = 0;
        let dailyTotalMaindoeuvre = 0;

        data.forEach(item => {
            const cout = item.cout || 0;
            const maindoeuvre = item.maindoeuvre || 0;
            const itemUpdatedDate = new Date(item.updatedAt);
            
            if (itemUpdatedDate.getFullYear() === currentYear &&
                itemUpdatedDate.getMonth() + 1 === currentMonth &&
                itemUpdatedDate.getDate() === currentDay) {
                if (item.status !== 'refused' && item.status !== 'waiting') {
                    dailyTotalCout += cout;
                    dailyTotalMaindoeuvre += maindoeuvre;
                }
            }
            
            if (itemUpdatedDate.getFullYear() === currentYear &&
                itemUpdatedDate.getMonth() + 1 === currentMonth) {
                if (item.status !== 'refused' && item.status !== 'waiting') {
                    monthlyTotalCout += cout;
                    monthlyTotalMaindoeuvre += maindoeuvre;
                }
            }
        });

        setMonthlyPCCost(monthlyTotalCout);
        setMonthlyPCMaindoeuvre(monthlyTotalMaindoeuvre);
        setDailyPCCost(dailyTotalCout);
        setDailyPCMaindoeuvre(dailyTotalMaindoeuvre);
    };

    const calculatePhoneRevenueAndBenefits = (data) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        // Daily Revenue Calculation
        const dailyRevenue = dayLabels.map(day => {
            let totalSoldPrice = 0;

            data.forEach(item => {
                const itemUpdatedDate = new Date(item.updatedAt);

                if (itemUpdatedDate.getFullYear() === currentYear &&
                    itemUpdatedDate.getMonth() + 1 === currentMonth &&
                    itemUpdatedDate.getDate() === day &&
                    item.status === 'soldé') {
                    totalSoldPrice += item.price || 0;
                }
            });

            return totalSoldPrice;
        });

        setDailyPcRevenue(dailyRevenue);

        // Daily Benefits Calculation
        const dailyBenefits = dayLabels.map(day => {
            let totalCout = 0;
            let totalMaindoeuvre = 0;
            let totalSoldPrice = 0;

            data.forEach(item => {
                const price = item.price || 0;
                const cout = item.cout || 0;
                const maindoeuvre = item.maindoeuvre || 0;
                const itemUpdatedDate = new Date(item.updatedAt);

                if (itemUpdatedDate.getFullYear() === currentYear &&
                    itemUpdatedDate.getMonth() + 1 === currentMonth &&
                    itemUpdatedDate.getDate() === day) {
                    if (item.status !== 'refused' && item.status !== 'waiting'&& item.status !== 'soldé') {
                        totalCout += cout;
                        totalMaindoeuvre += maindoeuvre;
                    }
                    if (item.status !== 'refused' && item.status !== 'waiting'&& item.status !== 'Fixed') {
                        totalSoldPrice += price;
                        totalCout += cout;
                        totalMaindoeuvre += maindoeuvre;
                    }
                }
            });

            return calculateBenefits(totalMaindoeuvre, totalCout, totalSoldPrice);
        });

        setDailyPcBenefits(dailyBenefits);
    };

    const calculateMonthlyRevenueAndBenefits = (data) => {
        const currentYear = new Date().getFullYear();

        // Monthly Revenue
        const monthlyRevenue = monthLabels.map(month => {
            let totalSoldPrice = 0;

            data.forEach(item => {
                const price = item.price || 0;
                const itemUpdatedDate = new Date(item.updatedAt);

                if (item.status === 'soldé' &&
                    itemUpdatedDate.getFullYear() === currentYear &&
                    itemUpdatedDate.getMonth() + 1 === month) {
                    totalSoldPrice += price;
                }
            });

            return totalSoldPrice;
        });

        setMonthlyPcRevenue(monthlyRevenue);

        // Monthly Benefits
        const monthlyBenefits = monthLabels.map(month => {
            let totalCout = 0;
            let totalMaindoeuvre = 0;
            let totalSoldPrice = 0;

            data.forEach(item => {
                const price = item.price || 0;
                const cout = item.cout || 0;
                const maindoeuvre = item.maindoeuvre || 0;
                const itemUpdatedDate = new Date(item.updatedAt);

                if (itemUpdatedDate.getFullYear() === currentYear &&
                    itemUpdatedDate.getMonth() + 1 === month) {
                        if (item.status !== 'refused' && item.status !== 'waiting'&& item.status !== 'soldé') {
                            totalCout += cout;
                            totalMaindoeuvre += maindoeuvre;
                        }
                        if (item.status !== 'refused' && item.status !== 'waiting'&& item.status !== 'Fixed') {
                            totalSoldPrice += price;
                            totalCout += cout;
                            totalMaindoeuvre += maindoeuvre;
                        }
                }
            });

            return calculateBenefits(totalMaindoeuvre, totalCout, totalSoldPrice);
        });

        setMonthlyPcBenefits(monthlyBenefits);
    };

    return (
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                        Coût quotidien des Vetrine: {dailyPCCost} DT
                    </Typography>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                        Main d'œuvre quotidienne des Vetrine: {dailyPCMaindoeuvre} DT
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                        Coût mensuel des Vetrine: {monthlyPCCost} DT
                    </Typography>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, marginBottom: 2 }}>
                        Main d'œuvre mensuelle des Vetrine: {monthlyPCMaindoeuvre} DT
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices quotidiens des vitrines
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dailyPcBenefits, label: 'Bénéfices quotidiens des vitrines', color: ['#32CD32'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu quotidien des vitrines
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dailyPcRevenue, label: 'Revenu quotidien des vitrines', color: ['#228B22'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices mensuels des vitrines
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPcBenefits, label: 'Bénéfices mensuels des vitrines', color: ['#32CD32'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu mensuel des vitrines
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPcRevenue, label: 'Revenu mensuel des vitrines', color: ['#228B22'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Vetrinedata;
