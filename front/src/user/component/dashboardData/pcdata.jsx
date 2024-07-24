import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, Grid } from '@mui/material';

const userIdFromCookie = Cookies.get('token');

const Pcdata = () => {

    const [pc,setPc]=useState([])
    const baseUrl = 'https://api.deviceshopleader.com/api';




    const getallpc = async () => {
        try {
          const response = await axios.get(`${baseUrl}/pc/all/${userIdFromCookie}`);
          setPc(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération de toutes les données :', error);
        }
      };


      useEffect(() => {
        
        getallpc()
    }, []);



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
    
    const dayLabels = [...Array(31).keys()].map(i => i + 1); // Example day labels
    const monthLabels = [...Array(12).keys()].map(i => i + 1); // Example month labels


    const dailyPcRevenue = dayLabels.map(day => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
    
        const pcsFixedOnDay = pc.filter(pc => {
            const fixDate = new Date(pc.updatedAt);
            return (
                pc.status === 'Fixed' &&
                fixDate.getFullYear() === currentYear &&
                fixDate.getMonth() + 1 === currentMonth &&
                fixDate.getDate() === day
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
            return (
                pc.status === 'Fixed' &&
                fixDate.getFullYear() === currentYear &&
                fixDate.getMonth() + 1 === currentMonth &&
                fixDate.getDate() === day
            );
        });
    
        return pcsFixedOnDay.reduce((total, pc) => {
            const price = pc.price || 0;
            const cout = pc.cout || 0;
            const accompte = pc.accompte || 0;
            const maindoeuvre = pc.maindoeuvre || 0;
            const values = [price, cout, accompte, maindoeuvre];
            return total + calculateBenefits(values);
        }, 0);
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

    return pcsDeliveredInMonth.reduce((total, pc) => {
        const price = pc.price || 0;
        const accompte = pc.accompte || 0;
        return total + (price + accompte);
    }, 0);
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

    return pcsDeliveredInMonth.reduce((total, pc) => {
        const price = pc.price || 0;
        const cout = pc.cout || 0;
        const accompte = pc.accompte || 0;
        const maindoeuvre = pc.maindoeuvre || 0;
        const values = [price, cout, accompte, maindoeuvre];
        return total + calculateBenefits(values);
    }, 0);
});






  return (
    <Grid container spacing={4}>       
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



            </Grid>
  )
}

export default Pcdata