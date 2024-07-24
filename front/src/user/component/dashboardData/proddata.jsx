import React, { useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, Grid } from '@mui/material';

const Proddata = () => {
    const [productdata, setProductdata] = useState([]);
    const userIdFromCookie = Cookies.get('token');



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

    useEffect(() => {
        fetchincome();
    }, []);





    // Utility function to sort values from greatest to smallest and then subtract
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
    
    // Daily Calculations
    const dayLabels = Array.from({ length: 31 }, (_, i) => i + 1); // Labels des jours de 1 à 31
    
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
    
        return prodRe.reduce((total, product) => {
            const price = product.price || 0;
            const buyprice = product.buyprice || 0;
            const quantity = product.quantity || 0;
            const values = [price, buyprice * quantity];
            return total + calculateBenefits(values);
        }, 0);
    });
    
    
    
    
    
    // Monthly Calculations
    
    
    const monthlyProdRevenue = monthLabels.map((month, index) => {
        const currentYear = new Date().getFullYear();
    
        const productsSold = productdata.filter(product => {
            const productSoldMonth = new Date(product.updatedAt);
            return (
                productSoldMonth.getFullYear() === currentYear &&
                productSoldMonth.getMonth() === index
            );
        });
    
        return productsSold.reduce((total, product) => {
            const price = product.price || 0;
            const quantity = product.quantity || 0;
            return total + (price * quantity);
        }, 0);
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
    
        return productsSold.reduce((total, product) => {
            const price = product.price || 0;
            const buyprice = product.buyprice || 0;
            const quantity = product.quantity || 0;
            const values = [price, buyprice * quantity];
            return total + calculateBenefits(values);
        }, 0);
    });
    
















  return (
    <Grid container spacing={4}>       
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
</Grid>
  )
}

export default Proddata