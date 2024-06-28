import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './nav.jsx';
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

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [facebook, setFacebook] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [government, setGovernment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [err, setErr] = useState(false);
  const Navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleRegister = async () => {
    // Check if any of the required fields are empty
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      image === null ||
      facebook === '' ||
      company === '' ||
      address === '' ||
      city === '' ||
      country === '' ||
      government === '' ||
      phoneNumber === ''
    ) {
      console.error("Please fill out all fields");
      setErr(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('Name', name);
      formData.append('Email', email);
      formData.append('Password', password);
      formData.append('Facebook', facebook);
      formData.append('CompanyName', company);
      formData.append('Address', address);
      formData.append('City', city);
      formData.append('Country', country);
      formData.append('Government', government);
      formData.append('PhoneNumber', phoneNumber);

      const response = await axios.post("https://195.200.15.61/user/signup", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Redirect to login page after successful registration
      Navigate('/login');
      console.log("Registration successful", response.data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <Nav />
      <div style={{ display: 'flex', marginTop: '80px' }}>
        <div style={{ flex: '1', paddingRight: '20px' }}>
        <img
                        style={{
                            height: 'auto',
                            width: '100%',
                            maxHeight: 600,
                            backgroundSize: 'cover',
                            border: '1px solid black',
                            borderRadius: 20,
                            margin:10
                        }}
                        src="https://i.pinimg.com/736x/03/14/a0/0314a00783171a72b5bdbd5004675a43.jpg"
                        alt=""
                    />        </div>
        <div style={{ flex: '1', padding: '16px' }}>
          <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                InputProps={{ startAdornment: <AccountCircleIcon sx={{ color: 'grey' }} /> }}
                error={err}
              />
            </Grid>
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
                error={err}
              />
            </Grid>
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
                error={err}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              <TextField
                label="Image"
                variant="outlined"
                type="text"
                value={image ? image.name : ''}
                InputProps={{ startAdornment: <ImageIcon sx={{ color: 'grey' }} /> }}
                error={err}
                onClick={() => fileInputRef.current.click()}
                fullWidth
              />
            </Grid>
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
                error={err}
              />
            </Grid>
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
                error={err}
              />
            </Grid>
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
                error={err}
              />
            </Grid>
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
                error={err}
              />
            </Grid>
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
                error={err}
              />
            </Grid>
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
                error={err}
              />
            </Grid>
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
                error={err}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                fullWidth
                sx={{ marginTop: '20px' }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <p style={{ textAlign: 'center', marginTop: '16px' }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
