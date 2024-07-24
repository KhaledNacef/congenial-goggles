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
    
    const dayProdBenefits = dayLabels.map(day => {
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
    
        const totalBenefits = prodRe.reduce((total, product) => total + (product.price - (product.buyprice || 0) * product.quantity), 0);
        return totalBenefits;
    });
    
    const dayVitrineRev = dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
    
        const filteredVitrines = vetrine.filter(vitrine => {
            const vitrineDate = new Date(vitrine.updatedAt);
            return (
                vitrineDate.getFullYear() === currentYear &&
                vitrineDate.getMonth() + 1 === currentMonth &&
                vitrineDate.getDate() === day &&
                vitrine.status === 'soldé'
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
            const vitrineDate = new Date(vitrine.updatedAt);
            return (
                vitrineDate.getFullYear() === currentYear &&
                vitrineDate.getMonth() + 1 === currentMonth &&
                vitrineDate.getDate() === day &&
                vitrine.status === 'soldé'
            );
        });
    
        const totalBenefits = filteredVitrines.reduce((total, vitrine) => total + (vitrine.price - (vitrine.maindoeuvre || 0) - (vitrine.cout || 0)), 0);
        return totalBenefits;
    });
    
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
    
        const totalPrice = phonesFixedOnDay.reduce((total, phone) => total + (phone.price + (phone.accompte || 0)), 0);
        return totalPrice;
    });
    
    const dailyPhoneBenefits = dayLabels.map(day => {
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
    
        const totalBenefits = phonesFixedOnDay.reduce((total, phone) => total + (phone.price - (phone.cout || 0) - (phone.accompte || 0) - (phone.maindoeuvre || 0)), 0);
        return totalBenefits;
    });
    
    const dailyPcRevenue = dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
    
        const pcsFixedOnDay = pc.filter(pc => {
            const fixDate = new Date(pc.updatedAt);
            const pcYear = fixDate.getFullYear();
            const pcMonth = fixDate.getMonth() + 1;
            const pcDay = fixDate.getDate();
            return (
                pc.status === 'Fixed' &&
                pcYear === currentYear &&
                pcMonth === currentMonth &&
                pcDay === day
            );
        });
    
        const totalPrice = pcsFixedOnDay.reduce((total, pc) => total + (pc.price + (pc.accompte || 0)), 0);
        return totalPrice;
    });
    
    const dailyPcBenefits = dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
    
        const pcsFixedOnDay = pc.filter(pc => {
            const fixDate = new Date(pc.updatedAt);
            const pcYear = fixDate.getFullYear();
            const pcMonth = fixDate.getMonth() + 1;
            const pcDay = fixDate.getDate();
            return (
                pc.status === 'Fixed' &&
                pcYear === currentYear &&
                pcMonth === currentMonth &&
                pcDay === day
            );
        });
    
        const totalBenefits = pcsFixedOnDay.reduce((total, pc) => total + (pc.price - (pc.cout || 0) - (pc.accompte || 0) - (pc.maindoeuvre || 0)), 0);
        return totalBenefits;
    });
    
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
    
        const totalPrice = phonesDeliveredInMonth.reduce((total, phone) => total + (phone.price + (phone.accompte || 0)), 0);
        return totalPrice;
    });
    
    const monthlyPhoneBenefits = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const phonesDeliveredInMonth = data.filter(phone => {
            const phoneDeliveryMonth = new Date(phone.updatedAt);
            return (
                phone.status === 'Fixed' &&
                phoneDeliveryMonth.getFullYear() === currentYear &&
                phoneDeliveryMonth.getMonth() === index
            );
        });
    
        const totalBenefits = phonesDeliveredInMonth.reduce((total, phone) => total + (phone.price - (phone.cout || 0) - (phone.accompte || 0) - (phone.maindoeuvre || 0)), 0);
        return totalBenefits;
    });
    
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
    
    const monthlyProdBenefits = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const productsSold = productdata.filter(product => {
            const productSoldMonth = new Date(product.updatedAt);
            return (
                productSoldMonth.getFullYear() === currentYear &&
                productSoldMonth.getMonth() === index
            );
        });
    
        const totalBenefits = productsSold.reduce((total, product) => total + (product.price - (product.buyprice || 0) * product.quantity), 0);
        return totalBenefits;
    });
    
    const monthlyVitrineRevenue = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const vitrinesSoldInMonth = vetrine.filter(vitrine => {
            const vitrineSoldMonth = new Date(vitrine.updatedAt);
            return (
                vitrineSoldMonth.getFullYear() === currentYear &&
                vitrineSoldMonth.getMonth() === index
            );
        });
    
        const totalRevenue = vitrinesSoldInMonth.reduce((total, vitrine) => total + vitrine.price, 0);
        return totalRevenue;
    });
    
    const monthlyVitrineBenefits = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const vitrinesSoldInMonth = vetrine.filter(vitrine => {
            const vitrineSoldMonth = new Date(vitrine.updatedAt);
            return (
                vitrineSoldMonth.getFullYear() === currentYear &&
                vitrineSoldMonth.getMonth() === index
            );
        });
    
        const totalBenefits = vitrinesSoldInMonth.reduce((total, vitrine) => total + (vitrine.price - (vitrine.cout || 0) - (vitrine.maindoeuvre || 0)), 0);
        return totalBenefits;
    });
    
    const monthlyPcRevenue = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const pcsDeliveredInMonth = pc.filter(pc => {
            const pcDeliveryMonth = new Date(pc.updatedAt);
            return (
                pc.status === 'Fixed' &&
                pcDeliveryMonth.getFullYear() === currentYear &&
                pcDeliveryMonth.getMonth() === index
            );
        });
    
        const totalPrice = pcsDeliveredInMonth.reduce((total, pc) => total + (pc.price + (pc.accompte || 0)), 0);
        return totalPrice;
    });
    
    const monthlyPcBenefits = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
        const pcsDeliveredInMonth = pc.filter(pc => {
            const pcDeliveryMonth = new Date(pc.updatedAt);
            return (
                pc.status === 'Fixed' &&
                pcDeliveryMonth.getFullYear() === currentYear &&
                pcDeliveryMonth.getMonth() === index
            );
        });
    
        const totalBenefits = pcsDeliveredInMonth.reduce((total, pc) => total + (pc.price - (pc.cout || 0) - (pc.accompte || 0) - (pc.maindoeuvre || 0)), 0);
        return totalBenefits;
    });
    






    return (
        <div style={{ padding: 10, backgroundColor: '#FCF6F5FF' }}>
        <Typography variant='h3' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginTop: 3 }}>
            Tableau de bord
        </Typography>

        <Grid container spacing={3} sx={{ marginTop: 3 }}>
            {/* Overview Boxes */}
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices quotidiens des téléphones
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dayPhoneBenefits, label: 'Bénéfices quotidiens des téléphones', color: ['#DC143C'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu quotidien des téléphones
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dayPhoneRev, label: 'Revenu quotidien des téléphones', color: ['#FF4500'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices quotidiens des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dayPCBenefits, label: 'Bénéfices quotidiens des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu quotidien des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: dayLabels }]}
                        series={[{ data: dayPCRev, label: 'Revenu quotidien des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
                <Box sx={{ height: 500 }}>
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Bénéfices mensuels des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPCBenefits, label: 'Bénéfices mensuels des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                    <Typography variant='h5' sx={{ fontFamily: 'Kanit', fontWeight: 500, textAlign: 'center', marginBottom: 2 }}>
                        Revenu mensuel des PCs
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: monthLabels }]}
                        series={[{ data: monthlyPCRevenue, label: 'Revenu mensuel des PCs', color: ['#FFD700'] }]}
                        width={800}
                        sx={{ fontFamily: 'Kanit', fontWeight: 500, padding: 2 }}
                        height={250}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
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
