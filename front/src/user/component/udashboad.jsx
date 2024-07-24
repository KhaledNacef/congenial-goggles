import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [active, setActive] = useState([]);
    const [inActive, setInActive] = useState([]);
    const [waiting, setWaiting] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totPro, setTotPro] = useState(0);
    const [productData, setProductData] = useState([]);
    const [vitrineData, setVitrineData] = useState([]);
    const [pcData, setPcData] = useState([]);

    const userIdFromCookie = Cookies.get('token');
    const baseUrl = 'https://api.deviceshopleader.com/api';

    const fetchIncome = async () => {
        try {
            const response = await axios.get(`${baseUrl}/sold/soldproducts/${userIdFromCookie}`);
            setProductData(response.data);

            let totalIncome = 0;
            let totalProduct = 0;

            response.data.forEach((product) => {
                totalIncome += product.price * product.quantity;
                totalProduct += product.quantity;
            });

            setTotalIncome(totalIncome);
            setTotPro(totalProduct);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchInActive = async (status) => {
        try {
            const response = await axios.get(`${baseUrl}/phone/status/${userIdFromCookie}/${status}`);
            
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
    
            const phonesUpdatedToday = response.data.filter(phone => {
                const updatedDate = new Date(phone.updatedAt);
                return (
                    updatedDate.getFullYear() === todayYear &&
                    updatedDate.getMonth() === todayMonth &&
                    updatedDate.getDate() === todayDate
                );
            });
    
            setInActive(phonesUpdatedToday);
        } catch (error) {
            console.error("Error fetching inactive phones:", error);
        }
    };

    const fetchWaiting = async () => {
        try {
            const response = await axios.get(`${baseUrl}/phone/waiting/${userIdFromCookie}`);
            setWaiting(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllVetrine = async () => {
        try {
            const response = await axios.get(`${baseUrl}/vetrine/vetrinesgetall/${userIdFromCookie}`);
            setVitrineData(response.data);
        } catch (error) {
            console.error('Error fetching vitrines:', error);
        }
    };

    const getAllPc = async () => {
        try {
            const response = await axios.get(`${baseUrl}/pc/all/${userIdFromCookie}`);
            setPcData(response.data);
        } catch (error) {
            console.error('Error fetching PCs:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/phone/all/${userIdFromCookie}`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchActive = async (status) => {
        try {
            const response = await axios.get(`${baseUrl}/phone/status/${userIdFromCookie}/${status}`);
            
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
    
            const phonesUpdatedToday = response.data.filter(phone => {
                const updatedDate = new Date(phone.updatedAt);
                return (
                    updatedDate.getFullYear() === todayYear &&
                    updatedDate.getMonth() === todayMonth &&
                    updatedDate.getDate() === todayDate
                );
            });
    
            setActive(phonesUpdatedToday);
        } catch (error) {
            console.error("Error fetching active phones:", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchInActive('Refused');
        fetchActive('Fixed');
        fetchWaiting();
        fetchIncome();
        getAllVetrine();
        getAllPc();
    }, []);

    const monthLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const dayLabels = Array.from({ length: 31 }, (_, i) => i + 1);

    const calculateDailyRevenue = (data, priceKey, dateKey) => {
        return dayLabels.map(day => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            const filteredData = data.filter(item => {
                const itemDate = new Date(item[dateKey]);
                return (
                    itemDate.getFullYear() === currentYear &&
                    itemDate.getMonth() + 1 === currentMonth &&
                    itemDate.getDate() === day
                );
            });

            return filteredData.reduce((total, item) => total + item[priceKey], 0);
        });
    };

    const calculateMonthlyRevenue = (data, priceKey, dateKey) => {
        return monthLabels.map((_, index) => {
            const currentYear = new Date().getFullYear();

            const filteredData = data.filter(item => {
                const itemDate = new Date(item[dateKey]);
                return (
                    itemDate.getFullYear() === currentYear &&
                    itemDate.getMonth() === index
                );
            });

            return filteredData.reduce((total, item) => total + item[priceKey], 0);
        });
    };

    const calculateBenefits = (data, priceKey, costKey, laborKey, downPaymentKey) => {
        return dayLabels.map(day => {
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

            return filteredData.reduce((total, item) => total + (item[priceKey] - item[costKey] - item[laborKey] - item[downPaymentKey]), 0);
        });
    };

    const calculateBenefitsMonthly = (data, priceKey, costKey, laborKey, downPaymentKey) => {
        return monthLabels.map((_, index) => {
            const currentYear = new Date().getFullYear();

            const filteredData = data.filter(item => {
                const itemDate = new Date(item.updatedAt);
                return (
                    itemDate.getFullYear() === currentYear &&
                    itemDate.getMonth() === index
                );
            });

            return filteredData.reduce((total, item) => total + (item[priceKey] - item[costKey] - item[laborKey] - item[downPaymentKey]), 0);
        });
    };

    const dailyPhoneRevenue = calculateDailyRevenue(data, 'price', 'updatedAt');
    const monthlyPhoneRevenue = calculateMonthlyRevenue(data, 'price', 'updatedAt');
    const dailyPhoneBenefits = calculateBenefits(data, 'price', 'cost', 'labor', 'downPayment');
    const monthlyPhoneBenefits = calculateBenefitsMonthly(data, 'price', 'cost', 'labor', 'downPayment');

    const dailyPcRevenue = calculateDailyRevenue(pcData, 'price', 'updatedAt');
    const monthlyPcRevenue = calculateMonthlyRevenue(pcData, 'price', 'updatedAt');
    const dailyPcBenefits = calculateBenefits(pcData, 'price', 'cost', 'labor', 'downPayment');
    const monthlyPcBenefits = calculateBenefitsMonthly(pcData, 'price', 'cost', 'labor', 'downPayment');

    const dailyVitrineRevenue = calculateDailyRevenue(vitrineData, 'price', 'updatedAt');
    const monthlyVitrineRevenue = calculateMonthlyRevenue(vitrineData, 'price', 'updatedAt');
    const dailyVitrineBenefits = dailyVitrineRevenue.map((revenue, index) => revenue - vitrineData.filter(vitrine => new Date(vitrine.updatedAt).getDate() === index + 1).reduce((total, vitrine) => total + (vitrine.cost * vitrine.quantity), 0));
    const monthlyVitrineBenefits = monthlyVitrineRevenue.map((revenue, index) => revenue - vitrineData.filter(vitrine => new Date(vitrine.updatedAt).getMonth() === index).reduce((total, vitrine) => total + (vitrine.cost * vitrine.quantity), 0));

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Phone Revenue</Typography>
                <Box mb={2}>
                    <Typography variant="h6">Daily Revenue</Typography>
                    <BarChart data={dailyPhoneRevenue.map((value, index) => ({ x: dayLabels[index], y: value }))} xAxisLabel="Day" yAxisLabel="Revenue" />
                </Box>
                <Box>
                    <Typography variant="h6">Monthly Revenue</Typography>
                    <BarChart data={monthlyPhoneRevenue.map((value, index) => ({ x: monthLabels[index], y: value }))} xAxisLabel="Month" yAxisLabel="Revenue" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Phone Benefits</Typography>
                <Box mb={2}>
                    <Typography variant="h6">Daily Benefits</Typography>
                    <BarChart data={dailyPhoneBenefits.map((value, index) => ({ x: dayLabels[index], y: value }))} xAxisLabel="Day" yAxisLabel="Benefits" />
                </Box>
                <Box>
                    <Typography variant="h6">Monthly Benefits</Typography>
                    <BarChart data={monthlyPhoneBenefits.map((value, index) => ({ x: monthLabels[index], y: value }))} xAxisLabel="Month" yAxisLabel="Benefits" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">PC Revenue</Typography>
                <Box mb={2}>
                    <Typography variant="h6">Daily Revenue</Typography>
                    <BarChart data={dailyPcRevenue.map((value, index) => ({ x: dayLabels[index], y: value }))} xAxisLabel="Day" yAxisLabel="Revenue" />
                </Box>
                <Box>
                    <Typography variant="h6">Monthly Revenue</Typography>
                    <BarChart data={monthlyPcRevenue.map((value, index) => ({ x: monthLabels[index], y: value }))} xAxisLabel="Month" yAxisLabel="Revenue" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">PC Benefits</Typography>
                <Box mb={2}>
                    <Typography variant="h6">Daily Benefits</Typography>
                    <BarChart data={dailyPcBenefits.map((value, index) => ({ x: dayLabels[index], y: value }))} xAxisLabel="Day" yAxisLabel="Benefits" />
                </Box>
                <Box>
                    <Typography variant="h6">Monthly Benefits</Typography>
                    <BarChart data={monthlyPcBenefits.map((value, index) => ({ x: monthLabels[index], y: value }))} xAxisLabel="Month" yAxisLabel="Benefits" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Vitrine Revenue</Typography>
                <Box mb={2}>
                    <Typography variant="h6">Daily Revenue</Typography>
                    <BarChart data={dailyVitrineRevenue.map((value, index) => ({ x: dayLabels[index], y: value }))} xAxisLabel="Day" yAxisLabel="Revenue" />
                </Box>
                <Box>
                    <Typography variant="h6">Monthly Revenue</Typography>
                    <BarChart data={monthlyVitrineRevenue.map((value, index) => ({ x: monthLabels[index], y: value }))} xAxisLabel="Month" yAxisLabel="Revenue" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Vitrine Benefits</Typography>
                <Box mb={2}>
                    <Typography variant="h6">Daily Benefits</Typography>
                    <BarChart data={dailyVitrineBenefits.map((value, index) => ({ x: dayLabels[index], y: value }))} xAxisLabel="Day" yAxisLabel="Benefits" />
                </Box>
                <Box>
                    <Typography variant="h6">Monthly Benefits</Typography>
                    <BarChart data={monthlyVitrineBenefits.map((value, index) => ({ x: monthLabels[index], y: value }))} xAxisLabel="Month" yAxisLabel="Benefits" />
                </Box>
            </Grid>
        </Grid>
    );
}
