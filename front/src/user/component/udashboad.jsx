import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [active, setActive] = useState([]);
    const [productdata, setProductdata] = useState([]);
    const [inActive, setInActive] = useState([]);
    const [wating, setWating] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totPro, setTotpro] = useState(0);

    const userIdFromCookie = Cookies.get('token');

    const fetchincome = async () => {
        try {
            const response = await axios.get(`http://195.200.15.61/sold/soldproducts/${userIdFromCookie}`);
            setProductdata(response.data);
            // Calculate most bought product, total products sold, and total income
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
            const response = await axios.get(`http://195.200.15.61/phone/status/${userIdFromCookie}/${status}`);
            setInActive(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const watingg = async () => {
        try {
            const response = await axios.get(`http://195.200.15.61/phone/waiting/${userIdFromCookie}`);
            setWating(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://195.200.15.61/phone/all/${userIdFromCookie}`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchActive = async (status) => {
        try {
            const response = await axios.get(`http://195.200.15.61/phone/status/${userIdFromCookie}/${status}`);
            setActive(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchinActive('Refused');
        fetchActive('Fixed');
        watingg();
        fetchincome();
    }, []);

    // Generate month labels
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Generate day labels from 1 to 31
    const dayLabels = Array.from({ length: 31 }, (_, i) => i + 1);

    // Calculate daily product revenue
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

    // Calculate daily phone revenue
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
                phone.status === 'Fixed' &&
                phoneYear === currentYear &&
                phoneMonth === currentMonth &&
                phoneDay === day
            );
        });

        const totalPrice = phonesFixedOnDay.reduce((total, phone) => total + phone.price, 0);
        return totalPrice;
    });

    // Calculate monthly phone revenue
    const monthlyPhoneRevenue = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const phonesDeliveredInMonth = data.filter(phone => {
            const phoneDeliveryMonth = new Date(phone.updatedAt);
            return (
                phone.status === 'Fixed' &&
                phoneDeliveryMonth.getFullYear() === currentYear &&
                phoneDeliveryMonth.getMonth() === index
            );
        });

        const totalPrice = phonesDeliveredInMonth.reduce((total, phone) => total + phone.price, 0);
        return totalPrice;
    });

    // Calculate monthly product revenue
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
        <div style={{ padding: 10,backgroundColor:'white' }}>
            <Typography variant='h3' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginTop: 3 }}>
                Dashboard
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
                                Fixed Phones
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
                                Refused Phones
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
                                Waiting For
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
                            series={[{ data: dayProdRev, label: 'Daily Product Revenue' }]}
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
                            series={[{ data: dailyPhoneRevenue, label: 'Daily Phone Revenue' }]}
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
                            series={[{ data: monthlyPhoneRevenue, label: 'Monthly Phone Revenue' }]}
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
                            series={[{ data: monthlyProdRevenue, label: 'Monthly Product Revenue' }]}
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

