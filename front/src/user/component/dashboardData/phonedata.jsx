import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Grid, Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const userIdFromCookie = Cookies.get('token');

const Phonedata = () => {
    const [totalWaitingAccompte, setTotalWaitingAccompte] = useState(0);
    const [dailyPhoneRevenue, setDailyPhoneRevenue] = useState([]);
    const [dailyPhoneBenefits, setDailyPhoneBenefits] = useState([]);
    const [monthlyPhoneRevenue, setMonthlyPhoneRevenue] = useState([]);
    const [monthlyPhoneBenefits, setMonthlyPhoneBenefits] = useState([]);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/all/${userIdFromCookie}`);
            setData(response.data);
            calculatePhoneRevenueAndAccompte(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Calculate benefits
    const calculateBenefits = (values) => {
        const sortedValues = values.sort((a, b) => b - a);
        let result = 0;
        for (let i = 0; i < sortedValues.length; i++) {
            result += (i === 0) ? sortedValues[i] : -sortedValues[i];
        }
        return result;
    };

    const dayLabels = [...Array(31).keys()].map(i => i + 1);
    const monthLabels = [...Array(12).keys()].map(i => i + 1);

    const calculatePhoneRevenueAndAccompte = (phones) => {
        let waitingAccompte = 0;
        const revenue = dayLabels.map(day => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            const phonesOnDay = phones.filter(phone => {
                const fixDate = new Date(phone.updatedAt);
                return (
                    fixDate.getFullYear() === currentYear &&
                    fixDate.getMonth() + 1 === currentMonth &&
                    fixDate.getDate() === day
                );
            });

            const totalPrice = phonesOnDay.reduce((total, phone) => {
                if (phone.status === 'soldé') {
                    return total + phone.price;
                } else if (phone.status === 'waiting') {
                    waitingAccompte += phone.accompte || 0;
                    return total;
                }
                return total;
            }, 0);

            return totalPrice;
        });

        setTotalWaitingAccompte(waitingAccompte);
        setDailyPhoneRevenue(revenue);
    };

    const calculateBenefitsForDay = (phones) => {
        return dayLabels.map(day => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            const phonesOnDay = phones.filter(phone => {
                const fixDate = new Date(phone.updatedAt);
                return (
                    phone.status === 'Fixed' &&
                    fixDate.getFullYear() === currentYear &&
                    fixDate.getMonth() + 1 === currentMonth &&
                    fixDate.getDate() === day
                );
            });

            return phonesOnDay.reduce((total, phone) => {
                const price = phone.price || 0;
                const cout = phone.cout || 0;
                const accompte = phone.accompte || 0;
                const maindoeuvre = phone.maindoeuvre || 0;
                const values = [price, cout, accompte, maindoeuvre];
                return total + calculateBenefits(values);
            }, 0);
        });
    };

    const calculateMonthlyRevenueAndBenefits = (phones) => {
        const currentYear = new Date().getFullYear();

        const monthlyRevenue = monthLabels.map((month, index) => {
            const phonesDeliveredInMonth = phones.filter(phone => {
                const phoneDeliveryMonth = new Date(phone.updatedAt);
                return (
                    phone.status === 'soldé' &&
                    phoneDeliveryMonth.getFullYear() === currentYear &&
                    phoneDeliveryMonth.getMonth() === index
                );
            });

            return phonesDeliveredInMonth.reduce((total, phone) => {
                const price = phone.price || 0;
                const accompte = phone.accompte || 0;
                return total + (price + accompte);
            }, 0);
        });

        const monthlyBenefits = monthLabels.map((month, index) => {
            const phonesDeliveredInMonth = phones.filter(phone => {
                const phoneDeliveryMonth = new Date(phone.updatedAt);
                return (
                    phone.status === 'soldé' &&
                    phoneDeliveryMonth.getFullYear() === currentYear &&
                    phoneDeliveryMonth.getMonth() === index
                );
            });

            return phonesDeliveredInMonth.reduce((total, phone) => {
                const price = phone.price || 0;
                const cout = phone.cout || 0;
                const accompte = phone.accompte || 0;
                const maindoeuvre = phone.maindoeuvre || 0;
                const values = [price, cout, accompte, maindoeuvre];
                return total + calculateBenefits(values);
            }, 0);
        });

        setMonthlyPhoneRevenue(monthlyRevenue);
        setMonthlyPhoneBenefits(monthlyBenefits);
    };

    useEffect(() => {
        calculateBenefitsForDay(data);
        calculateMonthlyRevenueAndBenefits(data);
    }, [data]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices quotidiens des téléphones
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dailyPhoneBenefits, label: 'Bénéfices quotidiens des téléphones', color: ['#DC143C'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
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
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices mensuels des téléphones
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPhoneBenefits, label: 'Bénéfices mensuels des téléphones', color: ['#DC143C'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
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
