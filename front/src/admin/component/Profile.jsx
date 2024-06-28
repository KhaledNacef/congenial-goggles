import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Container } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ImageIcon from '@mui/icons-material/Image';
import FacebookIcon from '@mui/icons-material/Facebook';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [data, setData] = useState({});
    const [image, setImage] = useState('');
const [facebook, setFacebook] = useState('');
const [company, setCompany] = useState('');
const [address, setAddress] = useState('');
const [city, setCity] = useState('');
const [country, setCountry] = useState('');
const [government, setGovernment] = useState('');
const [phoneNumber, setPhoneNumber] = useState(0);
const[err,setErr]=useState(false)
const[update,setUpdate]=useState(false)
    useEffect(() => {
        const userIdFromCookie = Cookies.get('token');
        if (userIdFromCookie) {
            setUserId(userIdFromCookie);
            fetchData(userIdFromCookie);
        }
    }, []);

    const fetchData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/${id}`);
            setData(response.data);
            setName(response.data.Name);
            setEmail(response.data.Email);
        } catch (error) {
            console.log(error);
        }
    };
    const updateProfile = async (data) => {
        // Check if any of the fields are empty
        if (
            !data.Name ||
            !data.Email ||
            !data.Password ||
            !data.image ||
            !data.Facebook ||
            !data.CompanyName ||
            !data.Address ||
            !data.City ||
            !data.Country ||
            !data.Government ||
            !data.PhoneNumber
        ) {
            setErr(true)
            return;
        }
    
        try {
            await axios.put(`http://localhost:3000/user/${userId}`, data);
            fetchData(userId);
            setName('');
            setEmail('');
            setPassword('');
            setImage('');
            setFacebook('');
            setCompany('');
            setAddress('');
            setCity('');
            setCountry('');
            setGovernment('');
            setPhoneNumber(0);
            setUpdate(false); // Set update to false after updating
            setErr(false)
        } catch (error) {
            console.log(error);
        }
    };
    
    
    const handleSubmit = (data) => {
      
        updateProfile(data);
    };

    return (
        <div style={{display:'flex', width: '80%', margin: 'auto',height:'100vh' }}>
           <Container sx={{marginTop:2}}>

           <Typography variant="h3" sx={{ fontFamily:'Kanit',textAlign: 'center', color: 'balck', marginTop: 3 }}>Profile</Typography>

<Grid container spacing={2} sx={{textAlign:'center', marginTop: 0,justifyContent:'center' }}>
    <Grid item xs={12} md={6}>
       {update===false ? <Box sx={{ border: '1px solid grey', borderRadius: 10, padding: 2, backgroundColor: 'white' }}>
            <Typography sx={{fontFamily:'Kanit',color:'balck',textAlign:'center'}} variant="h4">Account Information</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><AccountCircleIcon sx={{color:'grey'}} /> CompanyName: {data.CompanyName}</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><AccountCircleIcon sx={{color:'grey'}} /> Name: {data.Name}</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><EmailIcon sx={{color:'gold'}} /> Email: {data.Email}</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><PhoneIcon  sx={{color:'grey'}}/> PhoneNumber: {data.PhoneNumber}</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><FacebookIcon sx={{color:'blue'}} /> Facebook: {data.Facebook}</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><LocationOnIcon sx={{color:'red'}} /> Country: {data.Country}</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><BusinessIcon sx={{color:'grey'}}/> Government: {data.Government}</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><LocationCityIcon sx={{color:'grey'}}/> City: {data.City}</Typography>
            <Typography variant="h5" sx={{fontFamily:'Kanit',color:'balck',marginBottom:2}}><LocationOnIcon sx={{color:'grey'}}/> Address: {data.Address}</Typography>
        </Box>:null}
    </Grid>
    <Grid item xs={12} md={12}>
    <Button onClick={()=>setUpdate(!update)}  variant="contained" sx={{fontFamily:'Kanit', textAlign: 'center',marginBottom:2 }}>Update Your Profile</Button>

     
         { update===true?    <Box sx={{ border: '1px solid grey', borderRadius: 10, padding: 2, backgroundColor: 'white' }}>
          
         <Grid container spacing={2}>
<Grid item xs={12}>
  <TextField
    label="Name"
    variant="outlined"
    name="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <AccountCircleIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Other text fields */}
<Grid item xs={12} sm={6}>
  <TextField
    label="Email"
    variant="outlined"
    type="email"
    name="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <EmailIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Password */}
<Grid item xs={12} sm={6}>
  <TextField
    label="Password"
    variant="outlined"
    type="password"
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <LockIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Image */}
<Grid item xs={12}>
  <TextField
    label="Image"
    variant="outlined"
    type="text"
    name="image"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <ImageIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Facebook */}
<Grid item xs={12}>
  <TextField
    label="Facebook"
    variant="outlined"
    type="text"
    name="facebook"
    value={facebook}
    onChange={(e) => setFacebook(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <FacebookIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Company */}
<Grid item xs={12} sm={6}>
  <TextField
    label="Company"
    variant="outlined"
    type="text"
    name="company"
    value={company}
    onChange={(e) => setCompany(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <BusinessIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Address */}
<Grid item xs={12} sm={6}>
  <TextField
    label="Address"
    variant="outlined"
    type="text"
    name="address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <LocationOnIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* City */}
<Grid item xs={12} sm={4}>
  <TextField
    label="City"
    variant="outlined"
    type="text"
    name="city"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <LocationCityIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Country */}
<Grid item xs={12} sm={4}>
  <TextField
    label="Country"
    variant="outlined"
    type="text"
    name="country"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <LocationOnIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Government */}
<Grid item xs={12} sm={4}>
  <TextField
    label="Government"
    variant="outlined"
    type="text"
    name="government"
    value={government}
    onChange={(e) => setGovernment(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <BusinessIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Phone Number */}
<Grid item xs={12}>
  <TextField
    label="Phone Number"
    variant="outlined"
    type="number"
    name="phoneNumber"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    fullWidth
    InputProps={{ startAdornment: <PhoneIcon sx={{ color: 'grey' }} /> }}
    error={err === true}
  />
</Grid>
{/* Sign Up Button */}
<Grid item xs={12}>
  <Button
    variant="contained"
    color="primary"
    onClick={() => handleSubmit({
      Name: name,
      Password: password,
      Email: email,
      image: image,
      PhoneNumber: phoneNumber,
      Facebook: facebook,
      CompanyName: company,
      Address: address,
      City: city,
      Country: country,
      Government: government,
    })}
    fullWidth
    sx={{ marginTop: '20px' }}
  >
    Update 
  </Button>
</Grid>
</Grid>
          
           
        </Box> :null }
    </Grid>
</Grid>
           </Container>
        </div>
    );
};

export default Profile;
