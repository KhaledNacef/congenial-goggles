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
        return  price-(accompte + cout) ;
    };

    const dayLabels = [...Array(31).keys()].map(i => i + 1);
    const monthLabels = [...Array(12).keys()].map(i => i + 1);

    const calculatePhoneRevenueAndBenefits = (phones) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const today = currentDate.getDate();

        // Daily Revenue
        const dailyRevenue = dayLabels.map(day => {
            const phonesOnDay = phones.filter(phone => {
                const phoneDate = new Date(phone.updatedAt);
                return (
                    phoneDate.getFullYear() === currentYear &&
                    phoneDate.getMonth() + 1 === currentMonth &&
                    phoneDate.getDate() === day
                );
            });

            let totalWaitingAccompte = 0;
            let totalFixedAccompte = 0;
            let totalSoldPrice = 0;

            phonesOnDay.forEach(phone => {
                const phoneCreatedDate = new Date(phone.createdAt);
                const phoneUpdatedDate = new Date(phone.updatedAt);

                if (phoneCreatedDate.getFullYear() === currentYear &&
                    phoneCreatedDate.getMonth() + 1 === currentMonth &&
                    phoneCreatedDate.getDate() === today) {
                    if (phone.status === 'waiting') {
                        totalWaitingAccompte += phone.accompte || 0;
                    } else if (phone.status === 'fixed') {
                        totalFixedAccompte += phone.accompte || 0;
                    }
                }

                if (phoneUpdatedDate.getFullYear() === currentYear &&
                    phoneUpdatedDate.getMonth() + 1 === currentMonth &&
                    phoneUpdatedDate.getDate() === today &&
                    phone.status === 'soldé') {
                    totalSoldPrice += phone.price || 0;
                }
            });

            return totalWaitingAccompte + totalFixedAccompte + totalSoldPrice;
        });

        setDailyPhoneRevenue(dailyRevenue);

        // Daily Benefits
        const dailyBenefits = dayLabels.map(day => {
            const phonesOnDay = phones.filter(phone => {
                const phoneCreatedDate = new Date(phone.createdAt);
                const phoneUpdatedDate = new Date(phone.updatedAt);
                return (
                    phoneCreatedDate.getFullYear() === currentYear &&
                    phoneCreatedDate.getMonth() + 1 === currentMonth &&
                    phoneCreatedDate.getDate() === day ||
                    phoneUpdatedDate.getFullYear() === currentYear &&
                    phoneUpdatedDate.getMonth() + 1 === currentMonth &&
                    phoneUpdatedDate.getDate() === day
                );
            });

            let totalAccompte = 0;
            let totalCout = 0;
            let totalMaindoeuvre = 0;
            let totalSoldPrice = 0;

            phonesOnDay.forEach(phone => {
                const price = phone.price || 0;
                const cout = phone.cout || 0;
                const accompte = phone.accompte || 0;
                const maindoeuvre = phone.maindoeuvre || 0;
                const createdDate = new Date(phone.createdAt);
                const updatedDate = new Date(phone.updatedAt);

                if (createdDate.getFullYear() === currentYear &&
                    createdDate.getMonth() + 1 === currentMonth &&
                    createdDate.getDate() === day) {
                    if (phone.status === 'waiting') {
                        totalAccompte += accompte;
                    } else if (phone.status === 'fixed') {
                        totalAccompte += accompte;
                        totalCout += cout;
                        totalMaindoeuvre += maindoeuvre;
                    }
                }

                if (updatedDate.getFullYear() === currentYear &&
                    updatedDate.getMonth() + 1 === currentMonth &&
                    updatedDate.getDate() === day &&
                    phone.status === 'soldé') {
                    totalSoldPrice += price;
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
            const phonesInMonth = phones.filter(phone => {
                const phoneDate = new Date(phone.updatedAt);
                return (
                    phoneDate.getFullYear() === currentYear &&
                    phoneDate.getMonth() + 1 === month
                );
            });

            let totalWaitingAccompte = 0;
            let totalFixedAccompte = 0;
            let totalSoldPrice = 0;

            phonesInMonth.forEach(phone => {
                const price = phone.price || 0;
                const accompte = phone.accompte || 0;
                const createdDate = new Date(phone.createdAt);

                if (phone.status === 'waiting' && createdDate.getMonth() + 1 === month) {
                    totalWaitingAccompte += accompte;
                } else if (phone.status === 'fixed' && createdDate.getMonth() + 1 === month) {
                    totalFixedAccompte += accompte;
                } else if (phone.status === 'soldé') {
                    totalSoldPrice += price;
                }
            });

            return totalWaitingAccompte + totalFixedAccompte + totalSoldPrice;
        });

        setMonthlyPhoneRevenue(monthlyRevenue);

        // Monthly Benefits
        const monthlyBenefits = monthLabels.map(month => {
            const phonesInMonth = phones.filter(phone => {
                const phoneDate = new Date(phone.updatedAt);
                return (
                    phoneDate.getFullYear() === currentYear &&
                    phoneDate.getMonth() + 1 === month
                );
            });

            let totalAccompte = 0;
            let totalCout = 0;
            let totalMaindoeuvre = 0;
            let totalSoldPrice = 0;

            phonesInMonth.forEach(phone => {
                const price = phone.price || 0;
                const cout = phone.cout || 0;
                const accompte = phone.accompte || 0;
                const maindoeuvre = phone.maindoeuvre || 0;

                if (phone.status === 'waiting') {
                    totalAccompte += accompte;
                } else if (phone.status === 'fixed') {
                    totalAccompte += accompte;
                    totalCout += cout;
                    totalMaindoeuvre += maindoeuvre;
                } else if (phone.status === 'soldé') {
                    totalSoldPrice += price;
                    totalMaindoeuvre += maindoeuvre;
                }
            });

            return calculateBenefits(totalAccompte, totalCout + totalMaindoeuvre, totalSoldPrice);
        });

        setMonthlyPhoneBenefits(monthlyBenefits);
    };

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
