import * as React from 'react';
import Box from '@mui/material/Box';
import Nav from './nav.jsx';
import Typography from '@mui/material/Typography';
import Subs from './subs.jsx';
import { Grid, useTheme, useMediaQuery } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: isSmallScreen ? 2 : 3,
          textAlign: isSmallScreen ? 'center' : 'left'
        }}
      >
        


        <Typography variant='h2' sx={{ marginTop: 4 }}>
          Contact Us
        </Typography>
        <Typography paragraph sx={{ marginTop: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan.
        </Typography>
      </Box>
    </Box>
  );
}
