import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Container } from '@mui/material';
import axios from 'axios';
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
import Cookies from 'js-cookie';

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
    const [err, setErr] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const userIdFromCookie = Cookies.get('token');
        if (userIdFromCookie) {
            setUserId(userIdFromCookie);
            fetchData(userIdFromCookie);
        }
    }, []);

    const fetchData = async (id) => {
        try {
            const response = await axios.get(`https://api.deviceshopleader.com/api/user/${id}`);
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
            setErr(true);
            return;
        }

        try {
            await axios.put(`https://api.deviceshopleader.com/api/user/${userId}`, data);
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
            setErr(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (data) => {
        updateProfile(data);
    };

    return (
        <div style={{ display: 'flex', width: '80%', margin: 'auto', height: '100vh' }}>
            <Container sx={{ marginTop: 2 }}>
                <Typography variant="h3" sx={{ fontFamily: 'Kanit', textAlign: 'center', color: 'black', marginTop: 3 }}>Profil</Typography>

                <Grid container spacing={2} sx={{ textAlign: 'center', marginTop: 0, justifyContent: 'center' }}>
                    <Grid item xs={12} md={6}>
                        {!update ? (
                            <Box sx={{ border: '1px solid grey', borderRadius: 10, padding: 2, backgroundColor: 'white' }}>
                                <Typography sx={{ fontFamily: 'Kanit', color: 'black', textAlign: 'center' }} variant="h4">Informations du compte</Typography>
                                <Box sx={{ width: 200, height: 200 }}>
                                    <img src={data.image} alt="" style={{ objectFit: 'contain', width: 200, height: 200, border: '1px solid black', borderRadius: 20, marginLeft: 120 }} />
                                </Box>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><AccountCircleIcon sx={{ color: 'grey' }} /> Nom de l'entreprise : {data.CompanyName}</Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><AccountCircleIcon sx={{ color: 'grey' }} /> Nom : {data.Name}</Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><EmailIcon sx={{ color: 'gold' }} /> Email : {data.Email}</Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><PhoneIcon sx={{ color: 'grey' }} /> Numéro de téléphone : {data.PhoneNumber}</Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><FacebookIcon sx={{ color: 'blue' }} /> Facebook : {data.Facebook}</Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><LocationOnIcon sx={{ color: 'red' }} /> Pays : {data.Country}</Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><BusinessIcon sx={{ color: 'grey' }} /> Gouvernorat : {data.Government}</Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><LocationCityIcon sx={{ color: 'grey' }} /> Ville : {data.City}</Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Kanit', color: 'black', marginBottom: 2 }}><LocationOnIcon sx={{ color: 'grey' }} /> Adresse : {data.Address}</Typography>
                            </Box>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button onClick={() => setUpdate(!update)} variant="contained" sx={{ fontFamily: 'Kanit', textAlign: 'center', marginBottom: 2 }}>Mettre à jour votre profil</Button>

                        {update ? (
                            <Box sx={{ border: '1px solid grey', borderRadius: 10, padding: 2, backgroundColor: 'white' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Nom"
                                            variant="outlined"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            fullWidth
                                            InputProps={{ startAdornment: <AccountCircleIcon sx={{ color: 'grey' }} /> }}
                                            error={err === true}
                                        />
                                    </Grid>
                                    {/* Autres champs de texte */}
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
                                    {/* Mot de passe */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Mot de passe"
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
                                            label="Entreprise"
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
                                    {/* Adresse */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Adresse"
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
                                    {/* Ville */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Ville"
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
                                    {/* Pays */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Pays"
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
                                    {/* Gouvernorat */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Gouvernorat"
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
                                    {/* Numéro de téléphone */}
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Numéro de téléphone"
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
                                    {/* Bouton de mise à jour */}
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
                                            Mettre à jour
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : null}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Profile;
