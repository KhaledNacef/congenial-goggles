import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Cookies from 'js-cookie';

const Vetrinedata = () => {
    const [vetrine, setVetrine] = useState([]);


    const userIdFromCookie = Cookies.get('token');

    const baseUrl = 'https://api.deviceshopleader.com/api';

    const getallvetrine = async () => {
        try {
            const response = await axios.get(`${baseUrl}/vetrine/soldvetrine/${userIdFromCookie}`);
            setVetrine(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les données :', error);
        }
    };

    useEffect(() => {
        getallvetrine();
    }, []);

    const dayLabels = [...Array(31).keys()].map(i => i + 1); // Example day labels
    const monthLabels = [...Array(12).keys()].map(i => i + 1); // Example month labels

    const calculateBenefits = (values) => {
        // Sort values from greatest to smallest
        const sortedValues = values.sort((a, b) => b - a);
        
        // Calculate benefits by subtracting from the greatest value
        let result = 0;
        for (let i = 0; i < sortedValues.length; i++) {
            result += (i === 0) ? sortedValues[i] : -sortedValues[i];
        }
        return result;
    };

    const dayVitrineRev = dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const filteredVitrines = vetrine.filter(vitrine => {
            const vitrineDate = new Date(vitrine.createdAt);
            return (
                vitrineDate.getFullYear() === currentYear &&
                vitrineDate.getMonth() + 1 === currentMonth &&
                vitrineDate.getDate() === day
            );
        });

        const totalPrice = filteredVitrines.reduce((total, vitrine) => total + vitrine.price, 0);
        return totalPrice;
    });

    const dayVitrineBenefits = dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const filteredVitrines = vetrine.filter(vitrine => {
            const vitrineDate = new Date(vitrine.createdAt);
            return (
                vitrineDate.getFullYear() === currentYear &&
                vitrineDate.getMonth() + 1 === currentMonth &&
                vitrineDate.getDate() === day
            );
        });

        return filteredVitrines.reduce((total, vitrine) => {
            const price = vitrine.price || 0;
            const maindoeuvre = vitrine.maindoeuvre || 0;
            const cout = vitrine.cout || 0;
            const values = [price, cout, maindoeuvre];
            return total + calculateBenefits(values);
        }, 0);
    });

    const monthlyVitrineRevenue = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();

        const vitrinesSoldInMonth = vetrine.filter(vitrine => {
            const vitrineSoldMonth = new Date(vitrine.createdAt);
            return (
                vitrineSoldMonth.getFullYear() === currentYear &&
                vitrineSoldMonth.getMonth() === index
            );
        });

        return vitrinesSoldInMonth.reduce((total, vitrine) => {
            const price = vitrine.price || 0;
            return total + price;
        }, 0);
    });

    const monthlyVitrineBenefits = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();

        const vitrinesSoldInMonth = vetrine.filter(vitrine => {
            const vitrineSoldMonth = new Date(vitrine.createdAt);
            return (
                vitrineSoldMonth.getFullYear() === currentYear &&
                vitrineSoldMonth.getMonth() === index
            );
        });

        return vitrinesSoldInMonth.reduce((total, vitrine) => {
            const price = vitrine.price || 0;
            const maindoeuvre = vitrine.maindoeuvre || 0;
            const cout = vitrine.cout || 0;
            const values = [price, cout, maindoeuvre];
            return total + calculateBenefits(values);
        }, 0);
    });

    return (
        <div>
            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices quotidiens des vitrines
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dayVitrineBenefits, label: 'Bénéfices quotidiens des vitrines', color: ['#32CD32'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu quotidien des vitrines
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dayVitrineRev, label: 'Revenu quotidien des vitrines', color: ['#228B22'] }]}
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
                        series={[{ data: monthlyVitrineBenefits, label: 'Bénéfices mensuels des vitrines', color: ['#32CD32'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu mensuel des vitrines
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyVitrineRevenue, label: 'Revenu mensuel des vitrines', color: ['#228B22'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>
        </div>
    );
}

export default Vetrinedata;
