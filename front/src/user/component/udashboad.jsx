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
    const [pc,setPc]=useState([])
    const userIdFromCookie = Cookies.get('token');
    const [vetrine,setvetrine]=useState([])


const baseUrl="https://api.deviceshopleader.com/api"
    
    const fetchincome = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/sold/soldproducts/${userIdFromCookie}`);
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
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/status/${userIdFromCookie}/${status}`);
            
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
    
            const phonesUpdatedToday = response.data.filter(phone => {
                const updatedDate = new Date(phone.updatedAt); // Assuming `updatedAt` is the date field
                return (
                    updatedDate.getFullYear() === todayYear &&
                    updatedDate.getMonth() === todayMonth &&
                    updatedDate.getDate() === todayDate
                );
            });
    
            setInActive(phonesUpdatedToday);
        } catch (error) {
            console.error("Error fetching active phones:", error);
        }
    };

 

    const watingg = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/waiting/${userIdFromCookie}`);
            setWating(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getallvetrine = async () => {
        try {
          const response = await axios.get(`${baseUrl}/vetrine/soldvetrine/${userIdFromCookie}`);
          setvetrine(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération de toutes les données :', error);
        }
      };
    

    const getallpc = async () => {
        try {
          const response = await axios.get(`${baseUrl}/pc/all/${userIdFromCookie}`);
          setPc(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération de toutes les données :', error);
        }
      };

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/all/${userIdFromCookie}`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchActive = async (status) => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/phone/status/${userIdFromCookie}/${status}`);
            
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
    
            const phonesUpdatedToday = response.data.filter(phone => {
                const updatedDate = new Date(phone.updatedAt); // Assuming `updatedAt` is the date field
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
        fetchinActive('Refused');
        fetchActive('Fixed');
        watingg();
        fetchincome();
        getallvetrine()
        getallpc()
    }, []);

    // Labels des mois
    
// Helper function to calculate daily revenue and benefits
const calculateDailyRevenueAndBenefits = (data, dateField, valueFields, excludeStatus) => {
    return dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
    
        const filteredData = data.filter(item => {
            const itemDate = new Date(item[dateField]);
            return (
                itemDate.getFullYear() === currentYear &&
                itemDate.getMonth() === currentMonth &&
                itemDate.getDate() === day &&
                item.status !== excludeStatus
            );
        });
    
        const totalRevenue = filteredData.reduce((total, item) => total + valueFields.reduce((sum, field) => sum + (item[field] || 0), 0), 0);
        const totalBenefits = filteredData.reduce((total, item) => total + (valueFields.reduce((sum, field) => sum + (item[field] || 0), 0)), 0);
    
        return { totalRevenue, totalBenefits };
    });
};

// Helper function to calculate monthly revenue and benefits
const calculateMonthlyRevenueAndBenefits = (data, dateField, valueFields, excludeStatus) => {
    return monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
    
        const filteredData = data.filter(item => {
            const itemDate = new Date(item[dateField]);
            return (
                itemDate.getFullYear() === currentYear &&
                itemDate.getMonth() === index &&
                item.status !== excludeStatus
            );
        });
    
        const totalRevenue = filteredData.reduce((total, item) => total + valueFields.reduce((sum, field) => sum + (item[field] || 0), 0), 0);
        const totalBenefits = filteredData.reduce((total, item) => total + (valueFields.reduce((sum, field) => sum + (item[field] || 0), 0)), 0);
    
        return { totalRevenue, totalBenefits };
    });
};

const excludedStatus = 'Refused';

const dayProdResults = calculateDailyRevenueAndBenefits(productdata, 'updatedAt', ['price', 'quantity'], excludedStatus);
const dayProdRev = dayProdResults.map(result => result.totalRevenue);
const dayProdBenefits = dayProdResults.map(result => result.totalBenefits);

const dayVitrineResults = calculateDailyRevenueAndBenefits(vetrine, 'updatedAt', ['price'], excludedStatus);
const dayVitrineRev = dayVitrineResults.map(result => result.totalRevenue);
const dayVitrineBenefits = dayVitrineResults.map(result => result.totalBenefits);

const dailyPhoneResults = calculateDailyRevenueAndBenefits(data, 'updatedAt', ['price', 'accompte'], excludedStatus);
const dailyPhoneRevenue = dailyPhoneResults.map(result => result.totalRevenue);
const dailyPhoneBenefits = dailyPhoneResults.map(result => result.totalBenefits);

const dailyPcResults = calculateDailyRevenueAndBenefits(pc, 'updatedAt', ['price', 'accompte'], excludedStatus);
const dailyPcRevenue = dailyPcResults.map(result => result.totalRevenue);
const dailyPcBenefits = dailyPcResults.map(result => result.totalBenefits);

const monthlyPhoneResults = calculateMonthlyRevenueAndBenefits(data, 'updatedAt', ['price', 'accompte'], excludedStatus);
const monthlyPhoneRevenue = monthlyPhoneResults.map(result => result.totalRevenue);
const monthlyPhoneBenefits = monthlyPhoneResults.map(result => result.totalBenefits);

const monthlyProdResults = calculateMonthlyRevenueAndBenefits(productdata, 'updatedAt', ['price', 'quantity'], excludedStatus);
const monthlyProdRevenue = monthlyProdResults.map(result => result.totalRevenue);
const monthlyProdBenefits = monthlyProdResults.map(result => result.totalBenefits);

const monthlyVitrineResults = calculateMonthlyRevenueAndBenefits(vetrine, 'updatedAt', ['price'], excludedStatus);
const monthlyVitrineRevenue = monthlyVitrineResults.map(result => result.totalRevenue);
const monthlyVitrineBenefits = monthlyVitrineResults.map(result => result.totalBenefits);

const monthlyPcResults = calculateMonthlyRevenueAndBenefits(pc, 'updatedAt', ['price', 'accompte'], excludedStatus);
const monthlyPcRevenue = monthlyPcResults.map(result => result.totalRevenue);
const monthlyPcBenefits = monthlyPcResults.map(result => result.totalBenefits);





    return (
        <div style={{ padding: 10, backgroundColor: '#FCF6F5FF' }}>
        <Typography variant='h3' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginTop: 3 }}>
            Tableau de bord
        </Typography>

        <Grid container spacing={3} sx={{ marginTop: 3 }} >
            {/* Overview Boxes */}
            <Grid item xs={12} md={4} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 100 }}>
                    <Box
                        sx={{
                            padding: 2,
                            height: '100%',
                            border: '1px solid grey',
                            borderRadius: 3,
                            backgroundColor: '#89ABE3FF',
                            textAlign: 'center',
                            boxShadow: 15,
                        }}
                    >
                        <PhoneIcon />
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            Téléphones réparés aujourd'hui
                        </Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            {active.length}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 100 }}>
                    <Box
                        sx={{
                            padding: 2,
                            height: '100%',
                            border: '1px solid grey',
                            borderRadius: 3,
                            backgroundColor: '#89ABE3FF',
                            textAlign: 'center',
                            boxShadow: 15,
                        }}
                    >
                        <CancelIcon />
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            Téléphones refusés aujourd'hui
                        </Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            {inActive.length}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 100 }}>
                    <Box
                        sx={{
                            padding: 2,
                            height: '100%',
                            border: '1px solid grey',
                            borderRadius: 3,
                            backgroundColor: '#89ABE3FF',
                            textAlign: 'center',
                            boxShadow: 15,
                        }}
                    >
                        <HourglassEmptyIcon />
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            En attente de traitement
                        </Typography>
                        <Typography variant='h4' sx={{ fontFamily: 'Kanit', fontWeight: 500, color: '#FCF6F5FF' }}>
                            {wating.length}
                        </Typography>
                    </Box>
                </Box>
            </Grid>

            {/* Daily Charts */}
            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices quotidiens des produits
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dayProdBenefits, label: 'Bénéfices quotidiens des produits', color: ['#1E90FF'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu quotidien des produits
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dayProdRev, label: 'Revenu quotidien des produits', color: ['#4682B4'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ marginBottom: 4}}>
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

            <Grid item xs={12} md={6} sx={{marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices quotidiens des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dailyPcBenefits, label: 'Bénéfices quotidiens des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu quotidien des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dailyPcRevenue, label: 'Revenu quotidien des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>

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

            {/* Monthly Charts */}
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

            <Grid item xs={12} md={6} sx={{marginBottom: 4 }}>
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

            <Grid item xs={12} md={6} sx={{ marginBottom: 4 }}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices mensuels des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPcBenefits, label: 'Bénéfices mensuels des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu mensuel des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPcRevenue, label: 'Revenu mensuel des PCs', color: ['#FFD700'] }]}
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

        </Grid>
    </div>
    );
}
