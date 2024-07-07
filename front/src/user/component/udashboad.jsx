import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [active, setActive] = useState([]);
    const [inActive, setInActive] = useState([]);
    const [wating, setWating] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totPro, setTotpro] = useState(0);
    const [productdata, setProductdata] = useState([]);

    const userIdFromCookie = Cookies.get('token');

    const fetchincome = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/sold/soldproducts/${userIdFromCookie}`);
            setProductdata(response.data);
            // Calculer le produit le plus acheté, le nombre total de produits vendus et le revenu total
            let totalIncome = 0;
            let totalProduct = 0;

            response.data.forEach((product) => {
                totalIncome += product.price * product.quantity;
                totalProduct += product.quantity;
            });

            setTotalIncome(totalIncome);
            setTotpro(totalProduct);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchinActive = async (status) => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/phone/status/${userIdFromCookie}/${status}`);
            setInActive(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const watingg = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/phone/waiting/${userIdFromCookie}`);
            setWating(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/phone/all/${userIdFromCookie}`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchActive = async (status) => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/phone/status/${userIdFromCookie}/${status}`);
            setActive(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchinActive('Refusé');
        fetchActive('Réparé');
        watingg();
        fetchincome();
    }, []);

    // Labels des mois
    const monthLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    // Labels des jours de 1 à 31
    const dayLabels = Array.from({ length: 31 }, (_, i) => i + 1);

    // Calculer le revenu quotidien des produits
    const dayProdRev = dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const prodRe = productdata.filter(pro => {
            const prodReDate = new Date(pro.updatedAt);
            return (
                prodReDate.getFullYear() === currentYear &&
                prodReDate.getMonth() + 1 === currentMonth &&
                prodReDate.getDate() === day
            );
        });

        const totalPrice = prodRe.reduce((total, product) => total + (product.price * product.quantity), 0);
        return totalPrice;
    });

    // Calculer le revenu quotidien des téléphones
    const dailyPhoneRevenue = dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const phonesFixedOnDay = data.filter(phone => {
            const fixDate = new Date(phone.updatedAt);
            const phoneYear = fixDate.getFullYear();
            const phoneMonth = fixDate.getMonth() + 1;
            const phoneDay = fixDate.getDate();
            return (
                phone.status === 'Réparé' &&
                phoneYear === currentYear &&
                phoneMonth === currentMonth &&
                phoneDay === day
            );
        });

        const totalPrice = phonesFixedOnDay.reduce((total, phone) => total + phone.price, 0);
        return totalPrice;
    });

    // Calculer le revenu mensuel des téléphones
    const monthlyPhoneRevenue = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const phonesDeliveredInMonth = data.filter(phone => {
            const phoneDeliveryMonth = new Date(phone.updatedAt);
            return (
                phone.status === 'Réparé' &&
                phoneDeliveryMonth.getFullYear() === currentYear &&
                phoneDeliveryMonth.getMonth() === index
            );
        });

        const totalPrice = phonesDeliveredInMonth.reduce((total, phone) => total + phone.price, 0);
        return totalPrice;
    });

    // Calculer le revenu mensuel des produits
    const monthlyProdRevenue = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const productsSold = productdata.filter(product => {
            const productSoldMonth = new Date(product.updatedAt);
            return (
                productSoldMonth.getFullYear() === currentYear &&
                productSoldMonth.getMonth() === index
            );
        });

        const totalRevenue = productsSold.reduce((total, product) => total + (product.price * product.quantity), 0);
        return totalRevenue;
    });

    return (
        <div style={{ padding: 10, backgroundColor: 'white' }}>
            <Typography variant='h3' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginTop: 3 }}>
                Tableau de bord
            </Typography>

            <Grid container spacing={3} sx={{ marginTop: 3 }}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ height: 100 }}>
                        <Box
                            sx={{
                                padding: 2,
                                height: '100%',
                                border: '1px solid grey',
                                borderRadius: 3,
                                backgroundColor: 'white',
                                textAlign: 'center',
                                boxShadow: 15,
                            }}
                        >
                            <PhoneIcon />
                            <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: 'black' }}>
                                Téléphones réparés
                            </Typography>
                            <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: 'green' }}>
                                {active.length}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ height: 100 }}>
                        <Box
                            sx={{
                                padding: 2,
                                height: '100%',
                                border: '1px solid grey',
                                borderRadius: 3,
                                backgroundColor: 'white',
                                textAlign: 'center',
                                boxShadow: 15,
                            }}
                        >
                            <CancelIcon />
                            <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: 'black' }}>
                                Téléphones refusés
                            </Typography>
                            <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: 'black' }}>
                                {inActive.length}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ height: 100 }}>
                        <Box
                            sx={{
                                padding: 2,
                                height: '100%',
                                border: '1px solid grey',
                                borderRadius: 3,
                                backgroundColor: 'white',
                                textAlign: 'center',
                                boxShadow: 15,
                            }}
                        >
                            <HourglassEmptyIcon />
                            <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: 'black' }}>
                                En attente de traitement
                            </Typography>
                            <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: 'black' }}>
                                {wating.length}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ height: 500 }}>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: dayLabels }]}
                            series={[{ data: dayProdRev, label: 'Revenu quotidien des produits', color: ['#3366CC'] }]}
                            width={800}
                            sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                            height={500}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ height: 500 }}>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: dayLabels }]}
                            series={[{ data: dailyPhoneRevenue, label: 'Revenu quotidien des téléphones', color: ['#DC3912'] }]}
                            width={800}
                            sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                            height={500}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ height: 500 }}>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: monthLabels }]}
                            series={[{ data: monthlyPhoneRevenue, label: 'Revenu mensuel des téléphones', color: ['#FF9900'] }]}
                            width={800}
                            sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                            height={500}
                        />
                    </Box>
                   
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ height: 500 }}>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: monthLabels }]}
                            series={[{ data: monthlyProdRevenue, label: 'Revenu mensuel des produits', color: ['#109618'] }]}
                            width={800}
                            sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                            height={500}
                        />
                    </Box>
                    
                </Grid>

            </Grid>
        </div>
    );
}
