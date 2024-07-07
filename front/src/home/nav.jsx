import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const navItems = ['SignUp', ''];

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <img
            src='https://www.codemaya.com/images/ncfit/ncfit-logo-large.png'
            alt="logo"
            style={{ width: 80, height: 60, objectFit: 'contain' }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {navItems.map((item) => (
            <Button
              key={item}
              sx={{
                fontSize: 18,
                color: 'inherit',
                textTransform: 'none',
                margin: '0 10px',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              component={Link}
              to={`/${item.toLowerCase()}`} // Ensure the route matches your setup
            >
              {item}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
